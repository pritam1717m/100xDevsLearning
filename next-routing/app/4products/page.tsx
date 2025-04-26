import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='text-xl'>
        <p>Dynamic Pages</p>
        <div className='flex gap-10'>
          <Link href={"4products/1"}>1</Link>
          <Link href={"4products/2"}>2</Link>
          <Link href={"4products/3"}>3</Link>
          <Link href={"4products/4"}>4</Link>
        </div>
    </div>
  )
}
