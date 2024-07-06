'use client'
import React from 'react'
import banner from '../../../public/assets/Images/Banner/banner-seven.jpg'
import Image from 'next/image'
import comingSoon from '../../../public/assets/icon/comingSoon.png'

function page() {
    return (
        <div>
            <div className='flex justify-center items-center py-56'>
                <Image src={comingSoon} alt="coming-soon" height={200} width={200} />
            </div>
        </div>
    )
}

export default page;