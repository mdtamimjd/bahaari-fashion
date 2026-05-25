import { check_admin } from "@/helper/check";
import dbConnect from "@/lib/db";
import Product from "@/models/Products";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const check = await check_admin()
        if ("error" in check) return NextResponse.json({ ok: false, message: "Unauthorize!" }, { status: 500 });
        const body = await req.json();
        const { title, details, colors, sizes, discount, price, quantity, images, category, slug, payment, new_price } = body;
        if (!title || !details || !price || !quantity || !images || !category || !slug || !payment) {
            return NextResponse.json({ ok: false, message: "Title,details,price,quantity,iamges,category,slug are required!" }, { status: 500 })
        }
        const add = await Product.create({
            title,
            details,
            colors,
            sizes,
            discount,
            price,
            quantity,
            new_price,
            images,
            category,
            payment,
            slug
        })
        return NextResponse.json({ ok: true, message: "Product added successful!", data: add })
    } catch (error: any) {
        return NextResponse.json({ ok: false, message: `Server error: ${error.message}` }, { status: 500 })
    }
}

export async function GET() {
    try {
        await dbConnect();
        const find = await Product.find().populate("category");

        return NextResponse.json({
            ok: true,
            message: "All product show",
            data: find
        });

    } catch (error: any) {
        return NextResponse.json(
            {
                ok: false,
                message: `Server error: ${error.message}`
            },
            { status: 500 }
        );
    }
}