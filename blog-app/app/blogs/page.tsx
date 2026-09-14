import { getBlogs } from '../services/blogs'

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <li key={blog.id}>
          {blog.title} {blog.author} {blog.url} {blog.likes}
        </li>
      ))}
    </div>
  )
}
export default Blogs
