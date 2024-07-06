"use client";
import useApiService from "@/services/ApiService";
import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import PaginationControlled from "@/components/pagination";
import SideDrawerRanking from "./SideDrawerRanking";
import MainSectionRanking from "./MainSectionRanking";
import loader from '../../../../public/assets/loader/loader.gif'
import Image from "next/image";

const drawerWidth = 330;

function Home(props) {
  const contentTypeData = [
    {
      name: "All",
      value: "",
    },
    {
      name: "Translated",
      value: "Translated",
    },
    {
      name: "Original",
      value: "Original",
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

  const timeData = [
    {
      name: "Monthly",
      value: "MONTHLY",
      time: "<30 Days",
    },
    {
      name: "Season",
      value: "SEASON",
      time: "31-90 Days",
    },
    {
      name: "Bi-annual",
      value: "BIANNUAL",
      time: "91-180 Days",
    },
    {
      name: "Annual",
      value: "ANNUAL",
      time: "181-365 Days",
    },
    {
      name: "All Time",
      value: "ALLTIME",
      time: ">365 Days",
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

  const [rankingTab, setRankingTab] = useState("view");
  const [rankingByViewData, setRankingByViewData] = useState([]);
  const {
    getRankingByView,
    getRankingByCoins,
    getRankingByBookmark,
    bookmarkNovel,
    getNovelByGenre,
  } = useApiService();
  const [genderLead, setGenderLead] = useState("");
  const [novelGenreData, setNovelGenreData] = useState([]);
  const [novelByGenreValue, setNovelByGenreValue] = useState("");
  const [contentTypeValue, setContentTypeValue] = useState("");
  const [contentFeaturedValue, setContentFeaturedValue] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [page, setPage] = useState(1);

  const rankingByCoins = (para1, para2, para3, para4, para5) => {
    let url = "";
    if (para1 == undefined) {
      url = `page=${page}&limit=10`;
    } else {
      url = `page=${page}&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[releaseRange]=${para4}&filter[lead]=${para5}`;
    }
    getRankingByCoins(url)
      .then((res) => {
        setRankingByViewData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const rankingByViews = (para1, para2, para3, para4, para5) => {
    let url = "";
    if (para1 == undefined) {
      url = `page=${page}&limit=10`;
    } else {
      url = `page=${page}&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[releaseRange]=${para4}&filter[lead]=${para5}`;
    }
    getRankingByView(url)
      .then((res) => {
        setRankingByViewData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const rankingByBookmark = (para1, para2, para3, para4, para5) => {
    let url = "";
    if (para1 == undefined) {
      url = `page=${page}&limit=10`;
    } else {
      url = `page=${page}&limit=10&filter[genre]=${para1}&filter[type]=${para2}&filter[novelStatus]=${para3}&filter[releaseRange]=${para4}&filter[lead]=${para5}`;
    }
    getRankingByBookmark(url)
      .then((res) => {
        setRankingByViewData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useMemo(() => {
    if (rankingTab === "coins") {
      setRankingTab("coins");
      rankingByCoins();
    } else if (rankingTab === "bookmark") {
      rankingByBookmark();
      setRankingTab("bookmark");
    } else {
      rankingByViews();
      setRankingTab("views");
    }
  }, [page]);

  useEffect(() => {
    getNovelByGenre()
      .then((res) => {
        setNovelGenreData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const theme = useTheme();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div className="pt-5 dark:bg-gray-800 h-full dark:text-gray-100">
      <Box className="flex justify-between items-center">
        <div className="pl-2">Filter</div>
        <IconButton onClick={handleDrawerToggle} className="dark:text-white">
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>
      <Divider />
      <div className="grid grid-cols-3 gap-2 px-2 pt-2">
        {timeData?.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (rankingTab == "views") {
                  rankingByViews(
                    novelByGenreValue,
                    contentTypeValue,
                    contentFeaturedValue,
                    item?.value,
                    genderLead
                  );
                } else if (rankingTab == "coins") {
                  rankingByCoins(
                    novelByGenreValue,
                    contentTypeValue,
                    contentFeaturedValue,
                    item?.value,
                    genderLead
                  );
                } else {
                  rankingByBookmark(
                    novelByGenreValue,
                    contentTypeValue,
                    contentFeaturedValue,
                    item?.value,
                    genderLead
                  );
                }
                setTimeFilter(item?.name);
              }}
              className={`cursor-pointer border px-3 py-1 text-xs ${
                timeFilter == item?.name
                  ? "bg-blue-800 text-white"
                  : "text-gray-800 bg-gray-100 dark:bg-[#131415] dark:text-white"
              }`}
            >
              <div>{item?.name}</div>
              <div>{item?.time}</div>
            </div>
          );
        })}
      </div>

      <div className="text-lg font-semibold pl-2 pt-2">Novel By Genre :</div>
      <div className="flex flex-wrap gap-2 mt-2 px-4 pb-3">
        {novelGenreData?.data?.map((text, index) => (
          <div key={index} className="text-center">
            <div
              onClick={() => {
                if (rankingTab == "views") {
                  rankingByViews(
                    text?.name,
                    contentTypeValue,
                    contentFeaturedValue,
                    timeFilter,
                    genderLead
                  );
                } else if (rankingTab == "coins") {
                  rankingByCoins(
                    text?.name,
                    contentTypeValue,
                    contentFeaturedValue,
                    timeFilter,
                    genderLead
                  );
                } else {
                  rankingByBookmark(
                    text?.name,
                    contentTypeValue,
                    contentFeaturedValue,
                    timeFilter,
                    genderLead
                  );
                }
                setNovelByGenreValue(text?.name);
              }}
              className={
                novelByGenreValue === text?.name
                  ? "cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white"
                  : "border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0"
              }
            >
              {text?.name}
            </div>
          </div>
        ))}
      </div>
      <Divider />

      <div className="text-lg font-semibold pl-2 pt-2">Content Type :</div>
      <div className="grid grid-cols-3 gap-2 mt-2 px-4 pb-3">
        {contentTypeData?.map((text, index) => (
          <div key={index} className="text-center">
            <div
              onClick={() => {
                if (rankingTab == "views") {
                  rankingByViews(
                    novelByGenreValue,
                    text?.value,
                    contentFeaturedValue,
                    timeFilter,
                    genderLead
                  );
                } else if (rankingTab == "coins") {
                  rankingByCoins(
                    novelByGenreValue,
                    text?.value,
                    contentFeaturedValue,
                    timeFilter,
                    genderLead
                  );
                } else {
                  rankingByBookmark(
                    novelByGenreValue,
                    text?.value,
                    contentFeaturedValue,
                    timeFilter,
                    genderLead
                  );
                }
                setContentTypeValue(text?.value);
              }}
              className={
                contentTypeValue === text?.value
                  ? "cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white"
                  : "border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0"
              }
            >
              {text.name}
            </div>
          </div>
        ))}
      </div>
      <Divider />

      <div className="text-lg font-semibold pl-2 pt-2">Content Status :</div>
      <div className="grid grid-cols-3 gap-2 mt-2 px-4 pb-3">
        {contentFeatureData?.map((text, index) => (
          <div key={index} className="text-center">
            <div
              onClick={() => {
                if (rankingTab == "views") {
                  rankingByViews(
                    novelByGenreValue,
                    contentTypeValue,
                    text?.value,
                    timeFilter,
                    genderLead
                  );
                } else if (rankingTab == "coins") {
                  rankingByCoins(
                    novelByGenreValue,
                    contentTypeValue,
                    text?.value,
                    timeFilter,
                    genderLead
                  );
                } else {
                  rankingByBookmark(
                    novelByGenreValue,
                    contentTypeValue,
                    text?.value,
                    timeFilter,
                    genderLead
                  );
                }
                setContentFeaturedValue(text?.value);
              }}
              className={
                contentFeaturedValue === text?.value
                  ? "cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white"
                  : "border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0"
              }
            >
              {text.name}
            </div>
          </div>
        ))}
      </div>
      <Divider />
    </div>
  );

  return (
    <div
      className={
        rankingByViewData?.data?.length > 0 ? "pt-20" : "pt-20 pb-40 lg:pb-10"
      }
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <div className="w-full flex items-center justify-between">
        <div
          onClick={handleDrawerToggle}
          className="cursor-pointera xl:hidden flex items-center pl-5"
        >
          <MenuIcon />
          <div className="pl-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Filter
          </div>
        </div>

        <div className="block xl:hidden pr-5">
          <select
            className="py-1 focus:outline-none border border-black px-1 rounded-md dark:bg-[#202020] dark:text-white"
            onChange={(e) => {
              setRankingTab(e.target.value);
              if (e.target.value == "views") {
                rankingByViews();
              } else if (e.target.value == "coins") {
                rankingByCoins();
              } else {
                rankingByBookmark();
              }
              setTimeFilter("");
              setNovelByGenreValue("");
              setContentTypeValue("");
              setContentFeaturedValue("");
              setGenderLead("");
            }}
          >
            <option value="views">Popular Ranking</option>
            <option value="coins">Trending Ranking</option>
            <option value="bookmark">Collection Ranking</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <div className="border-b border-b-gray-500 justify-center lg:gap-x-6 gap-x-4 hidden xl:flex text-xs md:text-sm px-2 md:px-0 mb-2 pt-2">
          <div
            onClick={() => {
              setRankingTab("views");
              setPage(1);
              rankingByViews();
              setTimeFilter("");
              setNovelByGenreValue("");
              setContentTypeValue("");
              setContentFeaturedValue("");
              setGenderLead("");
            }}
            className={`cursor-pointer dark:hover:border-b-white hover:border-b-black hover:border-b-2 ${
              rankingTab == "views" &&
              "border-b-2 dark:border-b-3 border-black dark:border-white pb-3"
            }`}
          >
            Popular Ranking
          </div>

          <div
            onClick={() => {
              setRankingTab("bookmark");
              setPage(1);
              rankingByBookmark();
              setTimeFilter("");
              setNovelByGenreValue("");
              setContentTypeValue("");
              setContentFeaturedValue("");
              setGenderLead("");
            }}
            className={`cursor-pointer dark:hover:border-b-white hover:border-b-black hover:border-b-2 ${
              rankingTab == "bookmark" &&
              "border-b-2 dark:border-b-3 border-black dark:border-white pb-3"
            }`}
          >
            Collection Ranking
          </div>

          <div
            onClick={() => {
              setRankingTab("coins");
              setPage(1);
              rankingByCoins();
              setTimeFilter("");
              setNovelByGenreValue("");
              setContentTypeValue("");
              setContentFeaturedValue("");
              setGenderLead("");
            }}
            className={`cursor-pointer dark:hover:border-b-white hover:border-b-black hover:border-b-2 ${
              rankingTab == "coins" &&
              "border-b-2 dark:border-b-3 border-black dark:border-white pb-3"
            }`}
          >
            Trending Ranking
          </div>
        </div>

        <div className="hidden xl:flex gap-x-8 justify-center pt-3 pb-5">
          {timeData?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  if (rankingTab == "views") {
                    rankingByViews(
                      novelByGenreValue,
                      contentTypeValue,
                      contentFeaturedValue,
                      item?.value,
                      genderLead
                    );
                  } else if (rankingTab == "coins") {
                    rankingByCoins(
                      novelByGenreValue,
                      contentTypeValue,
                      contentFeaturedValue,
                      item?.value,
                      genderLead
                    );
                  } else {
                    rankingByBookmark(
                      novelByGenreValue,
                      contentTypeValue,
                      contentFeaturedValue,
                      item?.value,
                      genderLead
                    );
                  }
                  setTimeFilter(item?.name);
                }}
                className={`cursor-pointer border px-6 py-2 rounded-md text-sm ${
                  timeFilter == item?.name
                    ? "bg-blue-800 text-white"
                    : "text-gray-800 bg-gray-100 dark:bg-[#131415] dark:text-white"
                }`}
              >
                <div>{item?.name}</div>
                <div>{item?.time}</div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-x-6 px-5">
          <div className="w-[25%] bg-[#F6F6F6] dark:bg-[#131415] p-2 rounded-md hidden xl:block">
            <SideDrawerRanking
              contentFeatureData={contentFeatureData}
              contentTypeData={contentTypeData}
              novelGenreData={novelGenreData}
              genderLead={genderLead}
              genderLeadData={genderLeadData}
              rankingTab={rankingTab}
              rankingByViews={rankingByViews}
              rankingByCoins={rankingByCoins}
              rankingByBookmark={rankingByBookmark}
              contentTypeValue={contentTypeValue}
              setContentTypeValue={setContentTypeValue}
              contentFeaturedValue={contentFeaturedValue}
              setNovelByGenreValue={setNovelByGenreValue}
              novelByGenreValue={novelByGenreValue}
              timeFilter={timeFilter}
              setContentFeaturedValue={setContentFeaturedValue}
              setGenderLead={setGenderLead}
            />
          </div>

          <div className="xl:w-[75%] w-full pt-3 md:pt-0">
            {rankingByViewData?.data?.length > 0 ? (
              <MainSectionRanking
                rankingByViewData={rankingByViewData}
                rankingTab={rankingTab}
              />
            ) : (
              <div className="flex justify-center items-center w-full xl:w-[75%] pt-16">
                <Image
                  src={loader}
                  alt=""
                  height={1000}
                  width={1000}
                  className="h-20 w-20"
                />
              </div>
            )}

            {rankingByViewData?.data?.length > 0 && (
              <div className="flex justify-center">
                <PaginationControlled
                  setPage={setPage}
                  last_page={rankingByViewData?.totalPage}
                  page={page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
