import { notFound } from 'next/navigation';
import React from 'react'

export default function page({params} : {params : {id : number}}) {
  const {id} = params;

  if( id > 100 ) {
    notFound()
  }
  return (
    <div className='text-xl'>
        <p>Product : {id}</p>
    </div>
  )
}
