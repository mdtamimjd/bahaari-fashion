import { category } from '@/components/Category/CategoroyCart';
import EditCategory from '@/components/Category/EditCategory';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function page({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    const req = await fetch(`${process.env.PUBLIC_URL}/api/category/${id}`);
    const res = await req.json()
    const categorys = res.data;
    if(!categorys){
        notFound()
    }
    return (
        <div className="w-full p-5 xl:w-6xl mx-auto ">
            <EditCategory category={categorys} />
        </div>
    )
}
