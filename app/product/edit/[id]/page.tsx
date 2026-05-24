import EditForm from '@/components/Product/EditForm'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function page({params}:{params: Promise<{id:string}>}) {
  const {id} = await params;
  const req = await fetch(`${process.env.PUBLIC_URL}/api/product/${id}`)
  const res = await req.json()
  if(!res.ok){
    return(
      notFound()
    )
  }
  const data = res.data;
  return (
    <div className='w-full lg:w-[800] mx-auto mt-20'>
        <EditForm {...data} />
    </div>
  )
}
