'use client'

import { useActionState } from 'react'
import { createBlog } from '../../actions/blogs'

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: { title: '', author: '', url: '' },
  })

  return (
    <div>
      <h2>Create a new blog</h2>

      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type='text'
              name='title'
              required
              defaultValue={state.values?.title}
            />
          </label>
        </div>
        {state.errors?.title && (
          <p style={{ color: 'red' }}>{state.errors.title}</p>
        )}
        <div>
          <label>
            Author
            <input
              type='text'
              name='author'
              required
              defaultValue={state.values?.author}
            />
          </label>
        </div>
        {state.errors?.author && (
          <p style={{ color: 'red' }}>{state.errors.author}</p>
        )}
        <div>
          <label>
            URL
            <input
              type='text'
              name='url'
              required
              defaultValue={state.values?.url}
            />
          </label>
        </div>
        {state.errors?.url && (
          <p style={{ color: 'red' }}>{state.errors.url}</p>
        )}
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlog
