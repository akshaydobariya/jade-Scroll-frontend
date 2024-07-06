import React, { useState, useEffect } from 'react'
import benifitsImage from "../../../../public/assets/Images/keywords.png";
import benifitskey from "../../../../public/assets/Images/key.png";
import benifitAppointment from "../../../../public/assets/Images/appointment.png";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Slider from "react-slick";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import LikeButton from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Avatar, Rating } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Image from 'next/image';
import Link from 'next/link'
import moment from 'moment';
import PaginationControlled from '@/components/pagination';
import useApiService from '@/services/ApiService';

function AboutTab(props) {
    const { setModelLogin, modelLogin, relatedNovel, detailData, page, setPage } = props;
    const [pageChapter, setPageChapter] = useState(1);
    const [replyComment, setReplyComment] = useState();
    const [replyCommentUi, setReplyCommentUi] = useState();
    const [replyCommentUiMode, setReplyCommentUiMode] = useState(false);
    const [reviewData, setReviewData] = useState();
    const [likeReview, setLikeReview] = useState();
    const [ratingvalue, setRatingValue] = React.useState(0);
    const [ratingError, setRatingError] = useState("");
    const [reviewInputError, setReviewInputError] = useState("");
    const [chapterData, setChapterData] = useState();
    const [saveBookmark, setSaveBookmark] = useState();
    const [commentInput, setCommentInput] = useState();
    const [novelLikeButton, setNovelLikeButton] = useState(false);
    const [reviewError, setReviewError] = useState("");
    const { replyOnReview, likeReviewComment, disLikeReviewComment, getNovelReviewsApi, detailNovelRate, detailRemoveNovelRate } = useApiService()
    const [localStorageToken, setLocalStorageToken] = useState();
    const [replyCommentMode, setReplyCommentMode] = useState(false);
    const [replyCommentInput, setReplyCommentInput] = useState();

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        swipeToSlide: true,
        swipe: true,
        speed: 100,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: false,
                    arrows: false,
                },
            },
        ],
    };

    useEffect(() => {
        getNovelReviews();
    }, [likeReview, detailData, page]);

    const likeCommentApi = (id) => {
        if (localStorage.getItem("token")) {
            likeReviewComment(id)
                .then((res) => {
                    getNovelReviews();
                })
                .catch((er) => {
                    console.log(er, "Error Like Comment");
                });
        } else {
            handleOpenLoginModal();
        }
    };

    const dislikeCommentApi = (id) => {
        if (localStorage.getItem("token")) {
            disLikeReviewComment(id)
                .then((res) => {
                    getNovelReviews();
                })
                .catch((er) => {
                    console.log(er, "Error dislike comment");
                });
        } else {
            handleOpenLoginModal();
        }
    };

    const getNovelReviews = () => {
        if (detailData?._id !== undefined) {
            let url = `page=${page}&limit=3&id=${detailData?._id}`;
            getNovelReviewsApi(url)
                .then((res) => {
                    setReviewData(res?.data?.data);
                })
                .catch((er) => {
                    console.log(er);
                });
        }
    };

    const handleSubmitNovelRate = () => {
        if (ratingvalue == 0) {
            setRatingError("Rating is required");
        }
        if (commentInput == undefined) {
            setReviewInputError("Comment field is required");
        }
        if (commentInput !== undefined && ratingvalue !== 0) {
            const form = new FormData();
            form.append("novelId", detailData?._id);
            form.append("newRate[rate]", ratingvalue);
            form.append("newRate[comment]", commentInput);
            detailNovelRate(form)
                .then((res) => {
                    setCommentInput("");
                    setRatingValue(0);
                    getNovelReviews();
                    setReviewError("");
                    setRatingError("");
                    setReviewInputError("");
                })
                .catch((er) => {
                    setReviewError(er?.response?.data?.error);
                    setCommentInput("");
                    setRatingValue(0);
                });
        }
    };

    const deleteNovelRate = (id) => {
        detailRemoveNovelRate(id)
            .then((res) => {
                getNovelReviews();
            })
            .catch((er) => {
                console.log(er);
            });
    };

    const handleReplyChange = (e) => {
        setReplyCommentInput(e.target.value);
    };

    const commentReplyApi = (id) => {
        const form = new FormData();
        form.append("comment", replyCommentInput);
        setReplyCommentInput("");
        replyOnReview(id, form)
            .then((res) => {
                getNovelReviews();
                setReplyCommentMode(false);
            })
            .catch((er) => {
                console.log(er, "Error reply comment");
            });
    };

    useEffect(() => {
        if (localStorage !== undefined && localStorage.getItem("token")) {
            setLocalStorageToken(localStorage.getItem("token"));
        }
    }, []);

    return (
        <div>
            <div>
                <div className="flex pt-4 pb-8">
                    <div>
                        <div className="flex items-center">
                            <ImportContactsIcon fontSize="small" />
                            <div className="text-gray-500 dark:text-gray-200 pl-1 font-semibold">
                                Chapters
                            </div>
                        </div>
                        <div className="pt-[2px] pl-6">
                            {detailData?.chapter?.length > 0
                                ? detailData?.chapter?.length
                                : "0"}{" "}
                            Chapters
                        </div>
                    </div>
                    <div className="lg:pl-32 pl-10">
                        <div className="flex">
                            <VerifiedUserOutlinedIcon />
                            <div className="text-gray-500 dark:text-gray-200 pl-1 font-semibold">
                                Licensed From
                            </div>
                        </div>
                        <div className="pl-7 pt-[2px]">
                            {detailData?.licenceFrom == null ||
                                detailData?.licenceFrom == "null"
                                ? "----"
                                : detailData?.licenceFrom}
                        </div>
                    </div>
                </div>

                <div>
                    {/* <div className="pb-2 text-lg">Genre</div> */}
                    <div className="flex flex-wrap gap-3 text-sm">
                        {detailData?.subGenre?.map((item, index) => {
                            return (
                                <div key={index} className="border px-2 rounded-md py-[2px]">#{item}</div>
                            )
                        })}
                    </div>
                </div>

                <div className="pt-4 mt-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] pb-4 bg-[#FFFFFF] dark:bg-[#202020]">
                    <div className="text-2xl text-center lg:rankingParentHeading dark:text-gray-200">
                        Details
                    </div>
                    <div className="leading-7 px-4 md:px-8">
                        <div
                            className="text-gray-500 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: detailData?.synopsis }}
                        ></div>
                    </div>
                </div>

                <div className="pt-6 pl-2 pb-4 border-t-2 mt-8">
                    <div className="text-2xl pb-1">
                        {reviewData?.totalDocs} Reviews
                    </div>
                    <div className="p-4 rounded-md bg-[#FFFFFF] dark:bg-[#202020] shadow-[2px_3px_5px_3px_#F2F2F2] dark:shadow-md">
                        <>
                            <div className="flex justify-center flex-col items-center">
                                <div className="text-lg font-semibold pb-2 text-center">
                                    Enjoy reading {detailData?.title}?
                                </div>
                                <div className="text-xs md:text-sm pb-1 dark:text-gray-200 text-gray-600 pt-1">
                                    Write a review
                                </div>
                            </div>
                            <div className="flex justify-center pb-2">
                                <Rating
                                    icon={
                                        <StarIcon
                                            fontSize="small"
                                            style={{ color: "#FFAD01" }}
                                        />
                                    }
                                    emptyIcon={
                                        <StarBorderIcon
                                            fontSize="small"
                                            style={{ color: "#cccccc" }}
                                        />
                                    }
                                    defaultValue={0}
                                    value={ratingvalue}
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                />
                            </div>
                            {ratingError && (
                                <div className="text-center pb-2 text-red-500">
                                    {ratingError}
                                </div>
                            )}
                            <div className="">
                                <textarea
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    value={commentInput}
                                    placeholder="Write a review*"
                                    className="dark:bg-[#202020] bg-gray-100 dark:text-gray-200 mr-2 border dark:border-gray-600 w-full focus:outline-none rounded-md px-2 py-2"
                                />
                                {reviewError && (
                                    <div className="pl-1 text-red-500 text-sm font-semibold">
                                        {reviewError}
                                    </div>
                                )}
                                {reviewInputError && (
                                    <div className="pl-1 text-red-500 text-sm font-semibold">
                                        {reviewInputError}
                                    </div>
                                )}
                                <div className="flex justify-end">
                                    <div
                                        onClick={() => {
                                            localStorageToken
                                                ? handleSubmitNovelRate()
                                                : setModelLogin(true);
                                        }}
                                        className="px-6 border dark:border-gray-500 rounded-full py-1 text-lg bg-blue-600 text-white cursor-pointer"
                                    >
                                        Send
                                    </div>
                                </div>
                            </div>
                        </>
                        {reviewData?.data?.length > 0 && (
                            <div className="">
                                {reviewData?.data?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="my-3 flex w-full rounded-md p-3 bg-gray-300 text-gray-800 dark:bg-[#202020] dark:text-gray-200"
                                            style={{ boxShadow: "0px 0px 3px 0px #e5d5d5" }}
                                        >
                                            <div className="flex flex-col w-full">
                                                <div className="flex">
                                                    <div>
                                                        {item?.userId?.profileImg == null ? (
                                                            <Avatar className="h-14 w-14" />
                                                        ) : (
                                                            <Image
                                                                alt={item?.userId?.name}
                                                                src={item?.userId?.profileImg == null || item?.userId?.profileImg == "null" ? "" : item?.userId?.profileImg}
                                                                height={300}
                                                                width={300}
                                                                className="md:h-16 md:w-16 w-16 h-16 object-cover rounded-full"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="md:pl-4 pl-2 w-full">
                                                        <span className="flex justify-between">
                                                            <div>
                                                                <div className="text-lg font-semibold capitalize">
                                                                    {item?.userId?.name
                                                                        ? item?.userId?.name
                                                                        : "- - -"}
                                                                </div>
                                                                <div className="text-sm">
                                                                    {moment(item?.timeStamp).format(
                                                                        "DD MMM, YYYY"
                                                                    )}
                                                                </div>
                                                                <div className="flex pt-[6px] pb-1">
                                                                    <Rating
                                                                        icon={
                                                                            <StarIcon
                                                                                fontSize="small"
                                                                                style={{ color: "#FFAD01" }}
                                                                            />
                                                                        }
                                                                        emptyIcon={
                                                                            <StarBorderIcon
                                                                                fontSize="small"
                                                                                style={{ color: "#6d6e70" }}
                                                                            />
                                                                        }
                                                                        value={item?.rate}
                                                                        readOnly
                                                                        className="flex"
                                                                    />
                                                                    {item?.rate > 0 && (
                                                                        <div className="text-xs pl-1 pt-1">{`(${item?.rate})`}</div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {item?.userId?._id ==
                                                                localStorage.getItem("user_id") && (
                                                                    <div
                                                                        className="md:hidden flex items-end text-red-500 cursor-pointer"
                                                                        onClick={() =>
                                                                            deleteNovelRate(item?._id)
                                                                        }
                                                                    >
                                                                        <DeleteIcon />
                                                                    </div>
                                                                )}
                                                        </span>

                                                        <div className="text-base break-all">
                                                            {item?.comment}
                                                        </div>
                                                        <div className="flex flex-col md:gap-4 gap-1 md:pt-3 pt-1 text-sm">
                                                            <div className="flex items-center gap-x-1">
                                                                {item?.like?.filter(
                                                                    (data) =>
                                                                        data ==
                                                                        localStorage.getItem("user_id")
                                                                ).length > 0 ? (
                                                                    <div
                                                                        onClick={() =>
                                                                            likeCommentApi(item?._id)
                                                                        }
                                                                        className="flex "
                                                                    >
                                                                        <ThumbUpAltIcon
                                                                            className="cursor-pointer"
                                                                            fontSize="small"
                                                                        />
                                                                        {item?.like?.length > 0 &&
                                                                            item?.like?.length}
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        onClick={() =>
                                                                            likeCommentApi(item?._id)
                                                                        }
                                                                        className="flex"
                                                                    >
                                                                        <LikeButton
                                                                            className="cursor-pointer"
                                                                            fontSize="small"
                                                                        />
                                                                        {item?.like?.length > 0 &&
                                                                            item?.like?.length}
                                                                    </div>
                                                                )}

                                                                {item?.dislike?.filter(
                                                                    (data) =>
                                                                        data ==
                                                                        localStorage.getItem("user_id")
                                                                ).length > 0 ? (
                                                                    <div
                                                                        onClick={() =>
                                                                            dislikeCommentApi(item?._id)
                                                                        }
                                                                    >
                                                                        <ThumbDownAltIcon
                                                                            className="cursor-pointer"
                                                                            fontSize="small"
                                                                        />
                                                                        {item?.dislike?.length > 0 &&
                                                                            item?.dislike?.length}
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        onClick={() =>
                                                                            dislikeCommentApi(item?._id)
                                                                        }
                                                                    >
                                                                        <ThumbDownOffAltIcon
                                                                            className="cursor-pointer"
                                                                            fontSize="small"
                                                                        />
                                                                        {item?.dislike?.length > 0 &&
                                                                            item?.dislike?.length}
                                                                    </div>
                                                                )}
                                                                <button
                                                                    className="pr-3 md:pl-2 text-sm font-semibold"
                                                                    onClick={() => {
                                                                        setReplyComment(item?._id);
                                                                        setReplyCommentMode(
                                                                            !replyCommentMode
                                                                        );
                                                                    }}
                                                                >
                                                                    Reply
                                                                </button>
                                                            </div>
                                                            {item?.reply.length > 0 && (
                                                                <div
                                                                    className="pt-1 text-sm text-[#20A7FE] cursor-pointer"
                                                                    onClick={() => {
                                                                        setReplyCommentUi(item?._id);
                                                                        setReplyCommentUiMode(
                                                                            !replyCommentUiMode
                                                                        );
                                                                    }}
                                                                >
                                                                    <span>
                                                                        view {item?.reply.length} more reply
                                                                    </span>
                                                                    {replyCommentUi == item?._id &&
                                                                        replyCommentUiMode ? (
                                                                        <span>
                                                                            <KeyboardArrowUpIcon fontSize="small" />
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            <KeyboardArrowDownIcon fontSize="small" />
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    {replyComment == item?._id &&
                                                        replyCommentMode && (
                                                            <div className="flex items-center pl-6">
                                                                <textarea
                                                                    onChange={handleReplyChange}
                                                                    maxLength="1000"
                                                                    value={replyCommentInput}
                                                                    placeholder="Reply"
                                                                    className="dark:bg-[#202020] bg-gray-100 mr-2 border w-full focus:outline-none rounded-md px-2 py-2"
                                                                />
                                                                <div>
                                                                    <div
                                                                        onClick={() =>
                                                                            commentReplyApi(item?._id)
                                                                        }
                                                                        className="border rounded-full md:px-4 px-2 py-2 md:text-sm text-xs bg-blue-600 text-white cursor-pointer"
                                                                    >
                                                                        Send
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    <div>
                                                        <span>
                                                            {replyCommentUiMode &&
                                                                item?.reply?.map((item, index) => {
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className="ml-10 my-3 flex rounded-md p-3 dark:bg-[#202020] dark:text-gray-200 text-gray-800"
                                                                        >
                                                                            <div>
                                                                                {item?.userId?.profileImg ===
                                                                                    null ? (
                                                                                    <Avatar className="md:h-[5rem] md:w-16 w-16 h-16" />
                                                                                ) : (
                                                                                    <Image
                                                                                        alt="profile"
                                                                                        height={100}
                                                                                        width={100}
                                                                                        src={item?.userId?.profileImg == null || item?.userId?.profileImg == "null" ? "" : item?.userId?.profileImg}
                                                                                        className="md:h-[4.3rem] md:w-[4.3rem] w-24 h-16 object-cover rounded-full"
                                                                                    />
                                                                                )}
                                                                            </div>

                                                                            <div className="md:pl-4 pl-2 w-full">
                                                                                <div className="flex justify-between items-center">
                                                                                    <div className="flex pl-1 md:pl-0 pb-1 md:pb-0 md:items-center flex-col md:flex-row">
                                                                                        <div className="text-lg font-semibold capitalize">
                                                                                            {item?.userId?.name}
                                                                                        </div>
                                                                                        <div className="md:pl-3 md:text-sm text-xs">
                                                                                            {moment(
                                                                                                item?.createdAt
                                                                                            ).format("DD MMM YYYY")}
                                                                                        </div>
                                                                                    </div>
                                                                                    {item?.userId?._id ==
                                                                                        localStorage.getItem(
                                                                                            "user_id"
                                                                                        ) && (
                                                                                            <div
                                                                                                className="flex items-end text-red-500 cursor-pointer"
                                                                                                onClick={() =>
                                                                                                    deleteNovelRate(item?._id)
                                                                                                }
                                                                                            >
                                                                                                <DeleteIcon />
                                                                                            </div>
                                                                                        )}
                                                                                </div>
                                                                                <div className="bg-gray-100 dark:bg-[#131415] rounded-md text-sm py-2 px-3 break-all">
                                                                                    {item?.comment}
                                                                                </div>
                                                                                <div className="flex items-center gap-x-1 pt-1">
                                                                                    {item?.like?.filter(
                                                                                        (data) =>
                                                                                            data ==
                                                                                            localStorage.getItem(
                                                                                                "user_id"
                                                                                            )
                                                                                    ).length > 0 ? (
                                                                                        <div
                                                                                            onClick={() =>
                                                                                                likeCommentApi(item?._id)
                                                                                            }
                                                                                            className="flex items-center"
                                                                                        >
                                                                                            <ThumbUpAltIcon
                                                                                                className="cursor-pointer"
                                                                                                fontSize="small"
                                                                                            />
                                                                                            {item?.like?.length > 0 &&
                                                                                                item?.like?.length}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div
                                                                                            onClick={() =>
                                                                                                likeCommentApi(item?._id)
                                                                                            }
                                                                                            className="flex"
                                                                                        >
                                                                                            <LikeButton
                                                                                                className="cursor-pointer"
                                                                                                fontSize="small"
                                                                                            />
                                                                                            {item?.like?.length > 0 &&
                                                                                                item?.like?.length}
                                                                                        </div>
                                                                                    )}

                                                                                    {item?.dislike?.filter(
                                                                                        (data) =>
                                                                                            data ==
                                                                                            localStorage.getItem(
                                                                                                "user_id"
                                                                                            )
                                                                                    ).length > 0 ? (
                                                                                        <div
                                                                                            onClick={() =>
                                                                                                dislikeCommentApi(
                                                                                                    item?._id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <ThumbDownAltIcon
                                                                                                className="cursor-pointer"
                                                                                                fontSize="small"
                                                                                            />
                                                                                            {item?.dislike?.length >
                                                                                                0 &&
                                                                                                item?.dislike?.length}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div
                                                                                            onClick={() =>
                                                                                                dislikeCommentApi(
                                                                                                    item?._id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <ThumbDownOffAltIcon
                                                                                                className="cursor-pointer"
                                                                                                fontSize="small"
                                                                                            />
                                                                                            {item?.dislike?.length >
                                                                                                0 &&
                                                                                                item?.dislike?.length}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {item?.userId?._id ==
                                                localStorage.getItem("user_id") && (
                                                    <div
                                                        className="hidden md:flex items-end text-red-500 cursor-pointer"
                                                        onClick={() => deleteNovelRate(item?._id)}
                                                    >
                                                        Delete
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {reviewData?.data?.length > 0 && (
                        <div className="flex justify-center">
                            <PaginationControlled
                                setPage={setPage}
                                last_page={reviewData?.totalPage}
                                page={page}
                            />
                        </div>
                    )}
                </div>

                {relatedNovel.length > 0 && (
                    <div className="pt-4 pb-3 border-t border-gray-300">
                        <div className="text-2xl pb-3">Related Novels</div>
                        {/* <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4'> */}
                        <Slider {...settings} className="w-full">
                            {relatedNovel?.map((item, index) => {
                                return (
                                    <Link
                                        href={{ pathname: `/detail/view/${item?._id}` }}
                                        key={index}
                                        className=""
                                    >
                                        <div className="h-44 w-[8.5rem] md:h-40 md:w-40 lg:h-60 lg:w-44">
                                            <Image
                                                height={300}
                                                width={300}
                                                src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg}
                                                alt={item.title}
                                                className="h-full w-full rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="pl-1">
                                            <div className="text-sm md:text-base font-semibold hidden md:block">
                                                {item.title}
                                            </div>
                                            {/* <div className='text-sm md:text-base font-semibold block md:hidden'>{item.name.slice(0, 9)}..</div> */}
                                            <div className="text-xs py-1 md:py-2 dark:text-gray-200 text-gray-600">
                                                {item.genre}
                                            </div>
                                            {/* <Rating size='small' name="read-only" value={item?.totalRating} readOnly /> */}
                                            <div className="flex">
                                                <Rating
                                                    icon={
                                                        <StarIcon
                                                            fontSize="small"
                                                            style={{ color: "#FFAD01" }}
                                                        />
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
                                                {item?.totalRating > 0 && (
                                                    <div className="text-xs pl-1 pt-1">{`(${item?.totalRating})`}</div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </Slider>
                        {/* </div> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AboutTab