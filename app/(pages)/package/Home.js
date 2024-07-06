"use client";
import Image from "next/image";
import multicoin from "../../../public/assets/Images/coin.png";
import { useState } from "react";
import useApiService from "@/services/ApiService";
import paypalIcon from "../../../public/assets/Images/paypal.png";
import { Box, CircularProgress, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { COIN_HISTORY } from "@/app/Redux/slice/userSlice";
import LoginBox from "@/components/LoginBox";
import FaqPackage from "./FaqPackage";
import NobleTab from "./NobleTab";
import CoinTab from "./CoinTab";
import razorpayIcon from "../../../public/assets/Images/razorpay.png";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/navigation";
import AppConfig from "@/appConfig";

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
  const [tab, setTab] = useState("Coins");
  const { paymentApi, accesssToken } = useApiService();
  const [selectCoinData, setSelectCoinData] = useState();
  const [loadingCoin, setCoinLoading] = useState(false);
  const dispatch = useDispatch();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedOption, setSelectedOption] = useState("paypal");
  const [Razorpay] = useRazorpay();
  const router = useRouter();
  const currency = AppConfig.currency;

  const coinBuy = (data) => {
    setCoinLoading(true);
    const tierBody = {
      items: [
        {
          packageId: data?._id,
          type: "COIN",
        },
      ],
      discountId: null,
      description: "",
      paymentMode: selectedOption,
    };
    paymentApi(tierBody)
      .then((res) => {
        //alert(res?.data?.data?.url);
        if (typeof window !== "undefined" && selectedOption === "paypal") {
          window.open(res?.data?.data?.url, "_blank");
        } else if (selectedOption === "razorpay") {
          handleRazorpayPayment(res.data.data);
        }
        setCoinLoading(false);
        setOpen(false);
        accessTokenApi();
      })
      .catch((er) => {
        console.log(er);
      }).finally(()=>{
        setCoinLoading(false)
      });
  };

  const accessTokenApi = () => {
    accesssToken()
      .then((res) => {
        dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins));
      })
      .catch((er) => {});
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

  return (
    <div className="py-10 pt-16 w-full mx-auto my-4 flex flex-col items-center bg-white dark:bg-[#202020] shadow-md">
      <Modal
        open={open}
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
              Get more JadeCoin
            </div>
            <div>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => handleClose()}
              />
            </div>
          </div>
          <div className="rounded-md w-fit flex mx-auto my-0 px-10 bg-gray-800 dark:bg-[#131415] mt-2 dark:text-white shadow-[0_0_6px_1px_#101010]">
            <div className="text-white font-semibold border-white pb-1 pt-1 dark:text-gray-200 dark:border-gray-800">
              <div className="flex justify-center gap-3">
                <Image src={multicoin} alt="coin" className="h-24 w-24" />
                {/*    <div>{item?.coins}</div> */}
              </div>
              <div className="text-center">
                {currency} {selectCoinData?.price}
              </div>
              <div className="pt-2 pb-1 text-center">
                {selectCoinData?.coins} Jade coins
              </div>
            </div>
          </div>
          <div className="px-10">
            <div className="pt-3">Payment Method</div>
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

            <div className="text-sm pt-4 dark:text-gray-200 text-slate-500">
              <span className="text-red-500 text-lg">*</span>Secure checkout
              experience provided by PayPal. No payment method information is
              stored on JadeScrolls.
            </div>
            <div className="flex justify-center pt-3">
              {loadingCoin ? (
                <div className="border px-8 rounded-full py-1 bg-blue-600">
                  <CircularProgress size={20} color="secondary" />
                </div>
              ) : (
                <button
                  onClick={() => coinBuy(selectCoinData)}
                  className="border px-8 rounded-full bg-blue-600 text-white py-1"
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
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
              onClick={handleLoginModalClose}
            />
          </div>
          <LoginBox />
        </Box>
      </Modal>

      <div className="flex justify-center text-2xl gap-x-20  py-1 md:py-3 px-3 lg:px-20  ">
        <div
          onClick={() => setTab("Coins")}
          className={
            tab === "Coins"
              ? "cursor-pointer border-b-2 border-blue-700 font-semibold"
              : "cursor-pointer"
          }
        >
          COINS
        </div>
        <div
          onClick={() => setTab("Tiers")}
          className={
            tab === "Tiers"
              ? "cursor-pointer border-b-2 border-blue-700 font-semibold"
              : "cursor-pointer"
          }
        >
          NOBLE
        </div>
        <div
          onClick={() => setTab("Faq")}
          className={
            tab === "Faq"
              ? "cursor-pointer border-b-2 border-blue-700 font-semibold"
              : "cursor-pointer"
          }
        >
          FAQ
        </div>
      </div>
      <hr className="bg-gray-700 w-full" />

      {tab == "Coins" && (
        <CoinTab
          handleOpen={handleOpen}
          handleLoginModalOpen={handleLoginModalOpen}
          selectCoinData={selectCoinData}
          setSelectCoinData={setSelectCoinData}
        />
      )}

      {tab == "Tiers" && <NobleTab />}

      {tab == "Faq" && <FaqPackage />}
    </div>
  );
}

export default Home;
