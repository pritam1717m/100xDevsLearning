import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='text-xl'>
        <p>Intercept Route</p>
        <Link href={"/14intercept_routes/login"}>Login</Link>
    </div>
  )
}
