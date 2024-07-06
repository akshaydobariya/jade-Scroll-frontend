"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import coverImage from "../../../../public/assets/Images/backgroundDetail.jpg";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "aos/dist/aos.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import useApiService from "@/services/ApiService";
import Link from "next/link";
import RestoreIcon from "@mui/icons-material/Restore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, CircularProgress, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import paypalIcon from "../../../../public/assets/Images/paypal.png";
import razorpayIcon from "../../../../public/assets/Images/razorpay.png";
import multicoin from "../../../../public/assets/Images/coin.png";
import { useDispatch, useSelector } from "react-redux";
import { BOOKMARK, LIKE_NOVEL } from "@/app/Redux/slice/userSlice";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LoginBox from "@/components/LoginBox";
import AboutTab from "./AboutTab";
import TierTab from "./TierTab";
import ChapterTab from "./ChapterTab";
import useRazorpay from "react-razorpay";
import AppConfig from "@/appConfig";
import loader from "../../../../public/assets/loader/loader.gif";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function Home() {
  const {
    getUpgradeTiersData,
    updateTiersApi,
    likeNovel,
    getNovelDetailById,
    getNovelByid,
    bookmarkNovel,
    paymentApi,
  } = useApiService();
  const router = useRouter();
  const pathname = usePathname();
  const param = useParams();
  const [detailData, setDetailData] = useState();
  const [localStorageToken, setLocalStorageToken] = useState();
  const [relatedNovel, setRelatedNovel] = useState([]);
  const dispatch = useDispatch();
  const bookmarkData = useSelector((state) => state?.user?.bookmark);
  const likeNovelReduxData = useSelector((state) => state?.user?.likeNovelData);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [loadingNovelLike, setLoadingNovelLike] = useState(false);
  const [page, setPage] = useState(1);
  const [currentChapterStatus, setCurrentChapterStatus] = useState([]);
  const [modelLogin, setModelLogin] = useState(false);
  const handleOpenLoginModal = () => setModelLogin(true);
  const handleCloseLoginModal = () => {
    setModelLogin(false);
  };
  const [updatTiereButton, setUpdatTiereButton] = useState(false);
  const [upgradeData, setUpgradeData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("paypal");
  const [Razorpay] = useRazorpay();
  const currency = AppConfig.currency;

  const novelDetailData = (sort) => {
    let form;
    const novelId = pathname.slice(13);
    let userid = localStorage.getItem("user_id");
    const guestTabId = sessionStorage.getItem("tabId");

    if (localStorage.getItem("token")) {
      form = `id=${
        param?.id[param?.id?.length - 1]
      }&userId=${userid}&guestId=${guestTabId}&chapterSort=${
        sort ? sort : "DESC"
      }`;
    } else {
      form = `id=${
        param?.id[param?.id?.length - 1]
      }&guestId=${guestTabId}&chapterSort=${sort ? sort : "DESC"}`;
    }
    getNovelDetailById(form)
      .then((res) => {
        setDetailData(res?.data?.data);
        relatedNovelApi(res?.data?.data?.genre, res?.data?.data?._id);
      })
      .catch((er) => {
        // console.log(er, "Novel Detail Error");
      });
  };
  const [tab, setTab] = useState("About");

  useEffect(() => {
    novelDetailData();
    if (localStorage.getItem("isChapter")) {
      setTab("Chapter");
      localStorage.setItem("isChapter", false);
    }
    if (localStorage !== undefined && localStorage.getItem("token")) {
      setLocalStorageToken(localStorage.getItem("token"));
    }
  }, []);

  const relatedNovelApi = (Genrename, novelId) => {
    getNovelByid(Genrename)
      .then((res) => {
        if (res.status == 200) {
          const dataRelated = res?.data?.data?.data?.filter(
            (item) => item?._id !== novelId
          );
          setRelatedNovel(dataRelated);
        }
      })
      .catch((er) => {
        console.log(er, "er");
      });
  };

  const novelBookmark = (id) => {
    setLoadingBookmark(true);
    if (localStorage.getItem("token")) {
      bookmarkNovel(id)
        .then((res) => {
          if (res?.data?.data == "novel has been saved!") {
            dispatch(
              BOOKMARK([...bookmarkData, { novelId: id, notification: true }])
            );
            setLoadingBookmark(false);
          } else {
            let dataFilter = bookmarkData?.filter(
              (reduxId) => reduxId?.novelId !== id
            );
            dispatch(BOOKMARK(dataFilter));
            setLoadingBookmark(false);
          }
          toast.success(res?.data?.data);
        })
        .catch((er) => {
          console.log(er);
          setLoadingBookmark(false);
        });
    } else {
      handleOpenLoginModal();
      setLoadingBookmark(false);
    }
  };

  const tiersBuy = (data) => {
    const tierBody = {
      items: [
        {
          novelId: detailData?._id,
          tierId: data?._id,
          type: "TIER",
        },
      ],
      discountId: null,
      description: data?.tierDescription,
      paymentMode: selectedOption,
    };
    paymentApi(tierBody)
      .then((res) => {
        if (typeof window !== "undefined" && selectedOption === "paypal") {
          window.open(res?.data?.data?.url);
        } else if (selectedOption === "razorpay") {
          handleRazorpayPayment(res.data.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const updateTiers = (data) => {
    const tierBody = {
      items: [
        {
          novelId: detailData?._id,
          tierId: data?._id,
          type: "TIER",
        },
      ],
      description: data?.tierDescription,
      paymentMode: selectedOption,
    };
    updateTiersApi(tierBody)
      .then((res) => {
        if (typeof window !== "undefined" && selectedOption === "paypal") {
          window.open(res?.data?.data?.url);
        } else if (selectedOption === "razorpay") {
          handleRazorpayPayment(res.data.data);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const upgradeTierDataApi = (data) => {
    const tierBody = {
      items: [
        {
          novelId: detailData?._id,
          tierId: data?._id,
          type: "TIER",
        },
      ],
      // description: data?.tierDescription,
    };

    getUpgradeTiersData(tierBody)
      .then((res) => {
        setUpgradeData(res?.data?.data[0]);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleRazorpayPayment = async (data) => {
    const userData = localStorage.getItem("userData");
    const user = JSON.parse(userData);
    const options = {
      key: data.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "",
      description: "",
      image: "",
      order_id: data.order_id,
      handler: function (response) {
        router.push("/payment-success");
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      router.push("/payment-cancel");
    });
    rzp1.open();
  };

  const novelLike = (id) => {
    setLoadingNovelLike(true);
    if (localStorage.getItem("token")) {
      likeNovel(id)
        .then((res) => {
          if (res?.data?.data == "novel has been added in your like list!") {
            dispatch(LIKE_NOVEL([...likeNovelReduxData, id]));
            setLoadingNovelLike(false);
          } else {
            let data = likeNovelReduxData?.filter((novelId) => novelId !== id);
            dispatch(LIKE_NOVEL(data));
            setLoadingNovelLike(false);
          }
          novelDetailData();
          toast.success(res?.data?.data);
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      handleOpenLoginModal();
      setLoadingNovelLike(false);
    }
  };

  const [selectCoinData, setSelectCoinData] = useState();
  const [modeOpen, setModeOpen] = useState(false);
  const handleOpen = () => setModeOpen(true);
  const handleClose = () => {
    setUpdatTiereButton(false);
    setModeOpen(false);
  };

  useEffect(() => {
    let currentItem =
      detailData !== undefined &&
      detailData?.readingStatus?.filter((item) => item?.status == "Current");

    if (currentItem?.length > 0) {
      setCurrentChapterStatus(
        detailData !== undefined &&
          detailData?.readingStatus?.filter((item) => item?.status == "Current")
      );
    } else {
      let lastChapter =
        detailData?.readingStatus[detailData?.readingStatus.length - 1];
      let abc = detailData?.chapter?.filter(
        (data) => data?._id === lastChapter?.chapterId
      );

      if (abc && abc.length > 0) {
        const indexOfFoundItem = detailData.chapter.findIndex(
          (chapter) => chapter._id === abc[0]._id
        );

        if (
          indexOfFoundItem !== -1 &&
          indexOfFoundItem <= detailData.chapter.length - 1
        ) {
          const nextItem =
            indexOfFoundItem == 0
              ? detailData.chapter[indexOfFoundItem]
              : detailData.chapter[indexOfFoundItem - 1];
          setCurrentChapterStatus(nextItem);
        } else {
          // There is no next item
        }
      }
    }
  }, [detailData]);

  return (
    <>
      <ToastContainer position="bottom-right" newestOnTop={false} stacked />

      <Modal
        open={modeOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="md:w-[550px] w-[320px] dark:bg-[#202020] dark:text-white"
        >
          <div className="flex justify-between items-center">
            <div className="text-center text-xl pb-2 font-semibold">
              Confirm
            </div>
            <div>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => handleClose()}
              />
            </div>
          </div>

          <div className="rounded-md w-fit flex mx-auto my-0 px-10 bg-gray-800 dark:bg-[#131415] mt-2 dark:text-white shadow-[0_0_4px_1px_#101010]">
            <div className="text-white font-semibold border-white pb-1 pt-1 dark:text-gray-200 dark:border-gray-800">
              <div className="flex justify-center gap-3">
                <Image src={multicoin} alt="coin" className="h-24 w-24" />
              </div>
              {updatTiereButton ? (
                <div className="flex gap-x-12 py-5">
                  <div className="text-center">
                    <div>Original Price</div>
                    <div className="text-center">
                      {currency} {selectCoinData?.price}
                    </div>
                  </div>
                  <div className="text-center">
                    <div>Pro Rated Price</div>
                    <div className="text-center">
                      {currency} {upgradeData?.price}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  {currency} {selectCoinData?.price}
                </div>
              )}

              <div className="pt-2 pb-1 text-center">
                {selectCoinData?.tierName}
              </div>
            </div>
          </div>

          {updatTiereButton ? (
            <div div className="pt-4">
              <span className="font-semibold"> Validity :</span>{" "}
              {upgradeData?.remainingDays} days
            </div>
          ) : (
            <div className="pt-4">
              <span className="font-semibold"> Validity :</span>{" "}
              {selectCoinData?.purchaseValidityInDays} days
            </div>
          )}

          <div className="pt-3 font-semibold">Payment Method</div>
          <div className="flex flex-col items-center justify-between pt-2 gap-3">
            <div className="flex gap-2 items-center w-full">
              <div
                className={`border rounded-md border-gray-300 w-full py-1 flex items-center px-2 ${
                  selectedOption === "paypal" ? "border-blue-500" : ""
                }`}
              >
                <Image
                  src={paypalIcon}
                  height={100}
                  width={100}
                  alt="paypal-icon"
                  className="h-5 w-5"
                />
                <div className="pl-2">PayPal</div>
              </div>
              <input
                type="radio"
                checked={selectedOption === "paypal"}
                onChange={() => setSelectedOption("paypal")}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <div
                className={`border rounded-md border-gray-300 w-full py-1 flex items-center px-2 ${
                  selectedOption === "razorpay" ? "border-blue-500" : ""
                }`}
              >
                <Image
                  src={razorpayIcon}
                  height={100}
                  width={100}
                  alt="razorpay-icon"
                  className="h-5 w-5"
                />
                <div className="pl-2">Razorpay</div>
              </div>
              <input
                type="radio"
                checked={selectedOption === "razorpay"}
                onChange={() => setSelectedOption("razorpay")}
              />
            </div>
          </div>
          <div className="text-sm pt-4">
            Secure checkout experience provided by PayPal. No payment method
            information is stored on JadeScrolls.
          </div>
          <div className="flex justify-end pt-3">
            <button
              onClick={() =>
                updatTiereButton
                  ? updateTiers(selectCoinData)
                  : tiersBuy(selectCoinData)
              }
              className="border px-8 rounded-full bg-blue-600 text-white py-1"
            >
              {updatTiereButton ? "Upgrade" : "Buy"}
            </button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={modelLogin}
        onClose={handleCloseLoginModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="md:w-[640px] w-[320px] dark:bg-[#202020] dark:text-white"
        >
          <div className="flex justify-end">
            <CloseIcon
              className="cursor-pointer"
              onClick={handleCloseLoginModal}
            />
          </div>
          <LoginBox />
        </Box>
      </Modal>

      {detailData !== undefined ? (
        <div className="bg-[#131415] dark:bg-[#202020]">
          <div className="pb-32 pt-16 text-gray-100">
            <div className="coverImageContainer">
              <Image
                alt="cover"
                src={coverImage}
                className="coverImageGradient object-cover"
              />
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="2000"
              className="flex md:flex-row flex-col absolute top-20 lg:top-44 w-full"
            >
              <div className="lg:pl-[5.25rem] md:pl-6 flex justify-center">
                <Image
                  src={
                    detailData?.coverImg == null ||
                    detailData?.coverImg == "null"
                      ? ""
                      : detailData?.coverImg
                  }
                  height={300}
                  width={300}
                  alt="novel image"
                  className="md:h-[320px] md:w-[250px] w-[160px] h-[180px] rounded-md object-cover"
                />
              </div>

              <div className="md:pl-[5rem] pl-3 flex flex-col justify-between pb-1">
                <div>
                  <div className="flex">
                    <div className="pr-2">Novel</div>
                    <div>
                      {loadingNovelLike ? (
                        <div>
                          <CircularProgress size={20} />
                        </div>
                      ) : likeNovelReduxData?.filter(
                          (data) => data == detailData?._id
                        ).length > 0 ? (
                        <FavoriteIcon
                          onClick={() => novelLike(detailData?._id)}
                          className="text-red-600 cursor-pointer"
                        />
                      ) : (
                        <FavoriteBorderIcon
                          className="cursor-pointer"
                          onClick={() => novelLike(detailData?._id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="md:hidden block py-3 text-2xl font-semibold">
                    {detailData?.title?.length > 48
                      ? `${detailData?.title?.slice(0, 48)}..`
                      : detailData?.title}
                  </div>
                  <div className="hidden md:block py-3 text-4xl font-semibold">
                    {detailData?.title}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex">
                      <FilterVintageIcon titleAccess="genre" />
                      <div className="pl-1">{detailData?.genre}</div>
                    </div>
                    <div className="flex">
                      <FormatListBulletedIcon titleAccess="chapters" />
                      <span>
                        {detailData?.chapter?.length > 0 &&
                          detailData?.chapter?.length}
                      </span>
                      <div className="pl-1">Chapters</div>
                    </div>
                    <div className="flex">
                      {detailData?.novelStatus == "OnGoing" ? (
                        <PublishedWithChangesIcon titleAccess="novel status" />
                      ) : (
                        <RestoreIcon titleAccess="novel status" />
                      )}
                      <div className="pl-1">{detailData?.novelStatus}</div>
                    </div>
                  </div>
                  <div className="py-3 flex justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <RemoveRedEyeOutlinedIcon titleAccess="view" />
                        <span className="pl-1">
                          {detailData?.views + 21 * 2}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <ThumbUpOffAltIcon titleAccess="like" />
                        <span className="pl-1">
                          {detailData?.likes?.length}
                        </span>
                      </div>
                      {loadingBookmark ? (
                        <div>
                          <CircularProgress size={20} />
                        </div>
                      ) : bookmarkData.filter(
                          (data) => data?.novelId == detailData?._id
                        ).length > 0 ? (
                        <BookmarkAddedIcon
                          onClick={() => {
                            novelBookmark(detailData?._id);
                          }}
                          titleAccess="Remove bookmark"
                          className="text-blue-500 cursor-pointer text-2xl"
                        />
                      ) : (
                        <BookmarkAddIcon
                          onClick={() => novelBookmark(detailData?._id)}
                          titleAccess="save bookmark"
                          className="text-white cursor-pointer text-2xl"
                        />
                      )}
                      <div className="flex">
                        <MilitaryTechIcon
                          titleAccess={
                            pathname?.slice(8, 12) === "view"
                              ? "Rank by view"
                              : pathname?.slice(8, 12) === "coin"
                              ? "Rank by coin"
                              : "Rank by bookmark"
                          }
                        />

                        <span className="pl-1">
                          {pathname?.slice(8, 12) == "view"
                            ? detailData?.novelRank
                            : pathname?.slice(8, 12) == "coin"
                            ? detailData?.coinRank
                            : detailData?.bookmarkRank}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    prefetch
                    href={{
                      pathname: `/authorProfile/${detailData?.authorId?._id}`,
                    }}
                    className="flex gap-2 items-center w-max cursor-pointer"
                  >
                    <div>Author :</div>
                    {detailData?.authorId?.role?.name === "admin" ? (
                      <div className="pl-1">
                        {detailData?.OriginalNovelAuthor
                          ? detailData?.OriginalNovelAuthor
                          : detailData?.authorId?.name}
                      </div>
                    ) : (
                      <div className="pl-1">
                        {detailData?.authorId?.pseudonym !== null &&
                        detailData?.authorId?.pseudonym !== "null"
                          ? detailData?.authorId?.pseudonym
                          : detailData?.authorId?.name
                          ? detailData?.authorId?.name
                          : " - - -"}
                      </div>
                    )}
                  </Link>
                  {detailData?.TranslateNovelAuthor && (
                    <div className="flex gap-2 items-center pt-1">
                      <div>Translator :</div>
                      <div className="pl-1">
                        {detailData?.TranslateNovelAuthor
                          ? detailData?.TranslateNovelAuthor
                          : " - - -"}
                      </div>
                    </div>
                  )}
                  <div className="py-3 flex items-center">
                    {/* <Rating size='small' name="read-only" value={detailData?.totalRaters !== null && detailData?.totalRaters} readOnly /> */}
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
                        value={detailData?.totalRating}
                        readOnly
                        className="flex"
                      />
                      {detailData?.totalRating > 0 && (
                        <div className="text-xs pl-1 pt-1">{`(${detailData?.totalRating})`}</div>
                      )}
                    </div>
                  </div>
                </div>

                {detailData?.chapter?.length > 0 &&
                  (detailData?.readingStatus?.length > 0 ? (
                    <Link
                      href={{
                        pathname: Array.isArray(currentChapterStatus)
                          ? `/chapter/${currentChapterStatus[0]?.chapterId}`
                          : `/chapter/${currentChapterStatus?._id}`,
                      }}
                      prefetch
                    >
                      <button className="border px-14 py-2 slideBtn sliderRight">
                        CONTINUE READING
                      </button>
                    </Link>
                  ) : (
                    <Link
                      href={{
                        pathname: `/chapter/${
                          detailData?.chapter[detailData?.chapter.length - 1]
                            ?._id
                        }`,
                      }}
                      prefetch
                    >
                      <button className="border px-14 py-2 slideBtn sliderRight">
                        START READING
                      </button>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-white lg:mx-20 md:mx-10 mx-6 relative md:-top-44 -top-36 md:p-4 p-2 dark:bg-[#131415]">
            <div className="flex text-2xl gap-x-9 md:gap-x-20 border-gray-300 border-b">
              <div
                id="About"
                onClick={() => setTab("About")}
                className={`hover:border-b-2 hover:border-[#20A7FE] ${
                  tab === "About"
                    ? "cursor-pointer border-b-2 border-[#20A7FE] font-semibold"
                    : "cursor-pointer"
                }`}
              >
                About
              </div>
              <div
                id="Chapter"
                onClick={() => setTab("Chapter")}
                className={`hover:border-b-2 hover:border-[#20A7FE] ${
                  tab === "Chapter"
                    ? "cursor-pointer border-b-2 border-[#20A7FE] font-semibold"
                    : "cursor-pointer"
                }`}
              >
                Chapters
              </div>
              <div
                id="Tier"
                onClick={() => setTab("Tier")}
                className={`hover:border-b-2 hover:border-[#20A7FE] ${
                  tab === "Tier"
                    ? "cursor-pointer border-b-2 border-[#20A7FE] font-semibold"
                    : "cursor-pointer"
                }`}
              >
                Noble
              </div>
            </div>

            {tab == "About" ? (
              <AboutTab
                detailData={detailData}
                page={page}
                setPage={setPage}
                relatedNovel={relatedNovel}
                modelLogin={modelLogin}
                setModelLogin={setModelLogin}
              />
            ) : tab == "Chapter" ? (
              <ChapterTab
                detailData={detailData}
                novelDetailData={novelDetailData}
              />
            ) : (
              tab == "Tier" && (
                <TierTab
                  detailData={detailData}
                  localStorageToken={localStorageToken}
                  setModelLogin={setModelLogin}
                  setSelectCoinData={setSelectCoinData}
                  handleOpen={handleOpen}
                  upgradeTierDataApi={upgradeTierDataApi}
                  setUpdatTiereButton={setUpdatTiereButton}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex justify-center text-lg flex-col items-center">
          {/* <CircularProgress className="mb-4 mt-10" /> */}
          <Image src={loader} alt="" height={1000} width={1000} className="h-20 w-20" />
        </div>
      )}
    </>
  );
}

export default Home;
