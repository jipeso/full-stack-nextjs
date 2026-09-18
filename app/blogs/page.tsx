import { filterBlogsAction } from '../actions/blogs'
import BlogCard from '../components/BlogCard'
import { getBlogs } from '../services/blogs'

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = await getBlogs()
  const blogs = filter
    ? allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h2 className='mb-4 text-2xl font-bold text-[var(--text)]'>Blogs</h2>
      <form action={filterBlogsAction} className='mb-6 flex gap-2'>
        <input
          name='filter'
          className='border border-[var(--field-line)] bg-[var(--panel)] px-3 py-2 text-[var(--text)]'
        />
        <button
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          filter
        </button>
      </form>
      <ul className='space-y-2'>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
