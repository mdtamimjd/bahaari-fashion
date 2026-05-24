"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

export default function AddCategory() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [message, setMessage] = useState("")
    const [laoding, setLaoding] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter();
    const handlerSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLaoding(true)
        if (!name || !description || !image) {
            setLaoding(false)
            return setMessage("All field is required!")
        };
        const formData = new FormData()
        formData.append("name",name);
        formData.append("description",description);
        formData.append("image",image);
        const req = await fetch("/api/category",{
            method:"POST",
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
                <h1 className='text-center text-4xl font-bold'>Add Category form</h1>
                <input value={name} onChange={e => setName(e.target.value)} required type="text" placeholder='Enter category name' className='p-2 rounded-md text-lg outline' />
                <textarea value={description} onChange={e => setDescription(e.target.value)} required name="category_info" placeholder='Enter category discription...' id="" className='p-2 rounded-md text-lg outline resize-none'></textarea>
                {/* show image preview */}
                {
                    image && <div className="relative w-32 aspect-square overflow-hidden rounded-md border">
                        <Image
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                }
                <input ref={inputRef} onChange={e => setImage(e.target.files ? e.target.files[0] : null)} accept='image/*' type="file" placeholder='Select image' className='p-2 rounded-md text-lg outline' />
                {
                    message && <p className='text-red-400 text-sm'>{message}</p>
                }
                <button type='submit' disabled={laoding} className='p-2 rounded-md text-lg bg-green-400 hover:bg-green-500 hover:text-white disabled:bg-gray-500'>{laoding ? "Adding.." : "Add"}</button>
            </form>
        </div>
    )
}
