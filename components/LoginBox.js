import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginBox() {
    const router = useRouter()
    return (
        <div className='border p-4 my-3 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white lg:w-[600px] m-auto'>
            <div className='text-center pb-2 text-2xl'>Login now to get the ticket to another world!</div>
            <div className='py-4 mb-2 text-gray-600'>
                <div className='flex md:items-center pb-3'>
                    <LockIcon className='text-blue-500 mt-1 md:mt-0' fontSize='small' />
                    <div className='pl-[6px] dark:text-white'>Glimpse into the ancient scrolls waiting to be unfurled.</div>
                </div>
                <div className='flex md:items-center'>
                    <LockIcon className='text-blue-500 mt-[5px] md:mt-0' fontSize='small' />
                    <div className='pl-[6px] dark:text-white'>Get access to our digital library and never lose track of your progress.</div>
                </div>
                <div className='flex md:items-center pt-3'>
                    <LockIcon className='text-blue-500 mt-[5px] md:mt-0' fontSize='small' />
                    <div className='pl-[6px] dark:text-white'>Engage with your fellow readers and authors in the comment</div>
                </div>
            </div>
            <div className='flex justify-center flex-col w-max m-auto'>
                <Link href={{ pathname: '/login' }}>
                    <button className='border px-6 py-[6px] rounded-md bg-blue-500 text-white'>LOG IN</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginBox