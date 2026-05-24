"use client"
import Link from 'next/link'
import React from 'react'
import LogoutBTN from './LogoutBTN'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()
    const navlink = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Product",
            path: "/product"
        },
        {
            name: "Category",
            path: "/category"
        }
    ]
    return (
        <nav className="w-full p-5 xl:w-6xl mx-auto flex items-center justify-between">
            <div className='space-x-2'>
                {
                    navlink.map((e, i) => {
                        const isActive = e.path === "/"?pathname === "/": pathname.startsWith(e.path)
                        return (<Link className={`${isActive? "bg-blue-500 text-white" : ""} py-2 px-5 rounded-md hover:outline`} href={e.path} key={i}>{e.name}</Link>
                    )})
                }
            </div>
            <LogoutBTN />
        </nav>
    )
}
