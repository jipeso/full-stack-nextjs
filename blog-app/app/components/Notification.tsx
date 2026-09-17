'use client'

import { useNotification } from './NotificationContext'

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (
    <div
      className={`border-b border-[var(--line)] bg-[var(--panel)] px-6 py-3 text-sm ${type === 'success' ? 'text-[var(--accent)]' : 'text-[var(--danger)]'}`}
    >
      {message}
    </div>
  )
}
