"use client"

import { signOut } from "next-auth/react"

export default function LogoutBTN() {
  return (
    <button onClick={()=>signOut()} className='text-lg py-2 px-5 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white'>LogoutBTN</button>
  )
}
