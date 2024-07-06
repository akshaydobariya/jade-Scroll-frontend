'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick'
import React, { useState, useEffect } from 'react'
import useApiService from '@/services/ApiService';

function Originals(props) {
    const {getOriginalWork} = useApiService();
    const [originalNovelData, setOriginalNovelData] = useState([]);

    useEffect(()=>{
        getOriginalWork().then((res)=>{
            setOriginalNovelData(res?.data?.data);
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    const settings = {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    const [doubleClick, setDoubleClick] = useState({ id: '', count: 0 })
    const [switchValue, setSwitchValue] = useState(false)

    const router = useRouter()

    useEffect(() => {
        doubleClick?.count == 1 && router.push(`/detail/view/${doubleClick?.id}`)
    }, [doubleClick])

    return (
        <div className='mx-0'>
            <div className='md:py-10 md:mt-10 py-8 px-4 md:px-16 lg:px-28 bg-[#212121] dark:bg-[#131415]'>
                <div className='flex justify-between items-center text-start pb-5 dark:pb-1'>
                    <div className='text-2xl md:text-3xl font-bold text-gray-100'>Jadescrolls Originals</div>
                    {originalNovelData?.length > 4 && <div onClick={() => setSwitchValue(!switchValue)} className='hidden xl:block cursor-pointer text-xl text-white'>Switch</div>}
                </div>

                {originalNovelData?.length > 1 ?
                    <div className='flex xl:hidden'>
                        <Slider {...settings} className='w-full'>
                            {originalNovelData?.map((item, index) => {
                                return (
                                    // <Link href={{pathname:`/detail/${item?._id}`}} className='' key={index}>
                                    // <div className='' key={index} onClick={() => router.push(`/detail/${item?._id}`)}>
                                    <div className='' key={index} onClick={() => {
                                        setDoubleClick({
                                            id: item?._id,
                                            count: doubleClick?.id == item?._id ? doubleClick?.count + 1 : 0,
                                        })
                                    }}>
                                        <div className="card cursor-pointer">
                                            <div className="img-container">
                                                <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt='cover' height={300} width={300} />
                                            </div>
                                            <div className="card-details">
                                                <div className='text-base md:py-3 pb-1 text-black'>{item.title?.length > 30 ? `${item.title.slice(0, 30)}..` : item?.title}</div>
                                                <p className='text-sm'>{item?.description?.length > 60 ? `${item?.description?.slice(0, 60)}..` : item?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    :
                    <div className='flex xl:hidden'>
                        {originalNovelData?.map((item, index) => {
                            return (
                                // <Link href={{ pathname: `/detail/${item?._id}` }} className='' key={index}>
                                // <div className='' key={index} onClick={() => router.push(`/detail/${item?._id}`)}>
                                <div className='' key={index} onClick={() => {
                                    setDoubleClick({
                                        id: item?._id,
                                        count: doubleClick?.id == item?._id ? doubleClick?.count + 1 : 0,
                                    })
                                }}>
                                    <div className="card cursor-pointer">
                                        <div className="img-container">
                                            <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt={item.title} height={300} width={300} />
                                        </div>
                                        <div className="card-details">
                                            <div className='text-base md:py-3 pb-1 text-black'>{item.title?.length > 30 ? `${item.title.slice(0, 30)}..` : item?.title}</div>
                                            <p className='text-sm'>{item?.description?.length > 60 ? `${item?.description?.slice(0, 60)}..` : item?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }

                <div className='hidden xl:block'>
                    <div className='flex'>
                        {originalNovelData?.slice(switchValue ? 4 : 0, switchValue ? 8 : 4)?.map((item, index) => {
                            return (
                                <Link href={{ pathname: `/detail/view/${item?._id}` }} prefetch className="card cursor-pointer" key={index}>
                                    <div className="img-container">
                                        <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt={item.title} height={600} width={600} />
                                    </div>
                                    <div className="card-details">
                                        <div className='text-lg py-3 text-black font-semibold'>{item.title}</div>
                                        <p>{item?.description?.length > 140 ? `${item?.description?.slice(0, 140)}..` : item?.description}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Originals