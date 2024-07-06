'use client'
import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function page() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faqData = [
        {
            question: "What is jade scroll?",
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            panel: "panel1"
        },
        {
            question: "How can jade scroll help us?",
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            panel: "panel1",
        },
        {
            question: "How jade scroll is different from multiple platforms?",
            detail: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            panel: "panel1",
        }
    ]

    return (
        <div className='pt-20'>
            <div className='text-2xl text-center pb-5 pt-3'>FAQ Page</div>
            <div className='px-6 fontFamilyMui pb-3'>
                {faqData?.map((item, index) => {
                    return (
                        <Accordion expanded={expanded === item?.panel} onChange={handleChange(item?.panel)} sx={{ p: "16px 28px", background: "#ededed" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"

                            >
                                <Typography className='textBlack font-semibold'>{item?.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {item?.detail}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}

export default page