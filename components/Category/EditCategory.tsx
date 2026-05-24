"use client"

import React, { useEffect, useRef, useState } from "react"
import { category } from "./CategoroyCart"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function EditCategory({ category }: { category: category }) {
    const [name, setName] = useState<string>(category.name)
    const [description, setDescription] = useState<string>(category.description)
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(category.image)
    const [message, setMessage] = useState("")
    const [laoding, setLaoding] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    useEffect(()=>{
        if(!image) return;
        const url = URL.createObjectURL(image);
        setPreview(url)
        return () => URL.revokeObjectURL(url);
    },[image])
    const handlerSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setMessage("")
        setLaoding(true)
        if (!name || !description) {
            setLaoding(false)
            return setMessage("All field is required!")
        };
        const formData = new FormData()
        formData.append("name",name);
        formData.append("description",description);
        if(image){
            formData.append("image",image);
        }
        const req = await fetch(`/api/category/${category._id}`,{
            method:"PUT",
            body:formData,
        })
        const res = await req.json()
        if(!res.ok){
            setLaoding(false)
            return setMessage(res.message)
        }
        setLaoding(false)
        setName("")
        setDescription("")
        setImage(null)
        if(inputRef.current){
            inputRef.current.value =""
        }
        router.push("/category")

    }
    return (
        <div className='w-full md:w-[500] mx-auto mt-20'>
            <form onSubmit={handlerSubmit} className='p-5 rounded-md shadow-2xl bg-sky-50 flex flex-col gap-3'>
                            <h1 className='text-center text-4xl font-bold'>Edit Category form</h1>
                            <input value={name} onChange={e => setName(e.target.value)} required type="text" placeholder='Enter category name' className='p-2 rounded-md text-lg outline' />
                            <textarea value={description} onChange={e => setDescription(e.target.value)} required name="category_info" placeholder='Enter category discription...' id="" className='p-2 rounded-md text-lg outline resize-none'></textarea>
                            {/* show image preview */}
                            {
                                preview && <div className="relative w-32 aspect-square overflow-hidden rounded-md border">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        fill
                                        loading="eager"
                                        sizes="1"
                                        className="object-cover"
                                    />
                                </div>
                            }
                            <input ref={inputRef} onChange={e => setImage(e.target.files ? e.target.files[0] : null)} accept='image/*' type="file" placeholder='Select image' className='p-2 rounded-md text-lg outline' />
                            {
                                message && <p className='text-red-400 text-sm'>{message}</p>
                            }
                            <button type='submit' disabled={laoding} className='p-2 rounded-md text-lg bg-green-400 hover:bg-green-500 hover:text-white disabled:bg-gray-500'>{laoding ? "Updating.." : "Update"}</button>
                        </form>
        </div>
    )
}
