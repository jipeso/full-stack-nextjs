'use client'

import { useActionState } from 'react'

import { registerUser } from '../actions/users'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: { username: '', name: '', password: '', passwordConfirm: '' },
  })
  return (
    <div>
      <h2>Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type='text'
              name='username'
              required
              defaultValue={state.values?.username}
            />
          </label>
        </div>

        {state.errors.username && (
          <p style={{ color: 'red' }}>{state.errors.username}</p>
        )}

        <div>
          <label>
            Name
            <input
              type='text'
              name='name'
              required
              defaultValue={state.values?.name}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type='password'
              name='password'
              required
              defaultValue={state.values?.password}
            />
          </label>
        </div>

        {state.errors.password && (
          <p style={{ color: 'red' }}>{state.errors.password}</p>
        )}

        <div>
          <label>
            Confirm Password
            <input
              type='password'
              name='passwordConfirm'
              required
              defaultValue={state.values?.passwordConfirm}
            />
          </label>
        </div>

        {state.errors.passwordConfirm && (
          <p style={{ color: 'red' }}>{state.errors.passwordConfirm}</p>
        )}

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
