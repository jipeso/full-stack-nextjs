'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useNotification } from '../components/NotificationContext'
import { registerUser } from '../actions/users'
import FormField from '../components/FormField'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: '', name: '', password: '', passwordConfirm: '' },
    success: false,
  })

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('user registered')
      router.push('/login')
    }
  }, [state, showNotification, router])

  return (
    <div className='mx-auto max-w-xl p-6'>
      <h2 className='mb-6 text-3xl font-bold text-[var(--text)]'>Register</h2>

      <form action={formAction} className='space-y-4'>
        <FormField
          label='Username'
          name='username'
          required
          defaultValue={state.values?.username}
          error={state.errors.username}
        />

        <FormField
          label='Name'
          name='name'
          required
          defaultValue={state.values?.name}
        />

        <FormField
          label='Password'
          name='password'
          type='password'
          required
          defaultValue={state.values?.password}
          error={state.errors.password}
        />

        <FormField
          label='Confirm Password'
          name='passwordConfirm'
          type='password'
          required
          defaultValue={state.values?.passwordConfirm}
          error={state.errors.passwordConfirm}
        />

        <button
          data-testid='register-button'
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          Register
        </button>
      </form>
    </div>
  )
}
