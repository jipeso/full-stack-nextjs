import { notFound } from 'next/navigation'

import { addToReadingListAction, likeBlogAction } from '../../actions/blogs'
import { getBlogById } from '../../services/blogs'

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <article className='border border-[var(--line)] bg-[var(--panel)] p-6'>
        <h1 className='text-3xl font-bold leading-tight text-[var(--text)]'>
          {blog.title}
        </h1>
        <dl className='mt-6 space-y-3 text-sm'>
          <div>
            <dt className='font-semibold uppercase tracking-wide text-[var(--muted)]'>
              Author
            </dt>
            <dd className='mt-1 text-[var(--text)]'>{blog.author}</dd>
          </div>
          <div>
            <dt className='font-semibold uppercase tracking-wide text-[var(--muted)]'>
              URL
            </dt>
            <dd className='mt-1 break-words'>
              <a
                href={blog.url}
                target='_blank'
                rel='noreferrer'
                className='text-[var(--accent)] underline underline-offset-2'
              >
                {blog.url}
              </a>
            </dd>
          </div>
          <div>
            <dt className='font-semibold uppercase tracking-wide text-[var(--muted)]'>
              Likes
            </dt>
            <dd className='mt-1 text-[var(--text)]'>{blog.likes}</dd>
          </div>
        </dl>
      </article>
      <div className='mt-6 flex flex-wrap gap-3'>
        <form action={likeBlogAction}>
          <input type='hidden' name='id' value={blog.id} />
          <button
            type='submit'
            className='cursor-pointer border border-[var(--accent)] bg-transparent px-4 py-2 text-[var(--accent)]'
          >
            Like
          </button>
        </form>
        <form action={addToReadingListAction}>
          <input type='hidden' name='id' value={blog.id} />
          <button
            type='submit'
            className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
          >
            Add to reading list
          </button>
        </form>
      </div>
    </div>
  )
}

export default BlogPage
