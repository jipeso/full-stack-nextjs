'use server'

import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import { getUser } from '../services/users'
import { getCurrentUser } from '../services/session'

export const generateApiToken = async () => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Not logged in')
  }

  await db
    .update(users)
    .set({ token: randomUUID() })
    .where(eq(users.id, user.id))

  revalidatePath('/me')
}

export const registerUser = async (
  prevState: {
    errors: {
      username?: string
      name?: string
      password?: string
      passwordConfirm?: string
    }
    values?: {
      username: string
      name: string
      password: string
      passwordConfirm: string
    }
  },
  formData: FormData
) => {
  const username = (formData.get('username') as string)?.trim()
  const name = (formData.get('name') as string)?.trim()
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  const errors: {
    username?: string
    password?: string
    passwordConfirm?: string
  } = {}

  if (username.length < 4) {
    errors.username = 'Username must be at least 4 characters long'
  } else if (await getUser(username)) {
    errors.username = 'Username is already taken'
  }

  if (password.length < 5) {
    errors.password = 'Password must be at least 5 characters long'
  }
  if (passwordConfirm !== password) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name, password, passwordConfirm },
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect('/login')
}
