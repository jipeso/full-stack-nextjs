import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { blogs } from '../../db/schema'
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
  await db.insert(blogs).values({ ...newBlog })
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
