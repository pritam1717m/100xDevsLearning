import React from 'react'

/**
 *  Here this route is not accessible because of the "_" character 
 *  Note : any child route of this route also not be accessible
 */

export default function page() {
  return (
    <div className='text-xl'>
        <p>Page</p>
    </div>
  )
}
