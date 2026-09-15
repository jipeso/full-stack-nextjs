import { getBlogs } from '../services/blogs'
import BlogsList from './BlogList'

const Blogs = () => {
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      <BlogsList blogs={blogs} />
    </div>
  )
}
export default Blogs
