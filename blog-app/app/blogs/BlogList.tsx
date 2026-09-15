'use client'

import Link from 'next/link'
import type { Blog } from '../types'

const BlogList = ({ blogs }: { blogs: Blog[] }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            {blog.author} {blog.url} {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
