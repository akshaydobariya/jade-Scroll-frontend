import React from 'react'
import Home from './Home'

export const metadata = {
    title: 'jadeScroll title notification page',
    description: 'jadeScroll description notification page',
    openGraph: {
        title: 'jadeScroll title notification page',
    },
}

function page() {
  return (
    <div>
        <Home />
    </div>
  )
}

export default page