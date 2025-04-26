import React from 'react'
import Login from '../_components/Login'

export default function page() {
  return (
    <div className='fixed inset-0 flex justify-center items-center z-50'>
        <div className='fixed inset-0 bg-gray-500 opacity-90'>
            <Login />
        </div>
    </div>
  )
}
