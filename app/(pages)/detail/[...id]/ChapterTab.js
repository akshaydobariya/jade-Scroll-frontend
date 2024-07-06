import React from 'react'
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import lock from "../../../../public/assets/Images/lock.webp";

function ChapterTab(props) {
    const { novelDetailData, detailData } = props;

    return (
        <div>
            {detailData?.chapter?.length == 0 ? (
                <div className="text-center pt-7 pb-3">
                    Chapter's will coming soon !
                </div>
            ) : (
                <>
                    <div className="flex flex-col  pt-2 pb-1">
                        <div className="flex justify-between">
                            <div className="text-gray-500 dark:text-white">
                                Latest Chapter -{" "}
                            </div>
                            <div>
                                <select
                                    onChange={(e) => novelDetailData(e.target.value)}
                                    className="px-2 py-1 border border-black dark:bg-[#202020] bg-gray-200 focus:outline-none rounded-md"
                                >
                                    <option value="DESC">Newest</option>
                                    <option value="ASC">Oldest</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="text-gray-800  dark:text-white font-semibold hidden md:block">
                                {detailData?.latestChapter?.title &&
                                    detailData?.latestChapter?.title}
                            </div>
                            <div className="text-gray-800  dark:text-white font-semibold block md:hidden">
                                {detailData?.latestChapter?.title &&
                                    detailData?.latestChapter?.title?.length > 20
                                    ? `${detailData?.latestChapter?.title?.slice(0, 20)}..`
                                    : detailData?.latestChapter?.title}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 pt-4">
                        {detailData?.chapter?.map((item, index) => {
                            let chapterStatus = detailData?.readingStatus?.filter(
                                (data) => data?.chapterId == item?._id
                            );
                            return (
                                <Link
                                    href={`/chapter/${item?._id}`}
                                    key={index}
                                    className={`bg-gray-200 shadow-lg cursor-pointer text-gray-600 p-2 rounded-lg flex items-center ${detailData?.chapter?.length > 0 &&
                                        chapterStatus[0]?.status == "Completed"
                                        ? "bg-green-200 dark:bg-green-300"
                                        : "bg-gray-200 dark:bg-[#202020] dark:text-white"
                                        }`}
                                >
                                    <div
                                        className={`bg-gray-400 dark:bg-[#131415] px-3 py-1 rounded-md mr-3 h-max' ${detailData?.chapter?.length > 0 &&
                                            chapterStatus[0]?.status == "Completed"
                                            ? "bg-green-300 dark:bg-green-400"
                                            : "bg-gray-200 dark:bg-[#131415] dark:text-white"
                                            }`}
                                    >
                                        {item?.chapterNo}
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="capitalize">
                                                {item?.title.length > 25
                                                    ? `${item?.title.slice(0, 25)}...`
                                                    : item?.title}
                                            </div>
                                            <div className="text-xs pt-1">
                                                {moment(item?.releaseDate).format("DD MMM, YYYY")}
                                            </div>
                                        </div>
                                        {!item?.isPurchased && (
                                            <div className="flex items-center">
                                                <Image src={lock} alt="lock" className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    )
}

export default ChapterTab