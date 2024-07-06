import React from 'react'
import Home from './Home'

export const metadata = {
    title: 'jadescroll Ebooks page title',
    description: 'jadescroll Ebooks description',
}

async function page() {

    return (
        <div>
            <Home />
        </div>
    )
}

export default page