"use client"
import React, { useEffect, useState } from 'react'
import TextEditor from '../TextEditor'
import Image from 'next/image'
import { DeleteImage, UploadImage } from '@/helper/UploadImages'
import { useRouter } from 'next/navigation'
import mongoose from 'mongoose'

export default function ProductForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [colors, setColors] = useState("")
    const [sizes, setSizes] = useState("")

    const [price, setPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [quantity, setQuantity] = useState("")

    const [category, setCategory] = useState("")
    const [payment, setPayment] = useState("")

    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    const [allCategory, setAllCategory] = useState([])
    useEffect(() => {
        const cfunc = async () => {
            const req = await fetch("/api/category");
            const res = await req.json()
            setAllCategory(res.data)
        }
        cfunc()
    }, [])

    // IMAGE HANDLER
    const handlerImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage("")
        const files = e.target.files
        if (!files) return

        const selected = Array.from(files)

        if (selected.length > 5) {
            setMessage("Max 5 images allowed")
            return
        }

        const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"]

        const validImages = selected.filter(file =>
            validTypes.includes(file.type)
        )

        setImages(validImages)

        const urls = validImages.map(file => URL.createObjectURL(file))
        setPreviews(urls)
        setMessage("")
    }

    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url))
        }
    }, [previews])

    const priceNum = Number(price) || 0
    const discountNum = Number(discount) || 0

    const newPrice =
        discountNum > 0
            ? priceNum - (priceNum * discountNum) / 100
            : priceNum

    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        if (!title || !details || !price || !quantity || !category || !payment || !images) {
            setMessage("Required fields missing")
            setLoading(false)
            return
        }
        const colorsArray = colors.split(",").map(color => color.trim()).filter(Boolean);
        const sizesArray = sizes.split(",").map(size => size.trim()).filter(Boolean);

        // image upload 
        const req = await UploadImage(images)
        if (!req.ok) {
            setMessage(req.message)
            setLoading(false)
            return
        }
        const allImageArray = req.images;
        if(!allImageArray || allImageArray.length === 0){
            setMessage("Something is worng!")
            setLoading(false)
            return ;
        }

        const data = {
            title,
            slug,
            details,
            colors: colorsArray,
            sizes: sizesArray,
            price: priceNum,
            discount: discountNum,
            new_price:newPrice,
            quantity: Number(quantity),
            category,
            payment,
            images: allImageArray
        }
        // api call for db save;
        const api_req = await fetch("/api/product",{
            method:"POST",
            body:JSON.stringify(data)
        })
        const res = await api_req.json()
        if(!res.ok){
            // delete image
            for(const deleteFile of allImageArray){
                await DeleteImage(deleteFile.image_id)
            }
            setMessage(res.message)
            setLoading(false)
            return;
        }
        router.push("/product")

        setLoading(false)
    }

    return (
        <div className='w-full lg:w-[800] mx-auto mt-20'>

            <form
                onSubmit={handlerSubmit}
                className='flex flex-col gap-3 p-5 rounded-md bg-sky-50 shadow-2xl'
            >

                <h1 className='text-center text-2xl font-bold'>
                    Add New Product
                </h1>


                {/* TITLE */}
                <label className='text-gray-600 font-medium'>Product Title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Enter product title'
                    className='outline p-2 rounded-md'
                />

                {/* CATEGORY */}
                <label className='text-gray-600 font-medium'>Category</label>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className='outline p-2 rounded-md'
                >
                    <option value="">Select Category</option>
                    {
                        allCategory.length > 0 && allCategory.map((data:{name:string,_id:string}, i) => (
                            <option key={i} value={data._id}>{data.name}</option>
                        ))
                    }
                </select>

                {/* DETAILS */}
                <label className='text-gray-600 font-medium'>Product Details</label>
                <TextEditor value={details} onChange={setDetails} />

                {/* COLORS */}
                <label className='text-gray-600 font-medium'>Colors</label>
                <input
                    value={colors}
                    onChange={e => setColors(e.target.value)}
                    placeholder='red, blue, black'
                    className='outline p-2 rounded-md'
                />

                {/* SIZES */}
                <label className='text-gray-600 font-medium'>Sizes</label>
                <input
                    value={sizes}
                    onChange={e => setSizes(e.target.value)}
                    placeholder='s, m, l, xl'
                    className='outline p-2 rounded-md'
                />

                {/* PRICE */}
                <label className='text-gray-600 font-medium'>Price</label>
                <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    type="number"
                    placeholder='Enter price'
                    className='outline p-2 rounded-md'
                />

                {/* DISCOUNT */}
                <label className='text-gray-600 font-medium'>
                    Discount (%) — New Price: {newPrice}
                </label>
                <input
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    type="number"
                    placeholder='Enter discount'
                    className='outline p-2 rounded-md'
                />

                {/* QUANTITY */}
                <label className='text-gray-600 font-medium'>Quantity</label>
                <input
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    type="number"
                    placeholder='Enter quantity'
                    className='outline p-2 rounded-md'
                />

                {/* IMAGES */}
                <label className='text-gray-600 font-medium'>Product Images (Max 5)</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlerImage}
                    className='outline p-2 rounded-md'
                />

                {/* PREVIEW */}
                <div className='grid grid-cols-3 gap-2'>
                    {previews.map((url, i) => (
                        <div key={i} className='relative h-24'>
                            <Image
                                src={url}
                                alt="preview"
                                fill
                                className='object-cover rounded-md'
                            />
                        </div>
                    ))}
                </div>

                {/* PAYMENT */}
                <label className='text-gray-600 font-medium'>Payment Method</label>
                <select
                    value={payment}
                    onChange={e => setPayment(e.target.value)}
                    className='outline p-2 rounded-md'
                >
                    <option value="">Select Payment</option>
                    <option value="cash">Cash</option>
                    <option value="advance">Advance</option>
                    <option value="delivery">Advance delivery charge</option>
                </select>
                {message && <p className='text-red-500'>{message}</p>}

                <button
                    disabled={loading}
                    className='p-2 bg-green-500 text-white rounded-md'
                >
                    {loading ? "Saving..." : "Add Product"}
                </button>

            </form>
        </div>
    )
}