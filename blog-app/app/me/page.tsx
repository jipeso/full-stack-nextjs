import { redirect } from 'next/navigation'
import Link from 'next/link'

import { getCurrentUser } from '../services/session'
import { markAsReadAction } from '../actions/blogs'
import { generateApiToken } from '../actions/users'

const UserPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h2 className='mb-4 text-3xl font-bold text-[var(--text)]'>My Profile</h2>
      <p className='text-[var(--muted)]'>Name: {user.name}</p>
      <p className='text-[var(--muted)]'>Username: {user.username}</p>
      <hr className='my-8 border-[var(--line)]' />

      <h2 className='mb-4 text-3xl font-bold text-[var(--text)]'>
        Reading List
      </h2>
      <h3 className='mb-4 text-xl text-[var(--text)]'>
        Unread ({user.readingList.filter(item => !item.read).length})
      </h3>
      <ul className='mb-4 space-y-2'>
        {user.readingList
          .filter(item => !item.read)
          .map(item => (
            <li
              key={item.id}
              className='flex items-center justify-between gap-4 border border-[var(--line)] bg-[var(--panel)] p-3'
            >
              <Link
                href={`/blogs/${item.blog.id}`}
                className='flex-1 text-[var(--text)] no-underline hover:text-[var(--accent)]'
              >
                {item.blog.title}
              </Link>
              <form action={markAsReadAction}>
                <input type='hidden' name='id' value={item.id} />
                <button
                  type='submit'
                  className='cursor-pointer border border-[var(--accent)] px-3 py-1 text-sm text-[var(--accent)]'
                >
                  Mark as read
                </button>
              </form>
            </li>
          ))}
      </ul>

      <h3 className='mb-4 text-xl text-[var(--text)]'>
        Read ({user.readingList.filter(item => item.read).length})
      </h3>
      <ul className='space-y-2'>
        {user.readingList
          .filter(item => item.read)
          .map(item => (
            <li
              key={item.id}
              className='border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--text)]'
            >
              <Link
                href={`/blogs/${item.blog.id}`}
                className='text-[var(--text)] no-underline hover:text-[var(--accent)]'
              >
                {item.blog.title}
              </Link>
            </li>
          ))}
      </ul>

      <hr className='my-8 border-[var(--line)]' />
      <h2 className='mb-2 text-3xl font-bold text-[var(--text)]'>API Token</h2>
      <p className='mt-4 mb-2 text-xs uppercase tracking-widest text-[var(--muted)]'>
        Current token
      </p>
      <div className='border border-[var(--line)] bg-[var(--panel)] p-4'>
        {user.token ? (
          <code className='block break-all text-[var(--accent)]'>
            {user.token}
          </code>
        ) : (
          <p className='m-0 text-[var(--muted)]'>
            No API token generated yet. Click the button to generate one.
          </p>
        )}
      </div>
      <form action={generateApiToken} className='mt-4'>
        <button
          type='submit'
          className='cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-bold text-[var(--ink)]'
        >
          Generate token
        </button>
      </form>
    </div>
  )
}

export default UserPage
