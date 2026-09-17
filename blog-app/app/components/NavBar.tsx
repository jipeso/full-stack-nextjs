'use client'

import { useSession, signOut } from 'next-auth/react'

import NavLink from './NavLink'

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className='flex flex-wrap items-center gap-4 border-b border-[var(--line)] bg-[var(--panel)] px-6 py-4 text-[var(--text)]'>
      <NavLink href='/'>home</NavLink>
      {' | '}
      <NavLink href='/blogs'>blogs</NavLink>
      {' | '}
      <NavLink href='/users'>users</NavLink>
      {' | '}
      {session ? (
        <>
          <NavLink href='/blogs/new'>create new</NavLink>
          {' | '}
          <NavLink href='/me'>me</NavLink>
          {' | '}
          <button
            onClick={() => signOut({ redirectTo: '/' })}
            className='cursor-pointer border-0 bg-transparent p-0 font-inherit text-[var(--danger)]'
          >
            logout
          </button>
        </>
      ) : (
        <>
          <NavLink href='/login'>login</NavLink>
          {' | '}
          <NavLink href='/register'>register</NavLink>
        </>
      )}
    </nav>
  )
}
