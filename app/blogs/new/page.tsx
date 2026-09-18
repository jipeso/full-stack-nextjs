'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBlog } from '../../actions/blogs'
import { useNotification } from '../../components/NotificationContext'
import FormField from '../../components/FormField'

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
        <FormField
          label='Title'
          name='title'
          required
          defaultValue={state.values?.title}
          error={state.errors?.title}
        />

        <FormField
          label='Author'
          name='author'
          required
          defaultValue={state.values?.author}
          error={state.errors?.author}
        />

        <FormField
          label='URL'
          name='url'
          required
          defaultValue={state.values?.url}
          error={state.errors?.url}
        />

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
