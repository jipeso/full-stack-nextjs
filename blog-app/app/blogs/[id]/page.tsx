import { notFound } from 'next/navigation'

import { getBlogById } from '../../services/blogs'
import { likeBlogAction } from '../../actions/blogs'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h2 className='mb-4 text-3xl font-bold text-[var(--text)]'>
        {blog.title}
      </h2>
      <p className='text-[var(--muted)]'>{blog.author}</p>
      <p className='text-[var(--muted)]'>{blog.url}</p>
      <p className='text-[var(--muted)]'>{blog.likes} likes</p>
      <form action={likeBlogAction} className='mt-6'>
        <input type='hidden' name='id' value={blog.id} />
        <button
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-transparent px-4 py-2 text-[var(--accent)]'
        >
          Like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
