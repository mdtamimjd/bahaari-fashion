import { category } from '@/components/Category/CategoroyCart';
import { check_admin } from "@/helper/check";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { UploadApiResponse } from "cloudinary";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ ok: false, message: "Category id is not valid" })
        }
        await dbConnect()
        const data = await Category.findById(id).lean()
        if (!data) {
            return NextResponse.json({ ok: false, message: "Category is not found!" })
        }
        return NextResponse.json({ ok: false, message: "find category succesful", data })
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: `Server error: ${error.message}` })
    }
}

// update route category
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const check = await check_admin()
        if ("error" in check) return NextResponse.json({ ok: false, message: "Unauthorize!" }, { status: 500 });
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ ok: false, message: "Category id is not valid" })
        }
        await dbConnect()
        const data = await Category.findById(id).lean()
        if (!data) {
            return NextResponse.json({ ok: false, message: "Category is not found!" })
        }
        const formData = await req.formData()
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as File;
        if (!name || !description) return NextResponse.json({ ok: false, message: "All field required!" }, { status: 400 });
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
        ];
        if (image) {
            if (!allowedTypes.includes(image.type)) {
                return NextResponse.json({ ok: false, message: "Only allow image type: png,jpeg,jpg,webp" }, { status: 400 })
            }
            // delete image
            const deleteImage = await cloudinary.uploader.destroy(data.image_id)
            // image upload
            try {
                const buffer = Buffer.from(await image.arrayBuffer())
                const uploadImage = await new Promise<UploadApiResponse>((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        folder: 'bahaari/category'
                    },
                        (error, result) => {
                            if (error) reject(error);
                            else {
                                resolve(result as UploadApiResponse)
                            }
                        }).end(buffer)
                })
                // category db save
                try {
                    const update = await Category.findOneAndUpdate({ _id: id }, {
                        name,
                        description,
                        image: uploadImage.secure_url,
                        image_id: uploadImage.public_id
                    }, { new: true })
                    return NextResponse.json({ ok: true, message: "Category Update successful!", data: update })
                } catch (error: any) {
                    return NextResponse.json({ ok: false, message: `DB error: ${error.message}` }, { status: 500 })
                }
            } catch (error: any) {
                return NextResponse.json({ ok: false, message: "Storage error" }, { status: 500 })

            }
        }
        try {
            const update = await Category.findOneAndUpdate({ _id: id }, {
                name,
                description,
            }, { new: true })
            return NextResponse.json({ ok: true, message: "Category Update successful!", data: update })

        } catch (error: any) {
            return NextResponse.json({ ok: false, message: `DB error: ${error.message}` }, { status: 500 })
        }

    } catch (error: any) {
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 })
    }
}