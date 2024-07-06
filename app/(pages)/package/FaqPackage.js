import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import useApiService from "@/services/ApiService";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import loader from "../../../public/assets/loader/loader.gif";
import Image from "next/image";

function FaqPackage() {
  const { cms } = useApiService();
  const [faqData, setFaqData] = useState();

  useEffect(() => {
    cms("faq")
      .then((res) => {
        setFaqData(res?.data?.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div className="dark:pt-1 pt-10 pb-56 w-full">
      {faqData ? (
        <div className="md:px-20 mx-5 md:mx-10 py-10 bg-slate-200 dark:bg-gray-950 px-4 rounded-lg">
          {faqData?.map((item, index) => {
            return (
              <Accordion
                key={index}
                className="dark:bg-[#131415] dark:text-white"
                sx={{ margin: "10px 0", padding: "4px" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="dark:text-white" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex items-center gap-2">
                    <Typography className="border border-black dark:border-white px-4 mr-3 rounded-md py-2">
                      {index + 1}
                    </Typography>
                    <Typography className="font-semibold ml-2">
                      {item?.title}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ borderTop: "1px solid gray" }}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></AccordionDetails>
              </Accordion>
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
    </div>
  );
}

export default FaqPackage;
