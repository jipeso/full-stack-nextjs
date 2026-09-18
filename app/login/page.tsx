'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FormField from '../components/FormField'
import { useNotification } from '../components/NotificationContext'

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()
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
      showNotification('user logged in')
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className='mx-auto max-w-xl p-6'>
      <h2 className='mb-6 text-3xl font-bold text-[var(--text)]'>Login</h2>
      {error && (
        <p data-testid='error-message' className='text-[var(--danger)]'>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <FormField label='Username' name='username' required />
        <FormField label='Password' name='password' type='password' required />
        <button
          data-testid='login-button'
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          Login
        </button>
      </form>
    </div>
  )
}
