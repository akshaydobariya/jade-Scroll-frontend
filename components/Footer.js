'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import playStore from '../public/assets/icon/playstoreSoon.webp'
import appStore from '../public/assets/icon/appStoreIcon.jpg'
import twiterIcon from '../public/assets/icon/twiterIcon.png'
import facebook from '../public/assets/icon/facebook.png'
import discord from '../public/assets/icon/discordThree.png'
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import logoLight from '../public/assets/icon/logoLightMode.png';
import logoDark from '../public/assets/icon/logoDarkMode.png';
import Link from 'next/link';

function Footer() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className={pathname == '/chapter' ? 'hidden' : ' pt-10 pb-10 bg-[#000000] text-[#FFFFFF]  px-4 md:px-20'}>
            <div className='flex justify-center'>
                <Image alt="logo" className='w-40 md:w-48 object-fill' src={logoDark} height={400} width={400} />
            </div>
            <div className='text-sm md:text-base flex flex-wrap justify-center gap-5 md:gap-x-20 text-center md:px-20 pb-6 pt-6'>
                <Link href={{ pathname: '/cms/aboutUs' }} className='cursor-pointer'>About Us</Link>
                <Link href={{ pathname: '/cms/contactUs' }} className='cursor-pointer'>Contact Us</Link>
                <Link href={{ pathname: '/cms/privacy_policy' }} className='cursor-pointer'>Privacy Policy</Link>
                <Link href={{ pathname: '/cms/terms&condition' }} className='cursor-pointer'>Terms & Condition</Link>
                <Link href={{ pathname: '/cms/refund_policy' }} className='cursor-pointer'>Refund Policy</Link>
                <Link href={{ pathname: '/cms/shipping_policy' }} className='cursor-pointer'>Shipping Policy</Link>
                {/* <Link href={{ pathname: '/resources' }} className='cursor-pointer'>Resources</Link> */}
            </div>
            <div className='border-t border-gray-400 flex flex-col lg:flex-row justify-center items-center gap-5 pt-8'>
                <div className='flex'>
                    <Image alt="play-store" src={playStore} height={600} width={600} className="h-10 w-32 dark:border rounded-md mr-2" />
                    <Image alt="app-store" src={appStore} height={600} width={600} className="h-10 w-32 dark:border rounded-md" />
                </div>
                <div className='flex items-center gap-4'>
                    {/* <FacebookIcon sx={{ fontSize: "40px" }} className="text-[#5765F2]" />
                    <TwitterIcon sx={{ fontSize: "40px" }} className="text-[#5765F2] mx-3" /> */}
                    <Image alt='facebook' src={facebook} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                    <Image alt="tiwtter" src={twiterIcon} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                    <Image alt='discord' onClick={() => { if (typeof window !== 'undefined') window.open(`https://discord.gg/8g574CCS7c`) }} src={discord} height={300} width={300} className='h-10 w-10 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Footer