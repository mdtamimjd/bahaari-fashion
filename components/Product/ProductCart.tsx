"use client"
import { ProductType } from '@/app/product/page'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ProductCart(data:ProductType) {
    const router = useRouter()
    const handlerDelete = async()=>{
        console.log("Hello",data._id)
        const req = await fetch(`api/product/${data._id}`,{
            method:"DELETE"
        })
        const res = await req.json()
        if(!res.ok){
            alert(res.message)
            return
        }
        router.refresh()
    }
  return (
    <div className='p-5 rounded-md bg-sky-100'>
        <div className='w-full h-[300] relative'>
            <Image src={data.images[0].image_url} alt={data.title} fill sizes='1' loading='eager' className='object-cover rounded-md' />
        </div>
        <div>
            <h1 className='text-3xl font-bold'>{data.title}</h1>
            <div className='flex justify-between items-center'>
                <p className='p-2 rounded-2xl bg-sky-50'>{data.category}</p>
                <p>Price: {data.price}tk</p>
            </div>
        </div>
        <div className='flex justify-end items-center gap-5'>
            <button onClick={()=>router.push(`/product/edit/${data._id}`)} className='text-blue-500 py-2 px-5 cursor-pointer'>Edit</button>
            <button onClick={handlerDelete} className='text-red-500 py-2 px-5 cursor-pointer'>Delete</button>
        </div>
    </div>
  )
}
