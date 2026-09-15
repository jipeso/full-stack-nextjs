import Link from 'next/link'
import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <li key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          {blog.author} {blog.url} {blog.likes}
        </li>
      ))}
    </div>
  )
}
export default Blogs
