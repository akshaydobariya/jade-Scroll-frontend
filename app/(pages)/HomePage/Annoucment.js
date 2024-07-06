'use client'
import useApiService from "@/services/ApiService";
import moment from "moment";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

const Modal = lazy(() => import("@mui/material/Modal"));
const Box = lazy(() => import("@mui/material/Box"));

function Annoucment() {
  const { getGeneralAnnoucment } = useApiService();
  const [annoucmentData, setAnnoucmentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [annoucmentFullData, setAnnoucmentFullData] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getGeneralAnnoucment();
        if (isMounted) {
          setAnnoucmentData(res?.data?.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching announcement data:", error);
        // Handle error gracefully, e.g., show a message to the user
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Prevent state update on unmounted component
    };
  }, []);

  const handleOpen = (content) => {
    setAnnoucmentFullData(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              width: "90%", // Adjust width as needed
              maxWidth: "600px", // Example of maximum width
              maxHeight: "200px", // Example of maximum height
            }}
          >
            <div className="text-xl font-semibold border-b-[1px] border-b-[#a6a6a6] pt-2 lg:pt-3 pb-2 px-4 sticky top-0 bg-gray-100 dark:bg-[#212121] rounded-t-[10px] flex justify-between">
              <div>Announcement</div>
              <div
                className="cursor-pointer font-bold rounded-full text-[16px]"
                onClick={handleClose}
              >
                X
              </div>
            </div>
            <div
              className="p-4 overflow-auto h-[300px] announcement-scroll dark:bg-[#5c5c5c] rounded-b-[10px]"
              dangerouslySetInnerHTML={{ __html: annoucmentFullData }}
            ></div>
          </Box>
        </Modal>

        {annoucmentData.length > 0 && (
          <div className="text-xl font-semibold pt-3 pb-2">Imperial Edict</div>
        )}
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          effect="coverflow"
          id="announcement"
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {annoucmentData.map((item, index) => (
            <SwiperSlide
              key={index}
              className="h-[135px] my-3 py-4 lg:py-6 px-6 bg-gray-100 dark:bg-[#202020] dark:text-white shadow-md border border-transparent hover:border hover:border-gray-400 cursor-pointer hover:shadow-md rounded-[1.75rem] gap-10"
            >
              <div className="font-semibold">{item?.title}</div>
              <div
                className="text-gray-700 dark:text-white text-sm"
                dangerouslySetInnerHTML={{
                  __html:
                    item?.content.length > 200
                      ? `${item?.content.slice(0, 200)}...`
                      : item?.content,
                }}
              ></div>
              <div className="text-end text-sm pt-1">
                {moment(item?.createdAt).format("DD MMM, YYYY")}
              </div>
              {item?.content?.length > 200 && (
                <span
                  className="cursor-pointer text-blue-500 flex items-end"
                  onClick={() => handleOpen(item.content)}
                >
                  more
                </span>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Suspense>
    </div>
  );
}

export default Annoucment;
