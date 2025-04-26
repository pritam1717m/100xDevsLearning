"use client"

import WithAuth from '@/components/WithAuth'
import React from 'react'

const page = () => {
  return (
    <div>This page is protected route from client side Higher Order Component</div>
  )
}

export default WithAuth(page);