const blogs = [
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

const Blogs = () => {
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
