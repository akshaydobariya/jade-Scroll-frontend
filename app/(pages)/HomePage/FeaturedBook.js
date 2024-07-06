'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import useApiService from '@/services/ApiService';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { BOOKMARK, BOOKMARK_REMOVE } from '@/app/Redux/slice/userSlice';
import { Box, Modal } from '@mui/material';
import LoginBox from '@/components/LoginBox';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};
function FeaturedBook(props) {
    const { bookmarkNovel, getFeaturedProduct } = useApiService()
    const router = useRouter()
    const [saveBookmark, setSaveBookmark] = useState('bookmark')
    const [centerNovelData, setCenterNovelData] = useState()
    const dispatch = useDispatch()
    const bookmarkData = useSelector((state) => state?.user?.bookmark)
    const [openModal, setOpenModal] = useState(false);
    const [featuredNovelData, setFeaturedNovelData] = useState([]);
    // useEffect(() => {
    //     setCenterNovelData(featuredNovelData[0])
    // }, [saveBookmark])

    useEffect(()=>{
        getFeaturedProduct().then((res)=>{
            setFeaturedNovelData(res?.data?.data);
            setCenterNovelData(res?.data?.data[0])
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    const novelBookmark = (id) => {
        if (localStorage.getItem('token')) {
            bookmarkNovel(id).then((res) => {
                if (res?.data?.data == "novel has been saved!") {
                    setSaveBookmark('RemoveBookmark')
                    dispatch(BOOKMARK([...bookmarkData, { novelId: id, notification: true }]))
                } else {
                    setSaveBookmark('bookmark')
                    let dataFilter = bookmarkData?.filter((reduxId) => reduxId?.novelId !== id)
                    dispatch(BOOKMARK(dataFilter))
                }
                toast.success(res?.data?.data)
            }).catch((er) => {
                console.log(er);
            })
        } else {
            setOpenModal(true)
            //  router.push('/login')
        }
    }

    const [activeIndex, setActiveIndex] = useState(0)
    const [activeId, setActiveId] = useState(null)

    useEffect(() => {
        const activeItem = featuredNovelData?.[activeIndex];
        setActiveId(activeItem);
    }, [activeIndex, featuredNovelData]);


    const settings = {
        dots: false,
        slidesToShow: 2,
        autoplay: false,
        swipeToSlide: true,
        swipe: true,
        speed: 100,
        pauseOnDotsHover: false,
        afterChange: (index) => setActiveIndex(index),
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 6,
                    infinite: false,
                    dots: false,
                    swipeToSlide: true,
                    swipe: true,
                    speed: 100,
                    pauseOnDotsHover: false,

                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    swipeToSlide: true,
                    swipe: true,
                    speed: 100,
                    pauseOnDotsHover: false,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className='md:mt-16 mt-10 dark:bg-[#131415] bg-[#212121] py-10 md:px-8 px-2'>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='md:w-[640px] w-[320px] dark:bg-[#202020] dark:text-white'>
                    <div className='flex justify-end'><CloseIcon className='cursor-pointer' onClick={() => setOpenModal(false)} /></div>
                    <LoginBox />
                </Box>
            </Modal>
            <ToastContainer
                position="bottom-right"
                newestOnTop={false}
                stacked
            />
            <div className='pb-5 flex items-center justify-between text-white'>
                <div className='text-2xl font-bold'>Featured Novels</div>
                {/* <Link href={{ pathname: `/novel-list/feature` }} className='underline'>See More</Link> */}
            </div>

            {featuredNovelData?.length > 0 &&
                <div className='hidden xl:flex md:flex-row'>
                    <div className='md:w-[35%] lg:grid md:grid-cols-2 grid-cols-3 gap-4'>
                        {featuredNovelData?.slice(0, 4)?.map((item, index) => {
                            return (
                                <div key={index} onClick={() => setCenterNovelData(item)} className='dark:bg-[#131415]'>
                                    <div key={index} className='cardPopular cursor-pointer border-gray-500 bg-[#131415] dark:bg-[#202020] rounded-md pb-2' style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                                        <div className='md:h-36 md:w-32 xl:w-56 h-28 w-32  overflow-hidden'>
                                            <Image height={300} width={300} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt='cover' className='h-[300px] w-full object-cover popularImageParent' />
                                        </div>
                                        <div className='text-white text-start pt-1 pb-2 md:pb-0 px-1'>
                                            <div className='text-sm font-semibold'>{item?.title.length > 25 ? item?.title?.slice(0, 25) : item?.title}</div>
                                            <div className='text-[13px] py-1'>{item?.genre}</div>
                                            <div className='flex items-center '>
                                                {/* <Rating size='small' name="read-only" value={item.totalRating} readOnly /> */}

                                                <Rating
                                                    icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                                    emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                                    value={item.totalRating}
                                                    readOnly
                                                    className='flex'
                                                />

                                                {item?.totalRating > 0 && (
                                                    <div className='text-xs pl-1 pt-1'>{`(${item?.totalRating})`}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className=' border-gray-600 dark:bg-[#202020] bg-[#131415] rounded-md w-[45%] md:w-[30%] lg:flex flex-col justify-between items-center md:px-8 md:mx-6 mx-3 mb-5 md:my-0 pt-3'
                        style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                        <div>
                            <div className='md:w-full md:h-48 w-36 h-32 md:px-3 object-cover md:pr-3 px-3'>
                                {centerNovelData?.coverImg && <Image src={centerNovelData?.coverImg == null || centerNovelData?.coverImg == "null" ? "" : centerNovelData?.coverImg} height={300} width={300} alt='cover' className='h-full w-full rounded-l-md md:rounded-none object-contain' />}
                            </div>

                            <div className='text-white text-start md:pt-4 pl-2 pb-2'>
                                <div className='md:text-xl text-sm font-semibold'>{centerNovelData?.title}</div>
                                <div className='text-gray-400 md:text-sm text-sm font-normal py-1'>{centerNovelData?.genre}</div>
                                <div className='flex'>
                                    {/* <Rating size='small' name="read-only" value={Number(centerNovelData?.totalRating)} readOnly /> */}
                                    <Rating
                                        icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                        emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                        value={Number(centerNovelData?.totalRating)}
                                        readOnly
                                        className='flex'
                                    />

                                    {centerNovelData?.totalRating > 0 && (
                                        <div className='text-xs pl-1 pt-1'>{`(${centerNovelData?.totalRating})`}</div>
                                    )}
                                </div>
                                <div className='text-gray-400 py-1 hidden md:block text-sm'>{centerNovelData?.description.length > 90 ? centerNovelData?.description?.slice(0, 90) : centerNovelData?.description}</div>
                                <div className='text-gray-400 block md:hidden text-sm'>She was a beauty with pretty appearance beyond comparison...</div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center w-full px-2 pb-3 mb-2'>
                            <Link href={{ pathname: `/detail/view/${centerNovelData?._id}` }} prefetch>
                                <button className='border lg:px-9 px-2 text-white py-1 text-xs'>Read Now</button>
                            </Link>
                            {bookmarkData?.filter((item) => item?.novelId == centerNovelData?._id).length > 0 ?
                                <BookmarkAddedOutlinedIcon onClick={() => {
                                    setSaveBookmark('bookmark')
                                    novelBookmark(centerNovelData?._id)
                                }} titleAccess='Remove bookmark' className='text-white cursor-pointer text-2xl' /> :
                                <BookmarkAddOutlinedIcon onClick={() => novelBookmark(centerNovelData?._id)} titleAccess='save bookmark' className='text-white cursor-pointer text-2xl' />
                            }
                        </div>
                    </div>

                    <div className=' md:pr-0 md:w-[35%] lg:grid md:grid-cols-2 grid-cols-3 gap-4'>
                        {featuredNovelData?.slice(4, 8)?.map((item, index) => {
                            return (
                                <div key={index} onClick={() => setCenterNovelData(item)} className='dark:bg-gray-950 h-min'>
                                    <div className='cardPopular cursor-pointer border-gray-500 bg-[#131415] dark:bg-[#202020] rounded-md pb-2' style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                                        <div className='md:h-36 md:w-56 h-28 w-32 overflow-hidden'>
                                            <Image height={300} width={300} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt='cover' className='h-[300px] w-full popularImageParent object-cover' />
                                        </div>
                                        <div className='text-white text-start pt-1 px-1'>
                                            <div className='text-sm font-semibold'>{item?.title.length > 25 ? item?.title?.slice(0, 25) : item?.title}</div>
                                            <div className='text-sm py-1'>{item?.genre}</div>
                                            <div className='flex items-center '>
                                                <Rating
                                                    icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                                    emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                                    value={item?.totalRating}
                                                    readOnly
                                                    className='flex'
                                                />
                                                {item?.totalRating > 0 && (
                                                    <div className='text-xs pl-1 pt-1'>{`(${item?.totalRating})`}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }

            <div className='xl:hidden block'>
                <div className='gap-x-2'>
                    <Slider {...settings}>
                        {featuredNovelData?.map((item, index) => {
                            return (
                                <Link href={{ pathname: `/detail/view/${item?._id}` }} prefetch key={index} className={`md:h-36 md:w-56 h-48 w-36 px-2`}>
                                    <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} height={300} width={300} alt='cover' className={`h-full w-full object-cover ${activeIndex == index ? 'border-b-[6px] rounded-b-md border-blue-500' : ''}`} />
                                </Link>
                            )
                        })}
                    </Slider>
                </div>

                <div className='block xl:hidden dark:bg-gray-950 rounded-md flex flex-col my-5 px-3 py-4'
                    style={{ boxShadow: "rgb(24 24 24) 0px 0px 5px 0px" }}>
                    <div className='flex'>
                        <div className='text-white text-start pl-2 w-full'>
                            <div className='flex justify-between'>
                                <div className='md:text-xl text-sm font-semibold'>{activeId?.title}</div>
                                {bookmarkData?.filter((item) => item?.novelId == activeId?._id).length > 0 ?
                                    <BookmarkAddedOutlinedIcon onClick={() => novelBookmark(activeId?._id)} titleAccess='Remove bookmark' fontSize='large' className='text-white cursor-pointer text-2xl' /> :
                                    <BookmarkAddOutlinedIcon onClick={() => novelBookmark(activeId?._id)} titleAccess='save bookmark' className='text-white cursor-pointer text-2xl' />}
                            </div>
                            <div className='flex'>
                                {/* <Rating size='small' name="read-only" value={activeId?.totalRating} readOnly /> */}
                                {activeId?.totalRating > 0 &&
                                    <Rating
                                        icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                        emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                        value={activeId?.totalRating}
                                        readOnly
                                        className='flex'
                                    />
                                }
                                {activeId?.totalRating > 0 && (
                                    <div className='text-xs pl-1 pt-1'>{`(${activeId?.totalRating})`}</div>
                                )}
                            </div>
                            <div className='text-gray-400 py-1 hidden md:block text-sm'>{activeId?.description.length > 90 ? activeId?.description?.slice(0, 90) : activeId?.description}</div>
                            <div className='text-gray-400 block md:hidden text-sm'>{activeId?.description.length > 90 ? activeId?.description?.slice(0, 90) : activeId?.description}...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedBook