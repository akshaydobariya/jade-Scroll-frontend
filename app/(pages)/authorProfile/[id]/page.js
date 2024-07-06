'use client'
import useApiService from '@/services/ApiService';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Avatar, Rating } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { usePathname } from 'next/navigation';
import PaginationControlled from '@/components/pagination';
import Link from 'next/link';

function AuthorProfile() {
    const { authorProfile, getNovelsByAuthor } = useApiService()
    const [profiledata, setProfiledata] = useState()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
    })
    const [page, setPage] = useState(1);
    const [novelData, SetNovalData] = useState([])

    const path = usePathname()
    const pathName = path.slice(15);
    useEffect(() => {
        getData(pathName);
    }, [page])

    const getData = (pathName) => {
        authorProfile(pathName).then((res) => {
            setProfiledata(res?.data?.data)
            const url = `id=${pathName}&page=${page}&limit=10`
            getNovelsByAuthor(url).then((result => {
                SetNovalData(result?.data?.data)
            }))
        }).catch((er) => {
            console.log(er, "er profile");
        })
    }

    return (
        <div className='min-h-[75vh]'>
            <div className='h-[20px] mt-16 py-10 bg-gray-200 dark:bg-[#131415] dark:text-white text-black flex justify-center items-center'>
                <div className='text-3xl'>Author Profile</div>
            </div>
            <div className='sm:px-10 px-4'>
                <ToastContainer
                    position="bottom-right"
                    newestOnTop={false}
                    stacked
                />


                <div className='sm:flex gap-10 py-10 w-full shadow-md px-10 '>
                    <div className=''>
                        <Avatar src={profiledata?.author?.profileImg} sx={{ height: "8rem", width: "8rem" }} className=' rounded-md p-1 flex justify-center mx-auto my-0' />
                    </div>
                    <div className=' flex justify-between pt-4'>
                        <div>
                            <div className='text-2xl capitalize'>{profiledata?.author?.pseudonym}</div>
                            <div className='text-base dark:text-gray-100 text-gray-700 py-1'>Email: {profiledata?.author?.email}</div>
                            <div className='text-base dark:text-gray-100 text-gray-700'>About: {profiledata?.author?.bio}</div>
                            <div className='text-base dark:text-gray-100 text-gray-700 mt-2'><b className='bg-blue-500 rounded-md text-white px-4  py-1'>Total Books -  {novelData?.totalDocs > 0 ? novelData?.totalDocs : "0"}</b></div>
                        </div>
                    </div>
                </div>

                <div className='bg-gray-200 dark:bg-[#131415] sm:px-10'>
                    {novelData?.data?.length > 0 &&
                        <>
                            <div className='h-[20px]  pt-10 pb-8  flex justify-center items-center dark:text-white text-black'>
                                <div className='text-3xl'>Author Works</div>
                            </div>
                            <hr className='bg-black p-[.3px] mb-2 w-full ' />
                        </>
                    }
                    {novelData?.data?.length == 0 ?
                        <div className='text-center pt-5 dark:text-white'>No data found ?</div> :
                        <div className='grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 gap-4 md:gap-4 justify-center items-center py-3 px-2 md:px-5'>
                            {novelData?.data?.map((item, index) => {
                                return (
                                    <Link href={{ pathname: `/detail/${item?._id}` }} key={index} className='dark:border-white w-full m-auto rounded-lg bg-white dark:bg-gray-950 p-1 dark:shadow-md shadow-[0_0_4px_5px_#ebebeb]'>
                                        <div className='h-40 w-full md:h-40 lg:h-52 overflow-hidden'>
                                            <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item.coverImg} height={300} width={300} alt={item?.title} className='ImageZoom h-full w-full rounded-t-md hover:rounded-md object-cover' />
                                        </div>
                                        <div className='pl-1 pt-2'>
                                            <div className='text-sm md:text-lg font-semibold hidden md:block dark:text-gray-200'>{item?.title?.length > 15 ? item.title?.slice(0, 15) : item?.title}</div>
                                            <div className='text-xs md:py-1 border border-blue-600 my-1 px-4 w-fit rounded-md text-gray-600 dark:text-gray-400 hidden md:block'>{item?.genre}</div>
                                            <div className='text-xs md:py-1 text-gray-600 dark:text-gray-400 block md:hidden'>{item?.genre?.length > 10 ? item?.genre.slice(0, 10) : item?.genre}</div>
                                            {/* <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly /> */}
                                            <div className='flex'>
                                                <Rating
                                                    icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                                    emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                                    value={item?.totalRating}
                                                    className='pt-1'
                                                    readOnly
                                                />
                                                {item?.totalRating > 0 && (
                                                    <div className='text-xs pl-1 pt-1'>{`(${item?.totalRating})`}</div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    }
                    {novelData?.data?.length > 0 && (
                        <div className='flex justify-center'>
                            <PaginationControlled
                                setPage={(page) => { setPage(page); getData(pathName) }}
                                last_page={novelData?.totalPage}
                                page={page}
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default AuthorProfile