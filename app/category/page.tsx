import CategoroyCart, { category } from '@/components/Category/CategoroyCart';
import { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'
export const metadata:Metadata = {
  title:"Category Page"
};

export default async function page() {
    const req = await fetch(`${process.env.PUBLIC_URL}/api/category`);
    const res = await req.json()
    const categorys:[category] = res.data;
  return (
    <div className="w-full p-5 xl:w-6xl mx-auto ">
        <div className='flex justify-end'><Link href={"/category/add"} className='border-y-2 hover:border-x-2 text-lg py-2 px-5 rounded-md hover:text-green-500'>Add Category</Link></div>
        <section className='py-5 my-5 border-t-2'>
            <h1 className='md:text-4xl text-2xl font-bold text-center'>Show all category items</h1>
            <main>
                {
                categorys && categorys.map((category:category,i:number)=>(
                    <CategoroyCart category={category} key={i+1}/>
                ))
            }
            </main>
        </section>
    </div>
  )
}
