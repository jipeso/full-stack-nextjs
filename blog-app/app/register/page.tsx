'use client'

import { useActionState } from 'react'

import { registerUser } from '../actions/users'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: '', name: '', password: '', passwordConfirm: '' },
  })
  return (
    <div className='mx-auto max-w-xl p-6'>
      <h2 className='mb-6 text-3xl font-bold text-[var(--text)]'>Register</h2>

      <form action={formAction} className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <label>
            Username
            <input
              type='text'
              name='username'
              required
              defaultValue={state.values?.username}
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>

        {state.errors.username && (
          <p className='text-[var(--danger)]'>{state.errors.username}</p>
        )}

        <div className='flex flex-col gap-2'>
          <label>
            Name
            <input
              type='text'
              name='name'
              required
              defaultValue={state.values?.name}
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
              defaultValue={state.values?.password}
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>

        {state.errors.password && (
          <p className='text-[var(--danger)]'>{state.errors.password}</p>
        )}

        <div className='flex flex-col gap-2'>
          <label>
            Confirm Password
            <input
              type='password'
              name='passwordConfirm'
              required
              defaultValue={state.values?.passwordConfirm}
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>

        {state.errors.passwordConfirm && (
          <p className='text-[var(--danger)]'>{state.errors.passwordConfirm}</p>
        )}

        <button
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          Register
        </button>
      </form>
    </div>
  )
}
