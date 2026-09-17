import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'
import { getUserWithBlogs } from '../../services/users'

export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get('authorization')
  const token = authorization?.substring(7).trim()

  if (!token) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  })

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const fullUser = await getUserWithBlogs(user.username)

  if (!fullUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: fullUser.id,
    username: fullUser.username,
    name: fullUser.name,
    createdBlogs: fullUser.blogs,
  })
}
