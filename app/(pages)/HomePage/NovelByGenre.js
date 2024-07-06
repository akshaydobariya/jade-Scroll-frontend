"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";
import useApiService from "@/services/ApiService";
import Slider from "react-slick";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import defaultGenre from "@/public/assets/Images/defaultGenre.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #FFFF",
  boxShadow: 24,
};

function NovelByGenre(props) {
  const router = useRouter();
  const [selectId, setSelectId] = useState(0);
  const { getNovelByGenre, getNovelByid } = useApiService();
  const [novelById, setNovelById] = useState([]);
  const [genreData, setGenreData] = useState([]);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    swipe: true,
    speed: 100,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
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
          slidesToShow: 3,
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
    getNovelByGenre()
      .then((res) => {
        if (res.status == 200) {
          setGenreData(res?.data?.data?.data);
          novelDetail(res?.data?.data?.data[0]?.name);
        }
      })
      .catch((er) => {
        console.log(er, "error novel by genre");
      });
  }, []);

  const novelDetail = (id) => {
    getNovelByid(id)
      .then((res) => {
        if (res.status == 200) {
          setNovelById(res?.data?.data?.data);
        }
      })
      .catch((er) => {
        console.log(er, "er");
      });
  };

  return (
    <div className="md:pt-10 pt-10 md:px-8 px-4 w-[100%]">
      <div className="text-2xl md:text-2xl font-bold pb-4">Novels By Genre</div>

      <div className="p-2 block lg:hidden">
        <Slider {...settings} className="lg:w-[70%] w-full">
          {genreData?.map((item, index) => {
            return (
              <Link
                href={{ pathname: `/novel-list/${item?.name}-Genre` }}
                prefetch
                key={index}
                onClick={() => novelDetail(item?.name)}
                className={
                  selectId == index
                    ? "lg:border-2 lg:border-[#20A7FE] rounded-md bg-gray-200 lg:mt-2 relative h-28 md:h-32 lg:h-28 cursor-pointer widthNovelGenreCard"
                    : "relative h-28 md:h-32 lg:h-28 rounded cursor-pointer widthNovelGenreCard"
                }
                style={{ boxShadow: "1px 6px 11px 0px #c9c1c1" }}
              >
                {item?.img ? (
                  <Image
                    src={item?.img == null || item?.img == "null" ? "" : item?.img}
                    alt={item.name}
                    className="h-full w-full object-cover rounded"
                    width={200}
                    height={200}
                  />
                ) : (
                  <Image
                    src={defaultGenre}
                    alt={item.name}
                    className="h-[100px] w-full object-contain rounded"
                    width={100}
                    height={100}
                  />
                )}
                <div className="gradientClass absolute bottom-0 w-full text-white font-semibold flex justify-center rounded-[3px]">
                  {item.name}
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>

      <div className="p-2 hidden lg:block">
        <Slider {...settings} className="lg:w-[70%] w-full">
          {genreData?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  novelDetail(item?.name);
                  setSelectId(index);
                }}
                className={
                  selectId == index
                    ? "lg:border-2 lg:border-[#20A7FE] rounded-md bg-gray-200 lg:mt-2 relative h-28 md:h-32 lg:h-28 cursor-pointer widthNovelGenreCard"
                    : "relative h-28 md:h-32 lg:h-28 rounded cursor-pointer widthNovelGenreCard"
                }
                style={{ boxShadow: "1px 6px 11px 0px #c9c1c1" }}
              >
                {item?.img ? (
                  <Image
                    src={item?.img == null || item?.img == "null" ? "" : item?.img}
                    alt={item.name}
                    className="h-[195px] w-full object-cover rounded"
                    width={200}
                    height={200}
                  />
                ) : (
                  <Image
                    src={defaultGenre}
                    alt={item.name}
                    className="h-[100px] w-full object-contain rounded"
                    width={100}
                    height={100}
                  />
                )}
                <div className="gradientClass absolute -bottom-[14px] w-full text-white font-semibold flex justify-center rounded-[3px]">
                  {item.name}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="hidden xl:block mt-3 md:p-5 p-2 bg-[#212121] dark:bg-[#131415] text-white  rounded-xl w-[66%]">
        <div className="flex justify-between">
          <div className="font-semibold">{novelById[0]?.genre}</div>
          {novelById?.length > 7 && (
            <div className="cursor-pointer text-sm underline">See More</div>
          )}
        </div>
        {novelById?.length == 0 ? (
          <div className="text-center w-full text-gray-200 py-2">
            No data found
          </div>
        ) : (
          <div className="grid md:grid-cols-5 grid-cols-3 gap-1">
            {novelById?.slice(0, 5)?.map((item, index) => {
              return (
                <Link
                  href={{ pathname: `/detail/view/${item?._id}` }}
                  prefetch
                  key={index}
                  className="mt-4"
                >
                  <div className="h-24 w-24 md:h-28 md:w-32">
                    <Image
                      src={item?.coverImg == null || item?.coverImg == "null" ? "" : item?.coverImg}
                      alt="cover"
                      className="h-full w-full rounded-md object-cover"
                      height={100}
                      width={200}
                    />
                  </div>
                  <div className="pl-1 pt-1">
                    <div className="text-sm font-semibold">{item?.title}</div>
                    <div className="py-[1px] text-sm text-gray-200">
                      {item?.genre}
                    </div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default NovelByGenre;
