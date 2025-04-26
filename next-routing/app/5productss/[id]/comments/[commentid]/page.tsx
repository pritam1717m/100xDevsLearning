import React from 'react'

export default function page({ params }: { params: { id: string , commentid: string} }) {
    const {id, commentid} = params;
  return (
    <div className='text-2xl'>
        <p>Products : {id}</p>
        <p>Comment : {commentid}</p>
    </div>
  )
}
