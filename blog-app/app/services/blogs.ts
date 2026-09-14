import type { Blog, NewBlog } from '../types'

const blogs: Blog[] = [
  {
    id: 1,
    title: 'How to Next.js',
    author: 'Frank',
    url: 'https://next.js.org',
    likes: 1,
  },
  {
    id: 2,
    title: 'Basics of something important',
    author: 'Paul',
    url: 'https://example.com',
    likes: 2,
  },
  {
    id: 3,
    title: 'Vercel',
    author: 'Guillermo',
    url: 'https://vercel.com',
    likes: 0,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (newBlog: NewBlog): void => {
  blogs.push({ id: nextId++, likes: 0, ...newBlog })
}
