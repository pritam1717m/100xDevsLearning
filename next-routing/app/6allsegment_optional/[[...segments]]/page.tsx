import React from 'react'

/** Here, Segments are optional -> [[...segments]]
//  But if we use [...segments]
//  Then it becomes required, means we have to pass atleast one segment
*/ 

export default function page({params} : {params : {segments : string[] }}) {
    const {segments} = params;
  return (
    <div className='text-2xl'>Segments: {segments?.join("/")}</div>
  )
}
