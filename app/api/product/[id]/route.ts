import { check_admin } from "@/helper/check";
import { DeleteImage } from "@/helper/UploadImages";
import Product from "@/models/Products";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ ok: false, message: "Id is not valid!" }, { status: 400 });
        const findProduct = await Product.findById(id);
        if (!findProduct) return NextResponse.json({ ok: false, message: "Product not found!" }, { status: 400 });
        return NextResponse.json({ ok: true, message: "Find successfull", data: findProduct })
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: `Server error: ${error.message}` }, { status: 500 })
    }
}
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const check = await check_admin()
        if ("error" in check) return NextResponse.json({ ok: false, message: "Unauthorize!" }, { status: 500 });
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ ok: false, message: "Id is not valid!" }, { status: 400 });
        const findProduct = await Product.findById(id);
        if (!findProduct) return NextResponse.json({ ok: false, message: "Product not found!" }, { status: 400 });
        const deleteProduct = await Product.findOneAndDelete({ _id: id });
        if (deleteProduct) {
            // image delete
            for (const image of deleteProduct.images) {
                await DeleteImage(image.image_id)
            }
            return NextResponse.json({ ok: true, message: "Delete product successfull", data: findProduct })
        } else {
            return NextResponse.json({ ok: false, message: "Delete image error" }, { status: 500 })
        }
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: `Server error: ${error.message}` }, { status: 500 })
    }
}