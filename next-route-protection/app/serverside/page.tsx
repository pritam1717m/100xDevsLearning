import { sessionStatus } from '@/utils/session'
import { redirect } from 'next/navigation';
import React from 'react'

export default function page() {
    const session = sessionStatus;
    if(!session) {
        redirect("/")
    }
  return (
    <div>
        This is a server component
    </div>
  )
}
