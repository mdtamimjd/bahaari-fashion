import AddCategory from '@/components/Category/AddCategory';
import { Metadata } from 'next';
import React from 'react'

export const metadata:Metadata = {
  title:"Add Category"
};


export default function page() {
  return (
    <div className="w-full p-5 xl:w-6xl mx-auto ">
        <AddCategory/>
    </div>
  )
}
