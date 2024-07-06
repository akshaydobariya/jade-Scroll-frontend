'use client'
import Image from 'next/image'
import React from 'react'
// import becomeAuthorImg from '../../../public/assets/Images/BecomeAuthorCoverImg.jpg'
import coverImage from '../../../public/assets/Images/backgroundDetail.jpg'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function BecomeAuthor() {
    const router = useRouter()
    return (
        <div>
            <section>
                <div className='relative mt-8'>
                    <div className='md:h-44 h-56'>
                        <Image height={100} width={100} className='h-full w-full object-cover' src={coverImage} alt='become a author' />
                    </div>
                    <div className='text-white absolute top-10 md:top-2 lg:top-10'>
                        <div className='flex flex-col items-center font-semibold'>
                            <div className='text-[16px] text-center md:px-20 px-2'>Are you passionate about storytelling and eager to share your imagination with readers around the world? Join our community of talented authors and unleash your creativity!</div>
                            <Link href={{ pathname: '/becomeAuthor' }} prefetch className='flex justify-end'>
                                <button className='border-2 mt-4 px-10 py-2 text-white slideBtn sliderRight'>Become An Author</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BecomeAuthor