'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import comingSoon from '../../../public/assets/icon/comingSoon.png'

function Home() {
    return (
        <div className='pt-20 m-2 px-3 md:px-5 xl:px-52'>
            <div className='flex justify-center items-center py-48'>
                <Image src={comingSoon} alt="coming-soon" height={200} width={200} />
            </div>
        </div>
    )
}

export default Home