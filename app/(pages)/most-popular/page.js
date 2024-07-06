import Image from 'next/image'
import React from 'react'
import Rating from '@mui/material/Rating';
import heroinImg from '../../../public/assets/Images/Banner/heroin.jpeg'
import banner1 from '../../../public/assets/Images/Banner/banner-one.jpg'
import banner2 from '../../../public/assets/Images/Banner/banner-two.jpg'

function MostPopular(props) {
    const popularMobile = [
        {
            image: banner1,
            name: "Dragon Prince Yuan",
            section: "Fantasy"
        },
        {
            image: banner2,
            name: "Immortal Martial God",
            section: "Fantasy"
        },
    ]

    return (
        <div className='md:mt-16 mt-10 bg-gray-800 py-10 md:px-8 px-2'>
            <div className='pb-5 flex items-center justify-between text-white'>
                <div className='text-2xl font-semibold'>Featured Productssssssssss</div>
                <div className='underline'>See More</div>
            </div>

            <div className='flex  md:flex-row'>
                <div className='hidden md:w-[35%] md:grid md:grid-cols-2 grid-cols-3 gap-4'>
                    {props?.popular?.map((item, index) => {
                        return (
                            <div key={index} className=''>
                                <div key={index} className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-32 xl:w-56 h-28 w-32  overflow-hidden'>
                                        <Image src={item?.image == null || item?.image == "null" ? "" : item?.image} alt={item.name} className='h-full w-full object-cover popularImageParent' />
                                    </div>
                                    <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                        <div className='hidden md:block text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                        <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                        <div className='text-[13px] py-1'>{item?.section}</div>
                                        <div className='flex items-center'>
                                            <Rating size='small' name="read-only" value="3.5" readOnly />
                                            <span className='hidden md:block text-xs pl-2'>4.5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='block md:hidden w-[30%] grid md:grid-cols-2 grid-cols-1 gap-2'>
                    {popularMobile?.map((item, index) => {
                        return (
                            <div key={index} className=''>
                                <div className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-32 xl:w-56 h-20 w-32  overflow-hidden'>
                                        <Image src={item?.image == null || item?.image == "null" ? "" : item?.image} alt={item.name} className='h-full w-full object-cover popularImageParent' />
                                    </div>
                                    <div className='text-white text-start pt-1 md:pb-0 px-1'>
                                        <div className='block md:hidden text-sm font-semibold'>{item?.name.slice(0, 10)}</div>
                                        <div className='text-[13px] py-1'>{item?.section}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='border border-gray-600 rounded-md w-[45%] md:w-[30%] flex flex-col justify-center items-center md:px-8 md:mx-6 mx-3 mb-5 md:my-0'>
                    <div className='md:w-full md:h-48 w-36 h-32 md:px-3 object-cover md:pr-3 px-3'>
                        <Image src={heroinImg} alt='image1' className='h-full w-full rounded-l-md md:rounded-none object-contain' />
                    </div>

                    <div className='text-white text-start md:pt-4 pl-2 pb-2'>
                        <div className='md:text-xl text-lg font-semibold'>The Heroin Queen</div>
                        <div className='text-gray-400 md:text-sm text-sm font-normal py-1'>Eastern</div>
                        <Rating size='small' name="read-only" value="5" readOnly />
                        <div className='text-gray-400 py-1 hidden md:block text-sm'>She was a beauty with pretty appearance beyond comparison. Time-traveling to the Alien world thousands of years ago for a few times, she fought against monsters and evils and saved her country ...</div>
                        <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                    </div>
                </div>

                <div className='hidden md:pr-0 md:w-[35%] md:grid md:grid-cols-2 grid-cols-3 gap-4'>
                    {props?.popular?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-56 h-28 w-32 overflow-hidden'>
                                        <Image src={item?.image == null || item?.image == "null" ? "" : item?.image} alt={item.name} className='h-full w-full popularImageParent object-cover' />
                                    </div>
                                    <div className='text-white text-start pt-1 px-1'>
                                        <div className='text-sm font-semibold'>{item?.name.slice(0, 13)}</div>
                                        <div className='text-sm py-1'>{item?.section}</div>
                                        <div className='flex items-center'>
                                            <Rating size='small' name="read-only" value="2.5" readOnly />
                                            <span className='hidden md:block text-xs pl-2'>2.5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='block md:hidden md:pr-0 w-[30%] grid md:grid-cols-2 grid-cols-1'>
                    {popularMobile?.map((item, index) => {
                        return (
                            <div key={index} className=''>
                                <div  className='cardPopular cursor-pointer border-gray-500 border rounded-md pb-2'>
                                    <div className='md:h-36 md:w-56 h-20 w-32 overflow-hidden'>
                                        <Image src={item?.image == null || item?.image == "null" ? "" : item?.image} alt={item.name} className='h-full w-full popularImageParent object-cover' />
                                    </div>
                                    <div className='text-white text-start pt-1 px-1'>
                                        <div className='text-sm font-semibold'>{item?.name.slice(0, 10)}</div>
                                        <div className='text-sm py-1'>{item?.section}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MostPopular