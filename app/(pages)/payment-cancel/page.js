import React from 'react'
import fail from '../../../public/assets/Images/fail.webp'
import Image from 'next/image'
function page() {
  return (
    <div className='md:pt-24 pt-16 px-26 w-fit flex mx-auto h-[100vh] my-0 justify-center items-center'>
            <div className="">
                <div className="bg-white p-6 px-16 rounded-2xl md:mx-auto w-full">
                <Image src={fail} alt="my gif" height={220} className='flex mx-auto justify-center' width={220} />
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Cancel</h3>
                        <div className="py-10 text-center" >
                            <a href="/package" className="px-12 bg-indigo-600 cursor-pointer rounded-md hover:bg-indigo-500 text-white font-semibold py-3">
                                GO BACK
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default page