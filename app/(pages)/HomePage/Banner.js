"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import useApiService from "@/services/ApiService";
import { useDispatch } from "react-redux";
import { COIN_HISTORY } from "@/app/Redux/slice/userSlice";

function Banner(props) {
  const { accesssToken, getBanners } = useApiService();
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [bannerData, setBannerData] = useState([]);
  const [localStorageToken, setLocalStorageToken] = useState();

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (localStorage !== undefined && localStorage.getItem("token")) {
      setLocalStorageToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (localStorageToken) {
      accesssToken()
        .then((res) => {
          dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins));
        })
        .catch((er) => {});
    }
  }, []);

  useEffect(() => {
    getBanners()
      .then((res) => {
        setBannerData(res?.data?.data?.data);
      })
      .catch((er) => {});
  }, []);

  return (
    <div>
      <Slider {...settings}>
        {bannerData?.length > 0 ? (
          bannerData?.map((item, index) => {
            const showBanner =
              item?.bannerType === "APP" &&
              item?.location === "HOME" 
              // &&
              // screenWidth < 1000;
            return (
              showBanner && (
                <div key={index} className="flex">
                  <Image
                    height={500}
                    width={500}
                    src={item?.bannerImg == null || item?.bannerImg == "null" ? "" : item?.bannerImg}
                    alt="banner"
                    className="w-full md:h-[30rem] h-auto max-h-[26rem] object-cover"
                  />
                </div>
              )
            );
          })
        ) : (
          <div>
            <div className="flex items-center justify-center w-full md:h-[30rem] h-auto bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-[500px] h-[500px] text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        )}
        
        {bannerData?.length > 0 ? (
          bannerData?.map((item, index) => {
            const showBanner =
              item?.bannerType === "WEB" &&
              item?.location === "HOME" 
              // &&
              // screenWidth > 1000;
            return (
              showBanner && (
                <div key={index} className="w-full md:h-[30rem] h-[26rem]">
                  <Image
                    height={500}
                    width={500}
                    src={item?.bannerImg == null || item?.bannerImg == "null" ? "" : item?.bannerImg}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            );
          })
        ) : (
          <div>
            <div className="flex items-center justify-center w-full md:h-[30rem] h-auto bg-gray-300 rounded dark:bg-gray-700">
              <svg
                className="w-[500px] h-[500px] text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default Banner;
