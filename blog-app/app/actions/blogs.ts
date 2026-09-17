'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { auth } from '@/app/auth'
import { addBlog, likeBlog } from '../services/blogs'

export const filterBlogsAction = async (formData: FormData) => {
  const filter = formData.get('filter') as string
  redirect(filter ? `/blogs?filter=${filter}` : '/blogs')
}
export const createBlog = async (
  prevState: {
    errors: { title?: string; author?: string; url?: string }
    values?: { title: string; author: string; url: string }
    success?: boolean
  },
  formData: FormData
) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string

  const errors: { title?: string; author?: string; url?: string } = {}

  if (title.length < 5) {
    errors.title = 'Title must be at least 5 characters long'
  }
  if (author.length < 5) {
    errors.author = 'Author must be at least 5 characters long'
  }
  if (url.length < 5) {
    errors.url = 'URL must be at least 5 characters long'
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    }
  }

  await addBlog({ title, author, url })

  revalidatePath('/blogs')

  return {
    errors: {},
    values: { title, author, url },
    success: true,
  }
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath('/blogs')
  revalidatePath(`/blogs/${id}`)
  redirect('/blogs')
}
