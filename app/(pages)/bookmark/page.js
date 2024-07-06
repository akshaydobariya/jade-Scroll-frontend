import React from 'react'
import Home from './Home'

export const metadata = {
    // title: 'jadeScrolls title bookmark page',
    openGraph: {
        title: 'jadeScrolls title bookmark page',
        description: 'jadeScrolls description bookmark page',
    },
}

function bookmark() {
    return (
        <div>
            <Home />
        </div>
    )
}

export default bookmark