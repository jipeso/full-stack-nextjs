import Link from 'next/link'

import type { Blog } from '../types'

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <article className='space-y-2 border border-[var(--line)] bg-[var(--panel)] p-4'>
      <Link
        href={`/blogs/${blog.id}`}
        className='block text-lg font-semibold leading-snug text-[var(--text)] no-underline'
      >
        {blog.title}
      </Link>
      <p className='break-words text-sm leading-relaxed text-[var(--muted)]'>
        <span>{blog.author}</span>
        <span className='mx-2 text-[var(--line)]'>|</span>
        <span>{blog.url}</span>
        <span className='mx-2 text-[var(--line)]'>|</span>
        <span>{blog.likes} likes</span>
      </p>
    </article>
  )
}

export default BlogCard
