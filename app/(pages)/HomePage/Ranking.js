'use client'
import useApiService from '@/services/ApiService';
import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react';

function Ranking(props) {
    const { getRankingByView, getRankingByBookmark, getRankingByCoins } = useApiService();
    const [rankingData, setRankingData] = useState({
        rankingByCoinData: null,
        rankingByBookmarkData: null,
        rankingByViewData: null
    });

    const handleGetViewRanking = () => {
        const param = 'page=1&limit=5';
        getRankingByView(param).then((res)=>{
            setRankingData((prev)=>({...prev, rankingByViewData: res?.data?.data?.data}));
        }).catch((err)=>{
            console.log(err);
        });
    }

    const handleGetBookmarkRanking = () => {
        const param = 'page=1&limit=5';
        getRankingByBookmark(param).then((res)=>{
            setRankingData((prev)=>({...prev, rankingByBookmarkData: res?.data?.data?.data}));
        }).catch((err)=>{
            console.log(err);
        });
    }

    const handleGetCoinRanking = () => {
        const param = 'page=1&limit=5';
        getRankingByCoins(param).then((res)=>{
            setRankingData((prev)=>({...prev, rankingByCoinData: res?.data?.data?.data}));
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    useEffect(()=>{
        handleGetBookmarkRanking();
        handleGetCoinRanking();
        handleGetViewRanking();
    },[]);

    return (
        <div className='mt-10 px-4 md:px-8 pt-4 pb-20 bg-[#212121] dark:bg-[#131415] text-white'>
            <div className='hidden md:block rankingParentHeading text-2xl md:text-2xl font-semibold text-center'>Imperial Honors</div>
            <div className='hidden md:grid grid-cols-3 xl:gap-14 gap-4 md:px-2 px-0'>
                <div className='dark:bg-[#202020] bg-[#131415] pb-20 px-3 rounded-xl mt-3 shadow-[0px_0px_7px_2px_#10101026]'>
                    <div className='flex items-center justify-between pt-6'>
                        <div className='font-semibold text-center px-1'>Trending Ranking</div>
                        {/* <Link href={{ pathname: `/ranking/coins` }} className='underline text-[13px] pr-2'>More</Link> */}
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-y-20 gap-x-8 items-center mt-4'>
                        {rankingData?.rankingByCoinData?.slice(0, 4)?.map((item, index) => {
                            return (
                                <Link href={{ pathname: `detail/view/${item?._id}` }} prefetch key={index} className='relative flex items-center justify-center group cursor-pointer'>
                                    <div className='h-40 w-36 -mb-2 z-10'>
                                        <Image height={200} width={200} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt="cover"
                                            className='object-contain h-full w-full rounded-md group-hover:-translate-y-5 group-hover:duration-300' />
                                    </div>
                                    <div className='group-hover:border-[#20A7FE] w-[8.5rem] xl:w-40 text-xs group-hover:border absolute -bottom-14 pt-20 pb-[12px] text-center px-1 rounded-md bg-[#212121] dark:bg-gray-950'>
                                        <div className='py-[2px] px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                        <div className='text-gray-200'>{item?.genre}</div>
                                        <div className='font-semibold'>{item?.title?.length > 20 ? item?.title.slice(0, 20) : item?.title}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className='relative top-16 right-2 w-full text-end'>
                        <Link href={{ pathname: `/ranking/coins` }} prefetch className='underline text-[13px]'>More</Link>
                    </div>
                </div>

                <div className='dark:bg-[#202020] bg-[#131415] pb-20 px-3 rounded-xl mt-3 shadow-[0px_0px_7px_2px_#10101026]'>
                    <div className='flex items-center justify-between pt-6'>
                        <div className='font-semibold text-center px-1'>Popular Ranking</div>
                        {/* <Link href={{ pathname: `/ranking/views` }} className='underline text-[13px] pr-2'>More</Link> */}
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-y-20 gap-x-8 items-center mt-4'>
                        {rankingData?.rankingByViewData?.slice(0, 4)?.map((item, index) => {
                            return (
                                <Link href={{ pathname: `/detail/view/${item?._id}` }} prefetch key={index} className='relative flex items-center justify-center group cursor-pointer'>
                                    <div className='h-40 w-36 -mb-2 z-10'>
                                        <Image height={200} width={200} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt="cover"
                                            className='object-contain h-full w-full rounded-md group-hover:-translate-y-5 group-hover:duration-300' />
                                    </div>
                                    <div className='group-hover:border-[#20A7FE] w-[8.5rem] xl:w-40 text-xs group-hover:border absolute -bottom-14 pt-20 pb-[12px] text-center px-1 rounded-md bg-[#212121] dark:bg-gray-950'>
                                        <div className='py-[2px] px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                        <div className='text-gray-200'>{item?.genre}</div>
                                        <div className='font-semibold'>{item?.title?.length > 20 ? item?.title.slice(0, 20) : item?.title}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className='relative top-16 right-2 w-full text-end'>
                        <Link href={{ pathname: `/ranking/coins` }} prefetch className='underline text-[13px]'>More</Link>
                    </div>
                </div>

                <div className='dark:bg-[#202020] bg-[#131415] pb-20 px-3 rounded-xl mt-3 shadow-[0px_0px_7px_2px_#10101026]'>
                    <div className='pt-6 flex items-center justify-between'>
                        <div className='font-semibold text-center px-1'>Collection Ranking</div>
                        {/* <Link href={{ pathname: '/ranking/bookmark' }} className='underline text-[13px] pr-2'>More</Link> */}
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-y-20 gap-x-8 items-center mt-4'>
                        {rankingData?.rankingByBookmarkData?.slice(0, 4)?.map((item, index) => {
                            return (
                                <Link key={index} href={{ pathname: `/detail/view/${item?._id}` }} prefetch className='relative flex items-center justify-center group cursor-pointer'>
                                    <div className='h-40 w-36 -mb-2 z-10'>
                                        <Image height={200} width={200} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt="cover"
                                            className='object-contain h-full w-full rounded-md group-hover:-translate-y-5 group-hover:duration-300' />
                                    </div>
                                    <div className='group-hover:border-[#20A7FE] w-[8.5rem] xl:w-40 text-xs group-hover:border absolute -bottom-14 pt-20 pb-[12px] text-center px-1 rounded-md bg-[#212121] dark:bg-gray-950'>
                                        <div className='py-[2px] px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                        <div className='text-gray-200'>{item?.genre}</div>
                                        <div className='font-semibold'>{item?.title?.length > 20 ? item?.title.slice(0, 20) : item?.title}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className='relative top-16 right-2 w-full text-end'>
                        <Link href={{ pathname: `/ranking/coins` }} prefetch className='underline text-[13px]'>More</Link>
                    </div>
                </div>
            </div>


            <div className='block md:hidden'>
                <div className='flex justify-between items-center pb-2'>
                    <div className='text-center font-semibold pb-2'>Imperial Honors!</div>
                    <Link href={{ pathname: `novel-list/rating` }} prefetch className='underline text-xs'>See More</Link>
                </div>
                <div className='flex justify-center gap-5'>
                    {rankingData?.rankingByBookmarkData?.slice(0, 3)?.map((item, index) => {
                        return (
                            <div key={index} className='relative flex items-center justify-center group cursor-pointer'>
                                <div className='h-28 w-24 mb-3 z-10'>
                                    <Image height={100} width={100} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt="cover" className='object-cover rounded-md group-hover:-translate-y-6 group-hover:duration-300' />
                                </div>
                                <div className='group-hover:border-[#20A7FE] w-28 text-xs group-hover:border absolute -bottom-14 pt-20 pb-1 text-center px-1 rounded-md bg-gray-900 dark:bg-gray-950'>
                                    <div className='px-[6px] mb-[4px] border rounded-full w-max m-auto'>{index + 1}</div>
                                    <div className='text-gray-500'>{item?.genre}</div>
                                    <div className='font-semibold'>{item?.title?.slice(0, 12)}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Ranking