import { check_admin } from "@/helper/check";
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const check = await check_admin()
        if("error" in check) return NextResponse.json({ ok: false, message: "Unauthorize!" }, { status: 500 })
        const formData = await req.formData()
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const image = formData.get("image") as File;
        if (!name || !description || !image) return NextResponse.json({ ok: false, message: "All field required!" }, { status: 400 });
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
        ];
        if (!allowedTypes.includes(image.type)) {
            return NextResponse.json({ ok: false, message: "Only allow image type: png,jpeg,jpg,webp" }, { status: 400 })
        }
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
                await dbConnect()
                const add = await Category.create({
                    name,
                    description,
                    image: uploadImage.secure_url,
                    image_id: uploadImage.public_id
                })
                return NextResponse.json({ ok: true, message: "Category added successful!", data: add })
            } catch (error: any) {
                return NextResponse.json({ ok: false, message: `DB error: ${error.message}` }, { status: 500 })
            }
        } catch (error: any) {
            return NextResponse.json({ ok: false, message: "Storage error" }, { status: 500 })

        }
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 })
    }
}

export async function GET() {
    try {
        await dbConnect()
        const find = await Category.find().lean();
        return NextResponse.json({ ok: true, message: "Get Category successful!", data: find })
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 })
    }
}