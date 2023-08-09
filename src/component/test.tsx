'use client'
import React from 'react'
import { useState } from 'react'

export default function Test() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: any) {
    event.preventDefault();
    const okNotOk = await fetch(`http://localhost:3000/api/auth/getuser`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    console.log(okNotOk)

    setEmail('')
    setPassword('')
    return okNotOk
  }

  return (
    <div className='items-center justify-center flex flex-col gap-2'>
      Test
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 text-black'>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className='border-2 my-2 text-black'
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className='border-2 my-2 text-black'
        />
        <button type='submit' className='bg-white-500 text-black my-2 border-2 border-white'>
          Execute
        </button>
      </form>
    </div>
  )
}
