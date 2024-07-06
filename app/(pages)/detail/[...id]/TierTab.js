import Image from "next/image";
import React from "react";
import nobleBanner from "../../../../public/assets/Images/noblePageBanner.jpg";
import MobilenoblePageBanner from "../../../../public/assets/Images/MobilenoblePageBanner.jpg";
import moment from "moment";
import premiumIcon from "../../../../public/assets/Images/PackagePage/crown.png";
import AppConfig from "@/appConfig";

function TierTab(props) {
  const {
    detailData,
    localStorageToken,
    setModelLogin,
    setSelectCoinData,
    handleOpen,
    upgradeTierDataApi,
    setUpdatTiereButton,
  } = props;

  const currecy = AppConfig.currency;
  return (
    <div>
      {detailData?.subscription?.length == 0 ? (
        <div className="text-center pt-7 pb-3">No Noble Available !</div>
      ) : (
        <div className="pb-10 pt-1 mt-2">
          <div className="hidden md:block">
            <Image
              src={nobleBanner}
              className="w-full h-full"
              height={500}
              width={500}
              alt="nobleBanner"
            />
          </div>
          <div className="block md:hidden">
            <Image
              src={MobilenoblePageBanner}
              className="w-full h-full"
              height={500}
              width={500}
              alt="nobleBanner"
            />
          </div>

          {detailData?.subscription.length > 0 &&
            detailData?.subscription[0] !== "" && (
              <div
                id="premiumPlan"
                className="dark:bg-[#121212] px-5 lg:px-20 text-white pb-12 pt-10 mt-6"
              >
                <div className="text-center text-3xl pb-6 text-black dark:text-white">
                  All Premium Plans
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {detailData?.subscription.map((item, i) => {
                    const purchaseTier = detailData?.isPurchasedTier?.find(
                      (data) => data?.tierId == item?._id
                    );

                    let previousTierTime =
                      detailData &&
                      detailData?.isPurchasedTier &&
                      detailData?.isPurchasedTier[
                        detailData?.isPurchasedTier?.length - 1
                      ];

                    let endDateTier = moment(previousTierTime?.endDate).format(
                      "YYYY-MM-DD"
                    );

                    function dateDiffInDays(date1, date2) {
                      const a = moment(date1);
                      const b = moment(date2);
                      return b.diff(a, "days");
                    }

                    // Example usage:
                    const date1 = new Date();
                    const date2 = previousTierTime?.endDate;
                    const diffInDays = dateDiffInDays(date1, date2);

                    let nextItems = [];

                    if (detailData && detailData?.isPurchasedTier) {
                      for (const purchasedTier of detailData?.isPurchasedTier) {
                        const purchasedTierIndex =
                          detailData?.subscription.findIndex(
                            (item) => item._id === purchasedTier.tierId
                          );

                        if (
                          purchasedTierIndex !== -1 &&
                          purchasedTierIndex < detailData?.subscription.length
                        ) {
                          const itemsAfterPurchasedTier =
                            detailData?.subscription.slice(
                              0,
                              purchasedTierIndex + 1
                            );

                          nextItems = nextItems.concat(itemsAfterPurchasedTier);
                        } else {
                          // console.log(`Purchased tier with ID ${purchasedTier.tierId}.`);
                        }
                      }
                    }
                    let updateDataItem = nextItems?.find(
                      (updateData) => updateData?._id == item?._id
                    );

                    // let nextItems = [];
                    // let maxPurchasedTierIndex = -1; // Initialize maxPurchasedTierIndex with a default value

                    // if (detailData && detailData?.isPurchasedTier) {
                    //   for (const purchasedTier of detailData?.isPurchasedTier) {
                    //     const purchasedTierIndex = detailData?.subscription.findIndex(item => item._id === purchasedTier.tierId);

                    //     // Update maxPurchasedTierIndex if necessary
                    //     if (purchasedTierIndex > maxPurchasedTierIndex) {
                    //       maxPurchasedTierIndex = purchasedTierIndex;
                    //     }

                    //     console.log(maxPurchasedTierIndex, "maxPurchasedTierIndex"); // Log maxPurchasedTierIndex inside the loop

                    //     // Check the condition and execute the block inside the loop
                    //     if (maxPurchasedTierIndex !== -1 && maxPurchasedTierIndex < detailData?.subscription.length - 1) {
                    //       // Extract items after the maximum purchasedTierIndex
                    //       const itemsAfterMaxPurchasedTier = detailData?.subscription.slice(0, maxPurchasedTierIndex + 1);
                    //       console.log(itemsAfterMaxPurchasedTier, "itemsAfterMaxPurchasedTier");

                    //       // Concatenate extracted items with nextItems
                    //       nextItems = nextItems.concat(itemsAfterMaxPurchasedTier);
                    //       console.log(nextItems, "nextItems");
                    //     }
                    //   }
                    // }

                    // let updateDataItem = nextItems?.find((updateData) => updateData?._id == item?._id);

                    return (
                      <div
                        key={i}
                        className="bg-[#242424] border p-4 rounded-md flex flex-col justify-between"
                      >
                        <div>
                          <div className="border-b border-gray-400 pb-6">
                            <div className="flex">
                              <Image
                                src={premiumIcon}
                                alt="premium"
                                className="w-5 h-5"
                              />
                              <div className="pl-2">{item?.tierNo}</div>
                            </div>
                            {/* <div className={`text-2xl font-semibold py-2 ${i == 0 ? 'text-[#CFF56A]' : i == 1 ? 'text-[#FFD2D7]' : i == 2 ? 'text-[#C4B1D4]' : 'text-[#FFC862]'}`}>{item?.tierName}</div> */}
                            <div className="text-2xl font-semibold py-2 text-blue-500">
                              {item?.tierName}
                            </div>
                            <div>
                              All Free Chapter +{" "}
                              {item?.toChapter - item?.fromChapter + 1} Advance
                            </div>
                            <div className="py-1">
                              Validity: {item?.purchaseValidityInDays} days
                            </div>

                            {previousTierTime?.tierId === item?._id && (
                              <div className="pt-1 pb-2">
                                Expiry Date:{" "}
                                {moment(previousTierTime?.endDate).format(
                                  "DD-MM-YYYY"
                                )}
                              </div>
                            )}
                            <div className="">
                              Chapters: {item?.fromChapter} to {item?.toChapter}
                            </div>
                          </div>
                          <div className="pt-6">{item?.tierDescription}</div>
                        </div>
                        {purchaseTier?.tierId == item?._id ? (
                          <button
                            disabled
                            className={`w-full rounded-full py-3 mt-7 text-black bg-yellow-500`}
                          >
                            Purchased
                          </button>
                        ) : (
                          <div className="">
                            {updateDataItem?._id == item?._id &&
                            diffInDays > 15 ? (
                              <button
                                onClick={() => {
                                  if (!localStorageToken) {
                                    setModelLogin(true);
                                  } else {
                                    upgradeTierDataApi(item);
                                    setSelectCoinData(item);
                                    handleOpen();
                                    setUpdatTiereButton(true);
                                  }
                                }}
                                className="w-full rounded-full py-3 mt-4 font-semibold bg-blue-500 text-white"
                              >
                                Upgrade
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  if (!localStorageToken) {
                                    setModelLogin(true);
                                  } else {
                                    setSelectCoinData(item);
                                    handleOpen();
                                  }
                                }}
                                className="w-full rounded-full py-3 mt-7 font-semibold bg-blue-500 text-white"
                              >
                                Buy Now {currecy}{item?.price}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default TierTab;
