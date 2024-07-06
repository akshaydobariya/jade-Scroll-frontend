import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import PaginationControlled from "@/components/pagination";
import coin from "../../../public/assets/Images/coin.gif";
import { useDispatch, useSelector } from "react-redux";
import useApiService from "@/services/ApiService";
import { COIN_HISTORY } from "@/app/Redux/slice/userSlice";
import { Typography } from "@mui/material";
import Image from "next/image";
import multicoin from "../../../public/assets/Images/coin.png";
import AppConfig from "@/appConfig";
import loader from '../../../public/assets/loader/loader.gif'

function CoinTab(props) {
  const {
    handleOpen,
    selectCoinData,
    setSelectCoinData,
    handleLoginModalOpen,
  } = props;
  const totalCoinData = useSelector((state) => state?.user?.coinHistory);
  const { accesssToken, getCoinHistory, getCoins } = useApiService();
  const [coinData, setCoinData] = useState([]);
  const [coinHistoryData, setCoinHistoryData] = useState([]);
  const [localStorageToken, setLocalStorageToken] = useState();
  const [coinHistoryPage, setCoinHistoryPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const currency = AppConfig.currency;

  const getCoinsApi = () => {
    getCoins()
      .then((res) => {
        setCoinData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const url = `page=${coinHistoryPage}&limit=10`;
      getCoinHistory(url)
        .then((res) => {
          setCoinHistoryData(res?.data?.data);
          if (res?.data?.data?.totalPage === coinHistoryPage) {
            if (typeof window !== "undefined") {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [coinHistoryPage]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      accessTokenApi();
    }

    if (localStorage.getItem("token")) {
      setLocalStorageToken(localStorage.getItem("token"));
    }

    setIsClient(true);
    getCoinsApi();
  }, []);

  const accessTokenApi = () => {
    accesssToken()
      .then((res) => {
        dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins));
      })
      .catch((er) => {});
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:gap-10 w-full pt-10 pb-3 p gap-7">
      {localStorageToken && (
        <div className="block lg:hidden bg-slate-200 px-4 py-4 rounde-2xl dark:text-white text-white mt-4 md:mt-2 dark:shadow-[0_0_2px_2px_#131313] dark:bg-[#131415] rounded-md h-max">
          <Accordion
            defaultExpanded
            className="dark:bg-[#202020] dark:text-white bg-gray-300 text-black"
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon className=" text-black  dark:text-white" />
              }
              aria-controls="panel1-content"
              id="panel1-header"
              className="dark:bg-[#202020] dark:text-white bg-gray-300 text-black"
            >
              <Typography>Purchase history</Typography>
            </AccordionSummary>
            <AccordionDetails className="dark:bg-[#131415] bg-gray-300 text-black">
              <div className="dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-3">
                <div className="border-b rounded-t-md px-2 bg-gray-300 text-black dark:text-white dark:bg-[#131415] py-[10px]">
                  Jade Coin Purchase History
                </div>
                {coinHistoryData?.data?.length == 0 ? (
                  <div className="dark:text-white py-3 text-center">
                    No Transaction
                  </div>
                ) : (
                  <TableContainer
                    component={Paper}
                    className="dark:bg-[#202020] dark:text-gray-100"
                  >
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                      <TableHead className="bg-gray-300 text-black dark:bg-[#131415] dark:text-white">
                        <TableRow>
                          <TableCell className=" text-black  dark:text-white">
                            Title
                          </TableCell>
                          <TableCell
                            className=" text-black  dark:text-white"
                            align="right"
                          >
                            Coin
                          </TableCell>
                          <TableCell
                            className=" text-black  dark:text-white"
                            align="right"
                          >
                            Current Coin
                          </TableCell>
                          <TableCell
                            className=" text-black  dark:text-white"
                            align="right"
                          >
                            Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className=" bg-gray-300 text-black dark:bg-[#131415] dark:text-white">
                        {coinHistoryData?.data?.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              className=" text-black  dark:text-white"
                              component="th"
                              scope="row"
                            >
                              {item?.type == "BUY"
                                ? "ADD"
                                : item?.novelId?.title}
                            </TableCell>
                            <TableCell
                              className=" text-black  dark:text-white"
                              align="right"
                            >
                              {item?.type == "BUY"
                                ? `+$${item?.amount}`
                                : `-$${item?.amount}`}
                            </TableCell>
                            <TableCell
                              className=" text-black  dark:text-white"
                              align="right"
                            >
                              {item?.currentCoinsAmount}
                            </TableCell>
                            <TableCell
                              className=" text-black  dark:text-white"
                              align="right"
                            >
                              {moment(item?.createdAt).format("DD MMM, YYYY")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </AccordionDetails>
            {coinHistoryData?.data?.length > 0 && (
              <div className="flex justify-center pt-1">
                <PaginationControlled
                  setPage={setCoinHistoryPage}
                  last_page={coinHistoryData?.totalPage}
                  page={coinHistoryPage}
                />
              </div>
            )}
          </Accordion>
        </div>
      )}

      {coinData?.length > 0 ? (
        <div
          className={`${
            !localStorageToken
              ? `w-full grid md:grid-cols-4 grid-cols-2 gap-6 dark:gap-8 md:px-10 h-max`
              : `lg:w-3/5 grid md:grid-cols-3 grid-cols-2 gap-4 dark:gap-8 md:px-10 lg:px-0 h-max`
          } px-4 lg:pl-10`}
        >
          {coinData?.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-md bg-[#202020] dark:text-white shadow-[0_0_6px_1px_#101010]"
              >
                {/* <div className='flex justify-center py-6'>
                                        <Image src={coins} alt='coins' className='w-20 h-20' />
                                    </div> */}
                <div className="text-white font-semibold border-white pb-2 pt-3 dark:text-gray-200 dark:border-gray-800">
                  <div className="flex justify-center gap-3">
                    <Image src={multicoin} alt="coin" className="h-24 w-24" />
                    {/*    <div>{item?.coins}</div> */}
                  </div>
                  <div className="text-center">
                    {currency} {item?.price}
                  </div>
                  <div className="pt-2 pb-1 text-center">
                    {item?.coins} Jade coins
                  </div>
                </div>
                <div className="text-white bg-blue-600 text-center border-t rounded-b-md dark:border-gray-800 py-2">
                  <button
                    onClick={() => {
                      if (!localStorageToken) {
                        handleLoginModalOpen();
                      } else {
                        setSelectCoinData(item);
                        handleOpen();
                      }
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full ">
          <Image
            src={loader}
            alt=""
            height={1000}
            width={1000}
            className="h-20 w-20"
          />
        </div>
      )}
      {localStorageToken && (
        <div className="lg:w-2/5 bg-slate-200 pt-6 md:pt-1 mx-2 rounded-2xl h-fit pb-6 dark:bg-black px-6">
          <div className="md:mt-0 relative    rounded-md h-max">
            <div className="text-center flex justify-between items-center px-2 rounded-sm gap-x-4 lg:border border-gray-400 lg:mt-2">
              <div className="text-center text-2xl ">My Wallet</div>
              <div className="lg:py-3 px-3 text-white relative">
                <div className="bg-blue-400 px-4 md:border h-fit w-fit m-auto py-1 rounded-md mt-1 flex items-center justify-center">
                  <div>
                    <Image
                      src={coin}
                      alt="coins"
                      className="h-5 w-5"
                      height={200}
                      width={200}
                    />
                  </div>
                  {totalCoinData !== "" && (
                    <div className="pl-2">{isClient && totalCoinData}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block dark:text-white text-black mt-4 md:mt-4 dark:shadow-[0_0_2px_2px_#131313] bg-gray-300 dark:bg-[#131415] rounded-md h-max">
            <Accordion
              defaultExpanded
              className="dark:bg-[#202020] dark:text-white bg-gray-300 text-black"
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon className=" text-black  dark:text-white" />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                className="dark:bg-[#202020] dark:text-white bg-gray-300 text-black"
              >
                <Typography>Purchase history</Typography>
              </AccordionSummary>
              <AccordionDetails className="dark:bg-[#131415] bg-gray-300 text-black">
                <div className="dark:shadow-[0_0_4px_.3px_#dfdfdf] shadow-[0_0_9px_.3px_#403d3dad] rounded-md mt-3">
                  <div className="border-b rounded-t-md px-2 bg-gray-300 text-black dark:text-white dark:bg-[#131415] py-[10px]">
                    Jade Coin Purchase History
                  </div>
                  {coinHistoryData?.data?.length == 0 ? (
                    <div className="dark:text-white py-3 text-center">
                      No Transaction
                    </div>
                  ) : (
                    <TableContainer
                      component={Paper}
                      className="dark:bg-[#202020] dark:text-gray-100"
                    >
                      <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead className="bg-gray-300 text-black dark:bg-[#131415] dark:text-white">
                          <TableRow>
                            <TableCell className=" text-black  dark:text-white">
                              Title
                            </TableCell>
                            <TableCell
                              className=" text-black  dark:text-white"
                              align="right"
                            >
                              Coin
                            </TableCell>
                            <TableCell
                              className=" text-black  dark:text-white"
                              align="right"
                            >
                              Current Coin
                            </TableCell>
                            <TableCell
                              className=" text-black  dark:text-white"
                              align="right"
                            >
                              Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className=" bg-gray-300 text-black dark:bg-[#131415] dark:text-white">
                          {coinHistoryData?.data?.map((item, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                className=" text-black  dark:text-white"
                                component="th"
                                scope="row"
                              >
                                {item?.type == "BUY"
                                  ? "ADD"
                                  : item?.novelId?.title}
                              </TableCell>
                              {/* <TableCell sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} className=' text-black  dark:text-white' align="right">
                                                                        <span className={item?.type == 'BUY' ? 'text-green-500 font-semibold text-lg pr-1' :
                                                                            'text-red-500 font-semibold pr-1'}>{item?.type == 'BUY' ? `+` : `-`}</span>
                                                                        {item?.amount}</TableCell> */}
                              <TableCell
                                className={
                                  item.type == "BUY"
                                    ? "text-green-700 dark:text-green-400"
                                    : "text-red-500"
                                }
                                align="right"
                              >
                                {item?.type == "BUY"
                                  ? `+$${item?.amount}`
                                  : `-$${item?.amount}`}
                              </TableCell>
                              <TableCell
                                className=" text-black  dark:text-white"
                                align="right"
                              >
                                {item?.currentCoinsAmount}
                              </TableCell>
                              <TableCell
                                className=" text-black  dark:text-white"
                                align="right"
                              >
                                {moment(item?.createdAt).format("DD MMM, YYYY")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </div>
              </AccordionDetails>
              {coinHistoryData?.data?.length > 0 && (
                <div className="flex justify-center pt-1">
                  <PaginationControlled
                    setPage={setCoinHistoryPage}
                    last_page={coinHistoryData?.totalPage}
                    page={coinHistoryPage}
                  />
                </div>
              )}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinTab;
