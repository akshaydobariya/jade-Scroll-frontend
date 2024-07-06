import React from 'react'
import Home from './Home'
import AppConfig from '@/appConfig'

export async function generateMetadata({ params, searchParams }, parent) {
    const baseUrl = AppConfig.apiUrl
    // read route params
    const id = params.id

    let product = await fetch(`${baseUrl}user/get-chapter?id=${id}`, { cache: 'no-store' }).then((res) => res.json())

    return {
        title: product?.data?.title,
        openGraph: {
            title: product?.data?.title,
            images: '../../../../public/assets/icon/logoLightMode.png'
        }
    }
}

function ChapterDetail({ params, searchParams }) {
    return (
        <div>
            <Home params={params} />
        </div>
    )
}

export default ChapterDetail