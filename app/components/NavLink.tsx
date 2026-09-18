import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className='text-[var(--text)] no-underline hover:text-[var(--accent)]'
    >
      {children}
    </Link>
  )
}

export default NavLink
