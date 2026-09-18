import { notFound } from 'next/navigation'

import BlogCard from '../../components/BlogCard'
import { getUserWithBlogs } from '../../services/users'

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const user = await getUserWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h2 className='mb-2 text-3xl font-bold text-[var(--text)]'>
        {user.name}
      </h2>
      <p className='text-[var(--muted)]'>Username: {user.username}</p>
      <h3 className='mt-8 mb-3 text-xl font-bold text-[var(--accent)]'>
        Blogs
      </h3>
      <ul className='space-y-2'>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
