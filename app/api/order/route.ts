import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const data = await req.json();
        const {
            products,
            shippingAddress,
            paymentInfo,
            totalPrice,
            shippingCharge,
            finalAmount
        } = data;
        return NextResponse.json({ok:true})
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 })
    }
}