import React, { useState } from 'react'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Modal, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useApiService from '@/services/ApiService';
import { BOOKMARK } from '@/app/Redux/slice/userSlice';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoginBox from '@/components/LoginBox';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function MainSectionRanking(props) {
    const {
        rankingByViewData,
        rankingTab,
    } = props;

    const { bookmarkNovel } = useApiService()
    const dispatch = useDispatch()
    const bookmarkData = useSelector((state) => state?.user?.bookmark)
    const [saveBookmark, setSaveBookmark] = useState('bookmark')
    const [openModal, setOpenModal] = useState(false);

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
        }
    }

    return (
        <div>
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

            <div>
                {rankingByViewData?.data?.length == 0 ?
                    <div className='text-center pt-5 dark:text-gray-100'>No data found</div> :
                    <>
                        <div className=''>
                            {rankingByViewData?.data?.map((item, index) => {
                                return (
                                    <div key={index} className='dark:bg-[#131415] flex flex-col md:flex-row items-center justify-between mb-3 shadow-[0_0_8px_1px_rgba(0,0,0,0.3)]'>
                                        <div className='flex w-full'>
                                            <Link href={{ pathname: `/detail/${rankingTab?.slice(0, 4)}/${item?._id}` }} prefetch className='dark:border-white min-h-[11rem] max-w-[7.5rem] min-w-[7.5rem] md:min-h-[9rem] md:min-w-[10rem] lg:min-h-[16rem]
                                                lg:min-w-[11rem] lg:max-h-[9rem] lg:max-w-[10rem] overflow-hidden relative border-2 border-black'>
                                                <Image src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} height={300} width={300} alt='cover' className='ImageZoom h-full w-full object-cover' />
                                                {/* <div className={`text-white absolute top-0 left-0 px-2 ${index == 0 ? 'bg-green-500' : index == 1 ? 'bg-red-500' : index == 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>{index + 1}</div> */}
                                            </Link>
                                            <div className='pl-3  pb-1 text-gray-800 flex justify-between flex-col w-full'>
                                                <div>
                                                    <div className='flex flex-row w-max gap-2'>
                                                        {item?.subGenre.length > 0 &&
                                                            item?.subGenre?.slice(0, 7)?.map((genreData, index) => {
                                                                return (
                                                                    <div key={index} className='flex-row flex-wrap gap-2 pt-1 hidden lg:flex'>
                                                                        <div className='text-sm px-2 py-1 mt-[2px] bg-blue-400 text-white rounded-md'>{genreData}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        {item?.subGenre.length > 0 &&
                                                            item?.subGenre?.slice(0, 2)?.map((genreData, index) => {
                                                                return (
                                                                    <div key={index} className='flex-row flex-wrap gap-2 pt-1 flex lg:hidden'>
                                                                        <div className='text-sm px-2 mt-[2px] bg-blue-400 text-white rounded-md'>{genreData}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                    </div>
                                                    {/* <div className='text-yellow-400 pt-1'>#{((rankingByViewData?.currentPage - 1) * 10) + (index + 1)}</div> */}
                                                    <div className={`${((rankingByViewData?.currentPage - 1) * 10) + (index + 1) == 1 ? 'text-green-400' : ((rankingByViewData?.currentPage - 1) * 10) + (index + 1) == 2 ? 'text-red-400' : ((rankingByViewData?.currentPage - 1) * 10) + (index + 1) == 3 ? 'text-yellow-500' : 'text-blue-400'}`}>#{((rankingByViewData?.currentPage - 1) * 10) + (index + 1)}</div>
                                                    <Link href={{ pathname: `/detail/${rankingTab?.slice(0, 4)}/${item?._id}` }} prefetch className='text-sm md:text-lg font-semibold dark:text-gray-200'>{item?.title}</Link>
                                                    <div className='text-xs pt-1 md:py-1 text-gray-600 dark:text-gray-100'>{item?.genre}</div>
                                                    <div className='hidden md:flex'>
                                                        <Rating
                                                            icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                                            emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                                            value={item?.totalRating}
                                                            readOnly
                                                            className=''
                                                        />
                                                        {item?.totalRating > 0 && (
                                                            <div className='text-xs pl-1 pt-1 dark:text-white'>{`(${item?.totalRating})`}</div>
                                                        )}
                                                    </div>
                                                    <div className='text-sm dark:text-gray-400 hidden md:block' dangerouslySetInnerHTML={{ __html: item?.synopsis?.length > 80 ? `${item?.synopsis?.slice(0, 80)}...` : item?.synopsis }}></div>
                                                    <div className='text-sm pr-14 dark:text-gray-400 block md:hidden' dangerouslySetInnerHTML={{ __html: item?.synopsis?.length > 30 ? `${item?.synopsis?.slice(0, 30)}...` : item?.synopsis }}></div>
                                                </div>
                                                <div className='pb-0 md:pb-2 flex justify-between md:justify-start  flex-col'>
                                                    {/* {item?.authorId?.name && <div className=' text-sm md:pt-2 dark:text-gray-300 capitalize'>Author - {item?.authorId?.name}</div>} */}
                                                    <div>
                                                        <div className="flex gap-2 items-center  text-sm md:pt-2 dark:text-gray-300 capitalize">
                                                            <div>Author :</div>
                                                            {item?.authorId?.role?.name === "admin" ? (
                                                                <div className="pl-1">
                                                                    {item?.OriginalNovelAuthor
                                                                        ? item?.OriginalNovelAuthor
                                                                        : item?.authorId?.name}
                                                                </div>
                                                            ) : (
                                                                <div className="pl-1">
                                                                    {item?.authorId?.pseudonym !== null &&
                                                                        item?.authorId?.pseudonym !== "null"
                                                                        ? item?.authorId?.pseudonym
                                                                        : item?.authorId?.name
                                                                            ? item?.authorId?.name
                                                                            : " - - -"}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='dark:text-gray-300 text-sm'>
                                                            {item?.TranslateNovelAuthor && (
                                                                <div className="flex gap-2 items-center">
                                                                    <div>Translator :</div>
                                                                    <div className="pl-1">
                                                                        {item?.TranslateNovelAuthor
                                                                            ? item?.TranslateNovelAuthor
                                                                            : " - - -"}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='md:pr-2 text-gray-900 md:pb-1 block md:hidden'>
                                                        <div className='flex items-center justify-end pr-4 md:pr-0'>
                                                            {bookmarkData.filter((data) => data?.novelId == item?._id).length > 0 ?
                                                                <BookmarkAddedIcon onClick={() => {
                                                                    setSaveBookmark('bookmark')
                                                                    novelBookmark(item?._id)
                                                                }} titleAccess='Remove bookmark' className='text-blue-500 cursor-pointer text-2xl' /> :
                                                                <BookmarkAddOutlinedIcon onClick={() => novelBookmark(item?._id)}
                                                                    titleAccess='save bookmark' className='text-gray-700 dark:text-gray-200 cursor-pointer text-2xl'
                                                                />}

                                                            <Link href={{ pathname: `/chapter/${item?.chapter[0]}` }}
                                                                prefetch
                                                                onClick={() => item?.chapter?.length == 0 && alert('chapter ongoing')}
                                                                className='cursor-pointer ml-1 border px-4 bg-blue-500 hover:bg-blue-900 text-white rounded-full py-[2px] md:py-1'>Read</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='md:pr-2 text-gray-900 pb-1 hidden md:block'>
                                            <div className='flex items-center justify-end pr-4 md:pr-0'>
                                                {/* <BookmarksIcon className='text-gray-600 cursor-pointer' onClick={() => novelBookmark(item?._id)} /> */}
                                                {bookmarkData.filter((data) => data?.novelId == item?._id).length > 0 ?
                                                    <BookmarkAddedIcon onClick={() => {
                                                        setSaveBookmark('bookmark')
                                                        novelBookmark(item?._id)
                                                    }} titleAccess='Remove bookmark' className='text-blue-500 cursor-pointer text-2xl' /> :
                                                    <BookmarkAddOutlinedIcon onClick={() => novelBookmark(item?._id)}
                                                        titleAccess='save bookmark' className='text-gray-700 dark:text-gray-200 cursor-pointer text-2xl' />
                                                }

                                                <Link href={{ pathname: `/chapter/${item?.chapter[0]}` }}
                                                    prefetch
                                                    onClick={() => item?.chapter?.length == 0 && alert('chapter ongoing')}
                                                    className='cursor-pointer ml-1 border px-4 bg-blue-500 hover:bg-blue-900 text-white rounded-full py-[2px] md:py-1'>Read</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>

            <ToastContainer
                position="bottom-right"
                newestOnTop={false}
                stacked
            />
        </div>
    )
}

export default MainSectionRanking