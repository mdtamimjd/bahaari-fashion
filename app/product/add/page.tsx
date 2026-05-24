import ProductForm from '@/components/Product/ProductForm'
import { Metadata } from 'next'
import React from 'react'
export const metadata:Metadata = {
    title: "Add Product form page"
} 

export default function page() {
  return (
    <div className='w-full p-5 xl:w-6xl mx-auto'>
      <ProductForm/>
    </div>
  )
}
