import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
export interface category {
    name:string;
    description:string;
    image:string;
    _id:string
}

export default function CategoroyCart({category}:{category:category}) {
  return (
    <div className='w-full sm:w-[400] mx-auto p-5 rounded-md m-5 bg-sky-50 flex gap-4 items-center'>
        <div className='relative aspect-square w-32'>
            <Image sizes='1' loading='eager' src={category.image} alt={category.name} fill />
        </div>
        <div>
            <h1 className='text-lg font-bold'>{category.name}</h1>
            <p className='line-clamp-2'>{category.description}</p>
            <div className='mt-3'>
                <Link href={`category/edit/${category._id}`} className='text-lg bg-blue-400 hover:bg-blue-500 hover:text-white p-2 rounded-md'>Edit</Link>
            </div>
        </div>
    </div>
  )
}
