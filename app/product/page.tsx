import ProductCart from '@/components/Product/ProductCart';
import Link from 'next/link'
import React from 'react'
export interface CategoryType {
    _id: string;
    name: string;
    description: string;
    image: string;
    image_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface ProductType {
    _id: string

    title: string
    slug: string
    details: string

    colors?: string[]
    sizes?: string[]

    price: number
    discount?: number
    new_price: number

    quantity: number

    category: CategoryType
    payment: string

    images: {
        image_url: string
        image_id: string
    }[]
}

export default async function page() {
  const req = await fetch(`${process.env.PUBLIC_URL}/api/product`)
  const res = await req.json()
  const product = res.data;
  return (
    <div className='w-full p-5 xl:w-6xl mx-auto'>
        <div className='flex justify-end'><Link href={"/product/add"} className='border-y-2 hover:border-x-2 text-lg py-2 px-5 rounded-md hover:text-green-500'>Add Product</Link></div>
        <section>
          <h1 className='md:text-4xl text-2xl font-bold text-center mt-5'>All product show</h1>
          <div className=''>
            {
              product.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7 my-10'>
                {
                  product.map((data:ProductType)=>(
                <ProductCart key={data._id} {...data}/>
              ))
                }
              </div>: <p>Product not found!</p>
            }
          </div>
        </section>
    </div>
  )
}
