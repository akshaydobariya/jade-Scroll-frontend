import React from 'react'
import Home from './Home/page'

export const metadata = {
  title: 'Jade scroll Novel Managment web',
  openGraph: {
    title: 'Jade scroll Novel Managment web',
    description: 'Jadescroll Novels description',
    image: "./favicon.ico"
  }
}

export const viewport = {
  initialScale: 1,
  width: 'device-width'
}

function page() {
  return (
    <>
      <Home />
    </>
  )
}

export default page