'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBlog } from '../../actions/blogs'
import { useNotification } from '../../components/NotificationContext'

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: { title: '', author: '', url: '' },
    success: false,
  })

  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification('blog created')
      router.push('/blogs')
    }
  }, [state, showNotification, router])

  return (
    <div className='mx-auto max-w-xl p-6'>
      <h2 className='mb-6 text-3xl font-bold text-[var(--text)]'>
        Create a new blog
      </h2>

      <form action={formAction} className='space-y-4'>
        <div className='flex flex-col gap-2'>
          <label>
            Title
            <input
              type='text'
              name='title'
              required
              defaultValue={state.values?.title}
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>

        {state.errors?.title && (
          <p className='text-[var(--danger)]'>{state.errors.title}</p>
        )}

        <div className='flex flex-col gap-2'>
          <label>
            Author
            <input
              type='text'
              name='author'
              required
              defaultValue={state.values?.author}
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>

        {state.errors?.author && (
          <p className='text-[var(--danger)]'>{state.errors.author}</p>
        )}

        <div className='flex flex-col gap-2'>
          <label>
            URL
            <input
              type='text'
              name='url'
              required
              defaultValue={state.values?.url}
              className='mt-2 block w-full border border-[var(--field-line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            />
          </label>
        </div>

        {state.errors?.url && (
          <p className='text-[var(--danger)]'>{state.errors.url}</p>
        )}

        <button
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
