"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [laoding, setLaoding] = useState(false)
    const handlerSubmit = async () => {
        setLaoding(true)
        setMessage("")
        if (!email || !password) {
            setMessage("All email & password required!")
            setLaoding(false)
            return
        }
        try {
            const req = await signIn("credentials", { mail:email, password, redirect: false })
            console.log(req)
            if(req?.error){
                setMessage("Email or password worng!")
                setLaoding(false)
            }else{
                setMessage("")
                window.location.reload()
            }
        } catch (error:any) {
            setMessage(error.message)
            setLaoding(false)
        }

    }
    return (
        <div className='h-screen mx-auto place-content-center'>
            <div className='flex flex-col gap-2 rounded-md p-5 shadow-2xl bg-sky-50 w-full md:w-[500]'>
                <h1 className='py-2 text-center text-2xl md:text-4xl font-bold'>Login form for admin</h1>
                <label htmlFor="Email">Admin Email:
                </label>
                <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Enter admin email...' className='p-2 rounded-md text-lg outline' />
                <label htmlFor="Password">Admin Password:
                </label>
                <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Enter admin password...' className='p-2 rounded-md text-lg outline' />
                {
                    message && <p className='text-red-400 text-sm'>*{message}</p>
                }
                <button onClick={handlerSubmit} disabled={laoding} className='p-2 rounded-md text-lg bg-green-400 hover:bg-green-500 hover:text-white disabled:bg-gray-500'>{laoding ? "Login.." : "Login"}</button>
            </div>
        </div>
    )
}
