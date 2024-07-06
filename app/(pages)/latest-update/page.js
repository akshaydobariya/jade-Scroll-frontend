'use client'
import Image from 'next/image'
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from 'next/link';
import useApiService from '@/services/ApiService';
import {useEffect} from 'react'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function LatestUpdate(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [chapterData, setChapterData] = useState([])
    const {getLatesUpdateNovels} = useApiService();
    const [latestNovelData, setLatestNovelData] = useState([]);

    useEffect(()=>{
        getLatesUpdateNovels().then((res)=>{
            setLatestNovelData(res?.data?.data);
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

  return (
    <div className="pt-10 pb-6 lg:pb-0 px-4 md:px-8">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="md:w-[550px] w-[320px] dark:bg-[#202020]">
          <div className="gap-4">
            <div className="text-center text-xl pb-2 font-semibold">
              Latest Chapter
            </div>
            {chapterData?.slice(0, 5)?.map((item, index) => {
              let now = moment(new Date());
              let end = moment(item?.releaseDate);
              let duration = moment.duration(now.diff(end));
              let days = duration.asDays();
              let hoursDuration = duration.asHours();
              let minuteDuration = duration.asMinutes();
              let Year = duration.asYears();
              let finalDate = days / 30;
              return (
                <Link
                  href={{ pathname: `/chapter/${item?._id}` }}
                  prefetch
                  key={index}
                  className="cursor-pointer dark:hover:bg-gray-950 hover:bg-gray-100 pt-2 pb-1 flex justify-between border-b"
                  onClick={() => localStorage.setItem("isChapter", true)}
                >
                  <div className="flex">
                    <div className="text-sm flex justify-between">
                      <div className="pl-3">{item?.title.slice(0, 20)}</div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <div>
                      {minuteDuration.toFixed() < 60
                        ? `${minuteDuration.toFixed() + "minute ago"}`
                        : hoursDuration.toFixed() < 24
                        ? `${hoursDuration.toFixed() + "hour ago"}`
                        : Year.toFixed() == 1
                        ? `${"About" + " " + Year.toFixed() + " " + "Year ago"}`
                        : Year.toFixed() > 1
                        ? `${
                            "About" + " " + Year.toFixed() + " " + "Years ago"
                          }`
                        : days < 30
                        ? `${days.toFixed() + " " + "days ago"}`
                        : finalDate.toFixed() == 1
                        ? `${
                            "About" +
                            " " +
                            finalDate.toFixed() +
                            " " +
                            "month ago"
                          }`
                        : `${
                            "About" +
                            " " +
                            finalDate.toFixed() +
                            " " +
                            "months ago"
                          }`}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Box>
      </Modal>

            <div className='flex justify-between items-center text-start pb-5'>
                <div className='text-2xl md:text-2xl font-bold'>Most Recently Updated</div>
            </div>
            <div className='grid md:grid-cols-3 xl:grid-cols-4 grid-cols-3 md:gap-1 gap-2'>
                {latestNovelData?.slice(0, 8)?.map((item, index) => {
                    return (
                        <div onClick={() => {
                            handleOpen()
                            setChapterData(item?.chapter)
                        }} key={index} className='cursor-pointer latestCard shadow-[0px_0px_3px_1px_#d9d1d1] dark:shadow-[4px_4px_9px_-2px_#161212] md:m-1 lg:m-3 flex flex-col md:flex-row items-center dark:bg-gray-950 bg-gray-200 rounded-md'>
                            <div className='h-36 w-full md:h-32 md:w-[12rem] lg:w-[12rem]'>
                                <Image width={200} height={200} src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg} alt='updateImg' className='rounded-l-md h-[150px] w-full object-cover' />
                            </div>
                            <div className='lg:pl-5 md:pl-2 md:pr-2 pr-0 pb-2 w-full'>
                                <div className='text-lg font-semibold hidden md:block'>{item?.title.length > 22 ? `${item?.title.slice(0, 22)}..` : item?.title}</div>
                                <div className='md:py-2 pl-1 py-[2px] dark:text-white text-sm'>{item?.genre}</div>
                                <div className='flex'>
                                    <Rating
                                        icon={<StarIcon fontSize='small' style={{ color: '#FFAD01' }} />}
                                        emptyIcon={<StarBorderIcon fontSize='small' style={{ color: '#cccccc' }} />}
                                        value={item?.totalRating}
                                        readOnly
                                        className='flex'
                                    />
                                    <span className='hidden lg:block'>
                                        {item?.totalRating > 0 && (
                                            <div className='text-xs pl-1 pt-1'>{`(${item?.totalRating})`}</div>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="go-corner">
                                <div className="go-arrow text-2xl">
                                    →
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
      <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-3 md:gap-1 gap-2">
        {props?.latestUpdateData?.data?.slice(0, 8)?.map((item, index) => {
          return (
            <div
              onClick={() => {
                handleOpen();
                setChapterData(item?.chapter);
              }}
              key={index}
              className="cursor-pointer latestCard shadow-[0px_0px_3px_1px_#d9d1d1] dark:shadow-[4px_4px_9px_-2px_#161212] md:m-1 lg:m-3 flex flex-col md:flex-row items-center dark:bg-gray-950 bg-gray-200 rounded-md"
            >
              <div className="h-36 w-full md:h-32 md:w-[12rem] lg:w-[12rem]">
                <Image
                  width={200}
                  height={200}
                  src={item?.coverImg}
                  alt="updateImg"
                  className="rounded-l-md h-[150px] w-full object-cover"
                />
              </div>
              <div className="lg:pl-5 md:pl-2 md:pr-2 pr-0 pb-2 w-full">
                <div className="text-lg font-semibold hidden md:block">
                  {item?.title.length > 22
                    ? `${item?.title.slice(0, 22)}..`
                    : item?.title}
                </div>
                <div className="md:py-2 pl-1 py-[2px] dark:text-white text-sm">
                  {item?.genre}
                </div>
                <div className="flex">
                  <Rating
                    icon={
                      <StarIcon fontSize="small" style={{ color: "#FFAD01" }} />
                    }
                    emptyIcon={
                      <StarBorderIcon
                        fontSize="small"
                        style={{ color: "#cccccc" }}
                      />
                    }
                    value={item?.totalRating}
                    readOnly
                    className="flex"
                  />
                  <span className="hidden lg:block">
                    {item?.totalRating > 0 && (
                      <div className="text-xs pl-1 pt-1">{`(${item?.totalRating})`}</div>
                    )}
                  </span>
                </div>
              </div>
              <div className="go-corner">
                <div className="go-arrow text-2xl">→</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestUpdate;
