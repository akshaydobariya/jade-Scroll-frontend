"use client";
import { Manrope } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import useApiService from "@/services/ApiService";
import { usePathname, useSearchParams } from "next/navigation";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/services/Firebase/firebase";
import { Provider } from "react-redux";
import { Store } from "./Redux/store";
import NProgress from "nprogress";
import { v4 as uuidv4 } from "uuid";
import "nprogress/nprogress.css";
import AOS from "aos";
import ErrorBoundary from "./ErrorBoundary";
import loader from '../public/assets/loader/loader.gif'

const ubuntu = Manrope({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { notificationSubscribe } = useApiService();
  const [scoll, setScroll] = useState(null);
  const [scrollDirection, setScrollDirection] = useState("up");
  const path = usePathname();
  const searchParams = useSearchParams();

  const isSupported = () =>
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  const getFirebase = async () => {
    if ("Notification" in window) {
      const messaging =
        typeof window !== "undefined" ? getMessaging(firebaseApp) : null;

      Notification.requestPermission().then((permission) => {});
    }
  };

  useEffect(() => {
    AOS.init();
    const tabId = sessionStorage.getItem("tabId") || uuidv4();
    sessionStorage.setItem("tabId", tabId);

    //tawk to
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/66053081a0c6737bd125d55f/1hq24ausn";
    script.async = true;
    document.body.appendChild(script);

    if (localStorage.getItem("token")) {
      getFirebase();
      //alert(isSupported())
      if (isSupported()) {
        Notification.requestPermission().then((permission) => {
          // alert(permission)
          if (permission == "granted") {
            getToken(getMessaging(firebaseApp), {
              vapidKey:
                "BP5qFyl-WMUh1o7Db7NBaFHAxopp8XngKmuH8FbPSIiFvbqRPfeuTYIR03U878OXTyXNSIHM7-8rwxS38marR6I",
            })
              .then((currentToken) => {
                if (currentToken) {
                  localStorage.setItem("fcm_token", currentToken);
                  notificationSubscribe(currentToken)
                    .then((res) => {
                      console.log("subscribe");
                    })
                    .catch((er) => {
                      console.log(er, "Error Api");
                    });
                } else {
                  console.log("No token available firebase");
                }
              })
              .catch((er) => {
                console.log("Error Firebase--");
              });
          }
        });
      }
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setScroll(scrollY);

      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 0 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    let lastScrollY = window.scrollY || document.documentElement.scrollTop;

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", updateScrollDirection);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", updateScrollDirection);
      }
    };
  }, [scrollDirection]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    handleStop();

    return () => {
      handleStart();
    };
  }, [path, searchParams]);

  return (
    <html lang="en" id="body">
      <body
        className={`${ubuntu.className} dark:bg-[#202020] bg-[#fff] dark:text-gray-100`}
      >
        <ErrorBoundary>
          {scoll > 10 && (
            <div className="z-50 fixed lg:right-10 right-8 bottom-24 border-2 border-black rounded-full bg-gray-100 dark:bg-[#212121]">
              <KeyboardArrowUpIcon
                className="cursor-pointer"
                fontSize="large"
                onClick={() => {
                  if (typeof window !== "undefined")
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                }}
              />
            </div>
          )}

          <Provider store={Store}>
            {scrollDirection == "up" && (
              <header>{!path.includes("chapter") && <Header />}</header>
            )}

            <main>{children}</main>
          </Provider>

          <footer>
            <Footer />
          </footer>
        </ErrorBoundary>
      </body>
    </html>
  );
}
