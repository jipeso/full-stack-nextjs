'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid username or password')
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className='mx-auto max-w-xl p-6'>
      <h2 className='mb-6 text-3xl font-bold text-[var(--text)]'>Login</h2>
      {error && <p className='text-[var(--danger)]'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <label>
            Username
            <input
              type='text'
              name='username'
              required
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>
        <div className='flex flex-col gap-2'>
          <label>
            Password
            <input
              type='password'
              name='password'
              required
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>
        <button
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          Login
        </button>
      </form>
    </div>
  )
}
