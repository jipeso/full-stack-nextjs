import { notFound } from 'next/navigation'
import { getBlogById } from '../../services/blogs'

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const note = getBlogById(Number(id))

  if (!note) {
    notFound()
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.author}</p>
      <p>{note.url}</p>
      <p>{note.likes} likes</p>
    </div>
  )
}

export default NotePage
