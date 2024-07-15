'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode'
import { FreeMode, Mousewheel } from 'swiper/modules'
import useApiService from '@/services/ApiService';

function PopularNovels(props) {
    const router = useRouter();
    const { getMostPopularNovels } = useApiService();
    const [mostPopularNovelData, setMostPopularNovelData] = useState([]);
    const [title, setTitleIndex] = useState(null);

    useEffect(() => {
        getMostPopularNovels()
            .then((res) => {
                setMostPopularNovelData(res?.data?.data?.data || []);
            })
            .catch((err) => {
                console.error('Error fetching popular novels:', err);
            });
    }, []);

    return (
        <>

            <div className='md:pt-10 pt-10 px-4 md:px-8'>
                <div className='flex justify-between items-center pb-5'>
                    <div className='text-2xl md:text-2xl font-bold'>Most Popular Novels</div>
                    {mostPopularNovelData?.length > 6 && <Link href={{ pathname: `novel-list/latest-More` }} className='underline cursor-pointer'>See More</Link>}
                </div>

                <div className='md:hidden block'>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        freeMode={true}
                        pagination={{ clickable: false }}
                        modules={[FreeMode]}
                        allowTouchMove={true}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                    >
                        {mostPopularNovelData?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={`${index === title ? '' : 'before:z-0'} NewReleaseCard cursor-pointer rounded-2xl overflow-hidden`} >
                                    <Link href={`/detail/view/${item?._id}`} prefetch>
                                        <Image
                                            src={item?.coverImg || ""}
                                            height={300}
                                            width={200}
                                            alt='cover'
                                            className='releaseImage'
                                            loading="lazy" // Lazy loading added here
                                        />
                                    </Link>
                                    <div className={index === title ? "info" : ""}>
                                        <h1 className='font-semibold'>{item?.title || ''}</h1>
                                        <p>{item?.description?.slice(0, 145) || ''}</p>
                                    </div>
                                    <div onClick={() => setTitleIndex(index)} className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title}</div>
                                    <div onClick={() => setTitleIndex(title !== index ? index : null)} className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title?.slice(0, 15)}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='md:gap-x-4 md:flex hidden'>
                    <Swiper
                        direction='horizontal'
                        slidesPerView={4}
                        spaceBetween={10}
                        mousewheel={true}
                        freeMode={true}
                        modules={[Mousewheel, FreeMode]}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                    >
                        {mostPopularNovelData?.map((item, index) => (
                            <SwiperSlide key={index} className="containerImage cursor-pointer">
                                <Link href={`/detail/view/${item?._id}`} prefetch>
                                    <Image
                                        src={item?.coverImg || ""}
                                        height={300}
                                        width={200}
                                        alt='cover'
                                        className='rounded-md h-auto max-h-[280px] object-cover aspect-auto'
                                        loading="lazy" // Lazy loading added here
                                    />
                                    <div className="textImage px-2">
                                        <h1 className='font-semibold pb-1 pt-1'>{item?.title?.slice(0, 30)}</h1>
                                        <p>{item?.description?.slice(0, 110)}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/* <div className='md:pt-10 pt-10 px-4 md:px-8'>
                <div className='flex justify-between items-center pb-5'>
                    <div className='text-2xl md:text-2xl font-bold'>Most Popular Novels</div>
                    <Link href={{ pathname: `/novel-list/popular-More` }} prefetch className='underline cursor-pointer'>See More</Link>
                </div>
                <div className='md:gap-x-4 flex md:hidden'>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        freeMode={true}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}>
                        {mostPopularNovelData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className={`NewReleaseCard cursor-pointer rounded-2xl overflow-hidden`}>
                                    <Link href={`/detail/view/${item?._id}`} prefetch>
                                        <Image src={item?.coverImg || ""} height={300} width={300} alt='cover' className='releaseImage' />
                                    </Link>
                                    <div className='info'>
                                        <h1 className='font-semibold'>{item?.title}</h1>
                                        <p>{item?.description?.slice(0, 200)}</p>
                                    </div>
                                    <div onClick={() => setTitleIndex(index)} className="hidden md:block text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title}</div>
                                    <div onClick={() => setTitleIndex(index)} className="block md:hidden text-white font-semibold gradientClassCards text-center text-sm py-1 absolute bottom-0 w-full rounded-b-xl z-10">{item?.title?.slice(0, 15)}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='md:gap-x-4 md:flex hidden'>
                    <Swiper
                        slidesPerView={5}
                        loop
                        spaceBetween={8}
                        freeMode={true}
                        mousewheel={true}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}>
                        {mostPopularNovelData.map((item, index) => (
                            <SwiperSlide key={index} className="containerImage cursor-pointer">
                                <Link href={`/detail/view/${item?._id}`} prefetch>
                                    <Image src={item?.coverImg || ""} height={300} width={300} alt='cover' className='rounded-md h-[280px] object-cover' />
                                    <div className="textImage">
                                        <h1 className='font-semibold'>{item?.title?.slice(0, 30)}</h1>
                                        <p>{item?.description?.slice(0, 70)}</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> */}
        </>

    );
}

export default PopularNovels;
