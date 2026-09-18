import { and, eq } from 'drizzle-orm'

import { getCurrentUser } from './session'
import { db } from '@/db'
import { blogs, readingList } from '@/db/schema'
import type { Blog, NewBlog } from '../types'

export const getBlogs = async (): Promise<Blog[]> => {
  return db.query.blogs.findMany()
}

export const getBlogById = async (id: number): Promise<Blog | undefined> => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (newBlog: NewBlog): Promise<void> => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Not logged in')
  }

  const [addedBlog] = await db
    .insert(blogs)
    .values({ ...newBlog, userId: user.id })
    .returning({ id: blogs.id })

  await db.insert(readingList).values({ userId: user.id, blogId: addedBlog.id })
}

export const addBlogToReadingList = async (
  userId: number,
  blogId: number
): Promise<void> => {
  const existingEntry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })

  if (existingEntry) {
    return
  }

  await db.insert(readingList).values({ userId, blogId })
}

export const markReadingListItemAsRead = async (
  userId: number,
  id: number
): Promise<void> => {
  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, userId)))
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}
