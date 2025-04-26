import React from 'react'

export default function page({params} : {params : {id : string}}) {
    const {id} = params;
  return (
    <div className='text-2xl'>Product : {id}</div>
  )
}
