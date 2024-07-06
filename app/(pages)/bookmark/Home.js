"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import popularComicTwo from "../../../public/assets/Images/PopularComics/comicsTwo.jpg";
import CloseIcon from "@mui/icons-material/Close";
import HttpsIcon from "@mui/icons-material/Https";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useApiService from "@/services/ApiService";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationControlled from "@/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { BOOKMARK } from "@/app/Redux/slice/userSlice";
import loader from "../../../public/assets/loader/loader.gif";

function Home() {
  const { getBookmarkNovel, bookmarkNovel, bookmarkNotification } =
    useApiService();
  const [bookmarkNovelData, setBookmarkNovelData] = useState([]);
  const [page, setPage] = useState(1);
  const [shortList, setShortList] = useState();
  const dispatch = useDispatch();
  const reduxBookmarkData = useSelector((state) => state?.user?.bookmark);

  const getBookmark = (data) => {
    let url;
    if (data == undefined) {
      url = `page=${page}&limit=10`;
    } else {
      url = `sortBy=${data}&page=${page}&limit=10`;
    }
    getBookmarkNovel(url)
      .then((res) => {
        setBookmarkNovelData(res?.data?.data);
        setShortList(res?.data?.data);
        console.log(res?.data?.data == "undefined" ? "abc" : "xyz");
      })
      .catch((er) => {
        console.log(er, "Error Get Bookmark Novel");
      });
  };

  useEffect(() => {
    getBookmark();
  }, [page]);

  const novelBookmark = (id) => {
    if (localStorage.getItem("token")) {
      bookmarkNovel(id)
        .then((res) => {
          toast.success(res?.data?.data);
          setShortList(res?.data?.data);
          getBookmark();
          let dataFilter = reduxBookmarkData?.filter(
            (reduxId) => reduxId?.novelId !== id
          );
          dispatch(BOOKMARK(dataFilter));
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      router.push("/login");
    }
  };

  const novelNotification = (id, onOf) => {
    const form = new FormData();
    form.append("id", id);
    form.append("action", onOf);
    bookmarkNotification(form)
      .then((res) => {
        toast.success(res?.data?.data);
        getBookmark();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div className="pt-10 pb-10 lg:px-10 px-4 bg-[#F2F2F2] dark:bg-[#131415] border rounded-xl dark:shadow-md shadow-[0px_0px_7px_3px_#cdc7c761] mx-2 md:mx-10 mb-3 mt-20 md:mb-10 md:mt-28">
      <ToastContainer position="bottom-right" newestOnTop={false} stacked />

      {bookmarkNovelData?.data == undefined ? (
        <div className="flex justify-center items-center w-full pt-16 pb-16 bg-white h-full">
          <Image
            src={loader}
            alt=""
            height={1000}
            width={1000}
            className="h-20 w-20"
          />
        </div>
      ) : bookmarkNovelData?.data?.length == 0 ? (
        <div className="h-80 flex justify-center items-center text-xl">
          You have not Bookmarked any novel yet !
        </div>
      ) : (
        <div>
          <div className="border-b border-b-gray-400 mb-4">
            <div className="text-lg border-b-blue-600 border-b-2 w-max">
              Novels Library
            </div>
          </div>
          <div className="flex justify-end pb-2">
            <select
              onChange={(e) => getBookmark(e.target.value)}
              className="p-2 border border-black dark:bg-gray-800 bg-gray-200 focus:outline-none rounded-md"
            >
              <option value="LATEST">Latest Release</option>
              <option value="NAME">Novel Name</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-8 gap-2">
            {bookmarkNovelData?.data?.map((item, i) => {
              return (
                <div
                  key={i}
                  className="relative flex border-[#20A7FE] border-2 shadow-lg cursor-pointer dark:border-gray-700 bg-gray-100 dark:bg-[#202020] rounded-md"
                >
                  {/* <div className='h-44 w-[10.8rem] md:h-52 md:w-[12rem] lg:h-44 lg:w-[16.1rem]'> */}
                  <Link
                    href={{ pathname: `/detail/${item?._id}` }}
                    className="h-[9.5rem] w-[10.8rem] md:h-40 md:w-[12rem] lg:h-48 lg:w-[16.1rem]"
                  >
                    <Image
                      src={
                        item?.coverImg == null || item?.coverImg == "null"
                          ? ""
                          : item?.coverImg
                      }
                      height={300}
                      width={300}
                      alt={item?.title}
                      className="h-full w-full object-cover rounded-lg p-1"
                    />
                  </Link>
                  <div
                    onClick={() => novelBookmark(item?._id)}
                    className="pr-2 pt-1 text-gray-700"
                  >
                    <CloseIcon className="absolute top-1 right-2 text-black dark:text-white" />
                  </div>
                  <div className="flex justify-between w-full pb-2">
                    <div className="flex flex-col justify-between lg:pl-2 pt-1">
                      <div>
                        <div className="font-semibold hidden lg:block">
                          {item?.title?.slice(0, 25)}..
                        </div>
                        <div className="font-semibold block lg:hidden">
                          {item?.title?.slice(0, 20)}..
                        </div>
                        <div className="text-sm pb-2 pt-1 hidden lg:block">
                          {item?.genre}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 hidden lg:block">
                          {item?.description?.slice(0, 82)}..
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 block lg:hidden">
                          {item?.description?.slice(0, 27)}..
                        </div>
                      </div>
                      <div className="flex text-xs mb-1 flex-col justify-between pr-2 pt-1 gap-y-2">
                        <div className="text-sm text-blue-500 py-1 px-5 border-2 w-max">
                          Progress - {item?.totalCompletedChapters}/
                          {item?.chapter.length}
                        </div>
                        <div className="border px-2 py-1 rounded flex items-center shadow-lg w-max">
                          {item?.notification == true ? (
                            <>
                              <NotificationsIcon className="text-sm" />
                              <button
                                onClick={() => {
                                  novelNotification(item?._id, false);
                                }}
                                className="pl-1"
                              >
                                Turn off
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                novelNotification(item?._id, true);
                              }}
                              className="pl-1"
                            >
                              Get Notified
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {bookmarkNovelData?.data?.length > 0 && (
        <div className="flex justify-center pt-20">
          <PaginationControlled
            setPage={setPage}
            last_page={bookmarkNovelData?.totalPage}
            page={page}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
