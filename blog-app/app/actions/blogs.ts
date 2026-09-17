'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { addBlog, likeBlog } from '../services/blogs'

export const filterBlogsAction = async (formData: FormData) => {
  const filter = formData.get('filter') as string
  redirect(filter ? `/blogs?filter=${filter}` : '/blogs')
}

export const createBlog = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const url = formData.get('url') as string
  await addBlog({ title, author, url })

  revalidatePath('/blogs')
  redirect('/blogs')
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get('id'))
  await likeBlog(id)
  revalidatePath('/blogs')
  revalidatePath(`/blogs/${id}`)
  redirect('/blogs')
}
