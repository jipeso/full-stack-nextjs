import Link from 'next/link'
import { getUsers } from '../services/users'

const Users = async () => {
  const users = await getUsers()

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h2 className='mb-4 text-3xl font-bold text-[var(--text)]'>Users</h2>
      <ul className='space-y-2'>
        {users.map(user => (
          <li
            key={user.id}
            className='border border-[var(--line)] bg-[var(--panel)] p-3'
          >
            <Link
              href={`/users/${user.username}`}
              className='text-[var(--text)] no-underline hover:text-[var(--accent)]'
            >
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
