"use client";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import useApiService from "@/services/ApiService";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PaginationControlled from "@/components/pagination";
import Head from "next/head";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SideDrawer from "./SideDrawer";
import MobileSideDrawer from "./MobileSideDrawer";
import { CircularProgress } from "@mui/material";
import loader from "../../../../public/assets/loader/loader.gif";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 330;

function Home(props) {
  const sortBy = [
    {
      name: "Popular",
      value: "popular",
    },
    {
      name: "Rating",
      value: "rating",
    },
    {
      name: "Latest",
      value: "latest",
    },
  ];

  const contentTypeData = [
    {
      name: "All",
    },
    {
      name: "Translated",
    },
    {
      name: "Original",
    },
  ];

  const contentFeatureData = [
    {
      name: "All",
      value: "",
    },
    {
      name: "Completed",
      value: "Completed",
    },
    {
      name: "Ongoing",
      value: "OnGoing",
    },
  ];

  const genderLeadData = [
    {
      name: "Male",
    },
    {
      name: "Female",
    },
  ];

  const [latestUpdateData, setLatestUpdateData] = useState([]);
  const [sotingName, setSotingName] = useState();
  const { globalSearchFilter, getNovelByGenre } = useApiService();
  const [page, setPage] = useState(1);
  const [shortList, setShortList] = useState();
  const [genderLead, setGenderLead] = useState("");
  const pathname = usePathname();
  const [novelByGenreValue, setNovelByGenreValue] = useState("");
  const [contentTypeValue, setContentTypeValue] = useState("");
  const [contentFeaturedValue, setContentFeaturedValue] = useState("");
  const [novelGenreData, setNovelGenreData] = useState([]);

  const filterApi = (para1, para2, para3, para4, para5, page6) => {
    const path = pathname.slice(12);
    let url = `page=${page6}&limit=12&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[lead]=${para4}&filter[${para5}]=true`;

    globalSearchFilter(url)
      .then((res) => {
        setLatestUpdateData(res?.data?.data?.novels);
        setShortList(res?.data?.data?.novels);
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      })
      .catch((er) => {
        console.log("Error novel-list", er);
      });
  };

  useEffect(() => {
    getGenre();
    const path = pathname.slice(12);
    if (path.includes("Genre")) {
      setNovelByGenreValue(path.split("-")[0]);
      filterApi(
        path.split("-")[0],
        contentTypeValue,
        contentFeaturedValue,
        genderLead,
        "",
        page
      );
    } else if (path.includes("More")) {
      setSotingName(path.split("-")[0]);
      filterApi(
        novelByGenreValue,
        contentTypeValue,
        contentFeaturedValue,
        genderLead,
        path.split("-")[0],
        page
      );
    } else {
      filterApi(
        novelByGenreValue,
        contentTypeValue,
        contentFeaturedValue,
        genderLead,
        path.split("-")[0],
        page
      );
    }
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <MobileSideDrawer
      sotingName={sotingName}
      contentFeatureData={contentFeatureData}
      contentTypeData={contentTypeData}
      novelGenreData={novelGenreData}
      contentFeaturedValue={contentFeaturedValue}
      contentTypeValue={contentTypeValue}
      novelByGenreValue={novelByGenreValue}
      filterApi={filterApi}
      setGenderLead={setGenderLead}
      genderLead={genderLead}
      genderLeadData={genderLeadData}
      setPage={setPage}
      setNovelByGenreValue={setNovelByGenreValue}
      setContentTypeValue={setContentTypeValue}
      setContentFeaturedValue={setContentFeaturedValue}
      handleDrawerToggle={handleDrawerToggle}
    />
  );

  const getGenre = () => {
    getNovelByGenre()
      .then((res) => {
        setNovelGenreData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <>
      <Head>
        <meta property="og:title" content="Jade scroll" />
        <meta name="og:description" content="Jade scroll novels home page" />
      </Head>
      <div>
        {/* Mobile drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <div className="md:pt-20 lg:pt-24 pt-20 px-4 md:px-8">
          <div className="flex gap-x-6">
            <div className="w-[25%] bg-[#F6F6F6] dark:bg-[#131415] p-2 rounded-md hidden xl:block shadow-[0_1px_7px_3px_#b7a7a740]">
              <SideDrawer
                sotingName={sotingName}
                contentFeatureData={contentFeatureData}
                contentTypeData={contentTypeData}
                novelGenreData={novelGenreData}
                contentFeaturedValue={contentFeaturedValue}
                contentTypeValue={contentTypeValue}
                novelByGenreValue={novelByGenreValue}
                filterApi={filterApi}
                setGenderLead={setGenderLead}
                genderLead={genderLead}
                genderLeadData={genderLeadData}
                setPage={setPage}
                setNovelByGenreValue={setNovelByGenreValue}
                setContentTypeValue={setContentTypeValue}
                setContentFeaturedValue={setContentFeaturedValue}
              />
            </div>

            {shortList ? (
              <div
                className={`${
                  latestUpdateData?.data?.length > 0 ? "" : "pb-40 lg:pb-10"
                } w-full xl:w-[75%] bg-[#FFFFFF] dark:bg-[#131415] md:p-4 rounded-md shadow-[0_1px_7px_3px_#b7a7a740]`}
              >
                <div className="xl:flex items-center pb-4 hidden">
                  <div className="text-lg pr-10 text-gray-700 dark:text-gray-200">
                    Sort By :
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {sortBy.map((item, index) => {
                      return (
                        <div
                          onClick={() => {
                            filterApi(
                              novelByGenreValue,
                              contentTypeValue,
                              contentFeaturedValue,
                              genderLead,
                              item?.value,
                              "1"
                            );
                            setSotingName(item?.value);
                            setPage(1);
                          }}
                          key={index}
                          className={`capitalize cursor-pointer rounded-md px-2 text-sm py-1 shadow-[0_1px_2px_2px_#efe2e294] ${
                            sotingName === item?.value
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-black dark:bg-[#131415] hover:bg-black hover:text-white dark:text-gray-200"
                          }`}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 xl:hidden p-2">
                  <div className="flex items-center">
                    <MenuIcon
                      className="cursor-pointer"
                      onClick={handleDrawerToggle}
                    />
                    <div className="pl-2 text-lg font-semibold dark:text-white text-gray-900">
                      Filter
                    </div>
                  </div>
                  <div>
                    <select
                      // defaultValue={sotingName !== undefined && sotingName === 'latest' ? 'latest' : sotingName === 'rating' ? 'rating' : 'popular'}
                      onChange={(e) => {
                        filterApi(
                          novelByGenreValue,
                          contentTypeValue,
                          contentFeaturedValue,
                          genderLead,
                          e.target.value,
                          "1"
                        );
                        setSotingName(e.target.value);
                        setPage(1);
                      }}
                      className="px-2 py-[2px] focus:outline-none border border-gray-500 dark:bg-gray-900 rounded-md"
                    >
                      {sortBy?.map((item, index) => {
                        return (
                          <option key={index} value={item?.value}>
                            {item?.name}
                          </option>
                        );
                      })}
                      {/* <option>Featured</option>
                                    <option>Games</option> */}
                    </select>
                  </div>
                </div>

                {latestUpdateData?.data?.length == 0 ? (
                  <div className="text-center pt-5 dark:text-white">
                    No data found
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 md:gap-y-8 lg:gap-5 justify-center items-center py-3 px-2 md:px-3">
                    {latestUpdateData?.data?.map((item, index) => {
                      return (
                        <Link
                          href={{ pathname: `/detail/view/${item?._id}` }}
                          prefetch
                          key={index}
                          className="dark:border-white m-auto rounded-lg bg-white dark:bg-gray-950 p-1 dark:shadow-[0_0_5px_2px_#ebebeb] shadow-[0_0_4px_5px_#ebebeb]"
                        >
                          <div className="h-40 w-36 md:h-40 md:w-40 lg:h-[17rem] lg:w-48 overflow-hidden">
                            <Image
                              src={
                                item?.coverImg == null ||
                                item?.coverImg == "null"
                                  ? ""
                                  : item?.coverImg
                              }
                              height={300}
                              width={300}
                              alt="cover"
                              className="ImageZoom h-[200px] md:h-full w-full rounded-t-md hover:rounded-md object-cover"
                            />
                          </div>
                          <div className="pl-1 pt-2">
                            <div className="text-sm md:text-lg font-semibold  dark:text-gray-200 hidden lg:block">
                              {item?.title?.length > 18
                                ? `${item.title?.slice(0, 18)}..`
                                : item?.title}
                            </div>
                            <div className="text-sm md:text-lg font-semibold  dark:text-gray-200 block lg:hidden">
                              {item?.title?.length > 12
                                ? `${item.title?.slice(0, 12)}..`
                                : item?.title}
                            </div>
                            <div className="text-xs md:py-1 text-gray-600 dark:text-gray-400 hidden md:block">
                              {item?.genre}
                            </div>
                            <div className="text-xs md:py-1 text-gray-600 dark:text-gray-400 block md:hidden">
                              {item?.genre?.length > 10
                                ? item?.genre.slice(0, 10)
                                : item?.genre}
                            </div>
                            {/* <Rating className='hidden md:flex' size='small' name="read-only" value={item?.totalRating} readOnly /> */}
                            <div className="flex items-center">
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
                                className="pt-1"
                                readOnly
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
                {latestUpdateData?.data?.length > 0 && (
                  <div className="flex justify-center">
                    <PaginationControlled
                      setPage={(page) => {
                        setPage(page);
                        filterApi(
                          novelByGenreValue,
                          contentTypeValue,
                          contentFeaturedValue,
                          genderLead,
                          sotingName,
                          page
                        );
                      }}
                      last_page={shortList?.totalPage}
                      page={page}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center w-full xl:w-[75%]">
                <Image
                  src={loader}
                  alt=""
                  height={1000}
                  width={1000}
                  className="h-20 w-20"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
