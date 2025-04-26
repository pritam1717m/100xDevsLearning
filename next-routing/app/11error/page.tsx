"use client"

export default function page() {
  if(Math.floor(Math.random() * 3) == 1) {
    throw new Error("Random Number Error")
  }
  return (
    <div className='text-xl'>
        <p>No error found</p>
    </div>
  )
}
