import useApiService from '@/services/ApiService';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import nobleBanner from '../../../public/assets/Images/noblePageBanner.jpg'
import MobilenoblePageBanner from "../../../public/assets/Images/MobilenoblePageBanner.jpg";
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import moment from 'moment';
import PaginationControlled from '@/components/pagination';

function NobleTab() {
    const { getBanners, availableNovel, getPurchaseTiers } = useApiService()
    const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
    const [availabeTiersNovelData, setAvailabeTiersNovelData] = useState()
    const [availabelNovelData, setAvailabelNovelData] = useState([])
    const [page, setPage] = useState(1)
    const [searched, setSearched] = useState('');
    const [debounceTime, setDebounceTime] = useState(null)
    const [debounceAvailableNovel, setDebounceAvailableNovel] = useState(null)
    const [availableTierspage, setAvailableTierspage] = useState(1)
    const [bannerData, setBannerData] = useState([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    const getAvailableNovelApi = (value) => {
        setSearched(value);

        if (debounceAvailableNovel) {
            clearTimeout(debounceAvailableNovel);
        }

        const timeoutId = setTimeout(() => {
            let url = `page=${availableTierspage}&limit=10&search=${value}`;
            availableNovel(url)
                .then((res) => {
                    setAvailabeTiersNovelData(res?.data?.data)
                })
                .catch((er) => {
                    console.log(er);
                });
        }, 1000);

        setDebounceAvailableNovel(timeoutId);
    }

    const getTiersApi = (value) => {
        setSearched(value);

        if (debounceTime) {
            clearTimeout(debounceTime);
        }

        const timeoutId = setTimeout(() => {
            let url = `page=1&limit=10&search=${value}`;
            getPurchaseTiers(url)
                .then((res) => {
                    setAvailabelNovelData(res?.data?.data);
                })
                .catch((er) => {
                    console.log(er);
                });
        }, 1000);

        setDebounceTime(timeoutId);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            let url = `page=1&limit=10`
            getPurchaseTiers(url).then((res) => {
                setAvailabelNovelData(res?.data?.data)
            }).catch((er) => {
                console.log(er);
            })
        }
        bannerApi()
    }, [])

    const availableNovelApi = () => {
        const limit = `page=${availableTierspage}&limit=10`
        availableNovel(limit).then((res) => {
            setAvailabeTiersNovelData(res?.data?.data)
        }).catch((er) => {
            console.log(er, "error")
        })
    }

    useEffect(() => {
        availableNovelApi()
    }, [availableTierspage])

    const bannerApi = () => {
        getBanners().then((res) => {
            setBannerData(res?.data?.data?.data)
        }).catch((er) => {
        })
    }

    return (
        <div className='w-full'>
            {bannerData?.map((item, index) => {
                const showBanner = item?.bannerType === 'APP' && item?.location === 'NOBEL' && screenWidth < 1000;
                return (
                    showBanner && (
                        <div key={index} className='relative w-full dark:bg-black dark:text-white'>
                            <div className='flex justify-end'>
                                <Image src={item?.bannerImg == null || item?.bannerImg == "null" ? "" : item?.bannerImg} height={1000} width={1000} alt='have the power in your hands' className='md:h-[400px] h-auto max-h-[400px] w-full object-cover' />
                            </div>
                            <div className='text-white absolute md:top-16 top-6 md:w-1/2 md:pr-28 pr-10 pl-5'>
                                <div className='text-xl' dangerouslySetInnerHTML={{ __html: item?.text }}></div>
                            </div>
                        </div>
                    )
                )
            })}

            {bannerData?.map((item, index) => {
                const showBanner = item?.bannerType === 'WEB' && item?.location === 'NOBEL' && screenWidth > 1000;
                return (
                    showBanner && (
                        <div key={index} className='relative w-full dark:bg-black dark:text-white'>
                            <div className='flex justify-end'>
                                <Image src={item?.bannerImg == null || item?.bannerImg == "null" ? "" : item?.bannerImg} height={1000} width={1000} alt='have the power in your hands' className='md:h-[400px] h-[270px] w-full object-cover' />
                            </div>
                            <div className='text-white absolute md:top-16 top-6 md:w-1/2 md:pr-28 pr-10 pl-5'>
                                <div className='text-xl' dangerouslySetInnerHTML={{ __html: item?.text }}></div>
                            </div>
                        </div>
                    )
                )
            })}

            <div className='w-full pb-4 pt-3'>
                <div className='hidden md:block'>
                    <Image src={nobleBanner} className='w-full h-full' height={500} width={500} alt='the perks of being a nobel' />
                </div>
                <div className='block md:hidden'>
                    <Image src={MobilenoblePageBanner} className='w-full h-full' height={500} width={500} alt='the perks of being a nobel' />
                </div>

                {availabelNovelData?.data?.length > 0 && <div className='bg-gray-200 border-t-2 dark:bg-[#131415] md:px-36 lg:px-10 px-5 pb-10'>
                    {availabelNovelData?.data?.length > 0 &&
                        <>
                            <div className='flex flex-col lg:flex-row justify-between items-center text-gray-800 pt-10 pb-5'>
                                <div className='text-3xl dark:text-gray-200 pb-4 lg:pb-0'>Purchased Novels</div>
                                <div className='border bg-white rounded-md pl-2'>
                                    <SearchIcon />
                                    <input type='text' placeholder='search' onChange={(e) => getTiersApi(e.target.value)} className='rounded-md px-2 py-1 focus:outline-none' />
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2 grid-gray-100 gap-3'>
                                {availabelNovelData?.data?.map((item, index) => {
                                    return (
                                        <Link href={{ pathname: `/detail/view/${item?.novelId?._id}` }} prefetch key={index} className='flex border-gray-400 rounded-md text-white dark:text-gray-200 shadow-md border bg-white dark:bg-[#202020]'>
                                            <div>
                                                <Image src={item?.novelId?.coverImg == null || item?.novelId?.coverImg == "null" ? "" : item?.novelId?.coverImg} alt={item?.novelId?.title} height={300} width={300} className='h-[5rem] w-24 object-cover rounded-l-md' />
                                            </div>
                                            <div className='pl-3 flex pt-1 flex-col w-full pr-2'>
                                                <div className='text-lg text-gray-900 dark:text-gray-200 font-semibold'>{item?.novelId?.title.length > 21 ? `${item?.novelId?.title.slice(0, 21)}..` : item?.novelId?.title}</div>
                                                <div className='flex justify-between w-full flex-col'>
                                                    <div className='flex text-sm list-disc gap-6 pt-1 text-gray-600 dark:text-gray-200'>chapter {item?.tiers[0]?.fromChapter} - {item?.tiers[0]?.toChapter}</div>
                                                    <div className='text-gray-600 text-sm'><span className='font-semibold'>End Date -</span>{moment(item?.tiers[0]?.endDate).format('DD MMM, YYYY')}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </>}
                    {availabelNovelData?.data?.length > 0 && (
                        <div className='flex justify-center pt-12'>
                            <PaginationControlled
                                setPage={setPage}
                                last_page={availabelNovelData?.totalPage}
                                page={page}
                            />
                        </div>
                    )}
                </div>}

                {availabeTiersNovelData?.data?.length > 0 &&
                    <div className='bg-gray-200 border-t-2 dark:bg-[#131415] md:px-36 lg:px-10 px-5 pb-10'>
                        {availabeTiersNovelData?.data?.length > 0 &&
                            <div className=''>
                                <div className='flex flex-col lg:flex-row justify-between items-center text-gray-800 pt-10 pb-5'>
                                    <div className='text-3xl dark:text-gray-200 pb-4 lg:pb-0'>Available Novels</div>
                                    <div className='border bg-white rounded-md pl-2'>
                                        <SearchIcon />
                                        <input type='text' placeholder='search' onChange={(e) => getAvailableNovelApi(e.target.value)} className='rounded-md px-2 py-1 focus:outline-none' />
                                    </div>
                                </div>
                                <div className='grid lg:grid-cols-2 grid-gray-100 gap-3'>
                                    {availabeTiersNovelData?.data?.map((item, index) => {
                                        return (
                                            <Link href={{ pathname: `/detail/view/${item?._id}` }} prefetch key={index} className='flex border-gray-400 rounded-md text-white dark:text-gray-200 shadow-md border bg-white dark:bg-[#202020]'>
                                                <div>
                                                    <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt={item?.title} height={300} width={300} className='h-[5rem] w-24 object-cover rounded-l-md' />
                                                </div>
                                                <div className='pl-3 flex pt-1 flex-col w-full pr-2'>
                                                    <div className='text-lg text-gray-900 dark:text-gray-200 font-semibold'>{item?.title.length > 21 ? `${item?.title.slice(0, 21)}..` : item?.title}</div>
                                                    <div className='text-black dark:text-white text-sm hidden md:block'>{item?.description?.length > 100 ? item?.description?.slice(0, 100) : item?.description}</div>
                                                    <div className='text-black dark:text-white text-sm block md:hidden'>{item?.description?.length > 50 ? item?.description?.slice(0, 50) : item?.description}</div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                        {availabeTiersNovelData?.data?.length > 0 && (
                            <div className='flex justify-center pt-12'>
                                <PaginationControlled
                                    setPage={setAvailableTierspage}
                                    last_page={availabeTiersNovelData?.totalPage}
                                    page={availableTierspage}
                                />
                            </div>
                        )}

                    </div>
                }
            </div>
        </div>
    )
}

export default NobleTab