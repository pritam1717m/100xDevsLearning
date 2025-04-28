import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='text-xl'>
        <p>Intercept Root Route</p>
        <Link href={"/1home"} className='text-blue-500 mx-10'>Home Route</Link>
        <Link href={"/15intercept_root_route/onesteptrigger"} className='text-blue-500'>Move to 1 level up trigger link</Link>
    </div>
  )
}
