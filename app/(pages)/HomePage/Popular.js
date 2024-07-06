"use client";
import useApiService from "@/services/ApiService";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useEffect, useState } from "react";

function Popular(props) {
  const settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          swipeToSlide: true,
          swipe: true,
          speed: 100,
          pauseOnDotsHover: false,
          arrows: false,
        },
      },
    ],
  };

  const { getPopularThisWeek } = useApiService();
  const [popularNovelData, setPopularNovelData] = useState([]);

  useEffect(() => {
    getPopularThisWeek()
      .then((res) => {
        setPopularNovelData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="md:pt-10 pt-10 px-2 md:px-8 pb-7">
        <div className="flex justify-between items-center pb-5">
          <div className="text-2xl md:text-2xl font-bold">
            Popular This Week
          </div>
        </div>

        <div className="">
          <Slider {...settings} className="w-full">
            {popularNovelData?.map((data, index) => {
              return (
                <Link
                  key={index}
                  href={{ pathname: `/detail/view/${data?._id}` }}
                  prefetch
                  className="px-1 poularWeekCard flex items-center group py-2"
                >
                  <div className="border-2 rounded-md md:h-56 md:w-44 h-60 w-44 group-hover:shadow-[4px_5px_4px_2px_#F2F2F2] group-hover:z-10">
                    <Image
                      src={
                        data?.coverImg == null || data?.coverImg == "null"
                          ? ""
                          : data?.coverImg
                      }
                      height={100}
                      width={100}
                      alt="popular image"
                      className="object-cover md:object-cover h-[240px] w-full rounded-md"
                    />
                  </div>
                  <div className="text-sm md:text-sm group-hover:border-2 group-hover:border-[#20A7FE] overflow-hidden pl-4 md:pl-2 pr-2 lg:pl-5 border rounded-r-md dark:bg-gray-950 bg-gray-300 h-36 md:h-36 w-1/2 flex flex-col justify-center">
                    <div className="underline">{data?.genre}</div>
                    <div className="py-1 font-semibold md:text-base">
                      {data?.title?.length > 30
                        ? data?.title?.slice(0, 30)
                        : data?.title}
                    </div>
                    <div className="">
                      {data?.description?.length > 40
                        ? data?.description?.slice(0, 40)
                        : data?.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>

      {/* <div className="">
        <Slider {...settings} className="w-full">
          {popularNovelData?.map((data, index) => {
            return (
              <Link
                key={index}
                href={{ pathname: `/detail/view/${data?._id}` }}
                prefetch
                className="px-1 poularWeekCard flex items-center group py-2"
              >
                <div className="border-2 rounded-md md:h-56 md:w-44 h-60 w-44 group-hover:shadow-[4px_5px_4px_2px_#F2F2F2] group-hover:z-10">
                  <Image
                    src={data?.coverImg}
                    height={100}
                    width={100}
                    alt="popular image"
                    className="object-cover md:object-cover h-[240px] w-full rounded-md"
                  />
                </div>
                <div className="text-sm md:text-sm group-hover:border-2 group-hover:border-[#20A7FE] overflow-hidden pl-4 md:pl-2 pr-2 lg:pl-5 border rounded-r-md dark:bg-gray-950 bg-gray-300 h-36 md:h-36 w-1/2 flex flex-col justify-center">
                  <div className="underline">{data?.genre}</div>
                  <div className="py-1 font-semibold md:text-base">
                    {data?.title?.length > 30
                      ? data?.title?.slice(0, 30)
                      : data?.title}
                  </div>
                  <div className="">
                    {data?.description?.length > 40
                      ? data?.description?.slice(0, 40)
                      : data?.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div> */}
    </>
  );
}

export default Popular;
