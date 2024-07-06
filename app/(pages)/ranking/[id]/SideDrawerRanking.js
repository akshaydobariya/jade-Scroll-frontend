import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

function SideDrawerRanking(props) {
    const {
        genderLead,
        genderLeadData,
        rankingTab,
        rankingByViews,
        rankingByCoins,
        rankingByBookmark,
        contentTypeValue,
        setContentTypeValue,
        contentFeaturedValue,
        setNovelByGenreValue,
        novelByGenreValue,
        timeFilter,
        setContentFeaturedValue,
        novelGenreData,
        contentTypeData,
        contentFeatureData,
        setGenderLead
    } = props;

    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <div className='text-lg font-semibold text-gray-700 dark:text-gray-100'>Filters</div>
            <div className='mt-2'>
                <div className='flex justify-between text-sm'>
                    {genderLeadData?.map((item, index) => {
                        return (
                            <div key={index} onClick={() => {
                                if (rankingTab == 'views') {
                                    rankingByViews(novelByGenreValue, contentTypeValue, contentFeaturedValue, timeFilter, item?.name)
                                } else if (rankingTab == 'coins') {
                                    rankingByCoins(novelByGenreValue, contentTypeValue, contentFeaturedValue, timeFilter, item?.name)
                                } else {
                                    rankingByBookmark(novelByGenreValue, contentTypeValue, contentFeaturedValue, timeFilter, item?.name)
                                }
                                setGenderLead(item?.name)
                            }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "bg-gray-100 dark:bg-gray-900 dark:text-white"}`}>{item?.name}</div>
                        )
                    })}
                </div>

                <div className='flex flex-col gap-y-2 pt-2 pb-2'>
                    {novelByGenreValue &&
                        <div className='flex'>
                            <div>Novel By Genre</div>
                            <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                                <div className='pr-1'>{novelByGenreValue}</div>
                                <CloseIcon onClick={() => {
                                    setNovelByGenreValue('')
                                    rankingByViews('', contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                                }} className='text-sm cursor-pointer' />
                            </div>
                        </div>
                    }

                    {contentTypeValue &&
                        <div className='flex'>
                            <div>Content Type</div>
                            <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                                <div className='pr-1'>{contentTypeValue}</div>
                                <CloseIcon onClick={() => {
                                    setContentTypeValue('')
                                    rankingByViews(novelByGenreValue, '', contentFeaturedValue, timeFilter, genderLead)
                                }} className='text-sm cursor-pointer' />
                            </div>
                        </div>}

                    {contentFeaturedValue &&
                        <div className='flex'>
                            <div>Content Status</div>
                            <div className='ml-2 text-xs border px-2 py-1 bg-gray-100 dark:bg-gray-800 flex items-center'>
                                <div className='pr-1'>{contentFeaturedValue}</div>
                                <CloseIcon onClick={() => {
                                    setContentFeaturedValue('')
                                    rankingByViews(novelByGenreValue, contentTypeValue, '', timeFilter, genderLead)
                                }} className='text-sm cursor-pointer' />
                            </div>
                        </div>
                    }
                </div>

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='dark:bg-[#202020]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>Novel By Genre</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] border-t-white border-t'>
                        <div className='flex flex-wrap text-center gap-2 text-[13px] overflow-hidden'>
                            {novelGenreData?.data?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        if (rankingTab == 'views') {
                                            rankingByViews(item?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                                        } else if (rankingTab == 'coins') {
                                            rankingByCoins(item?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                                        } else {
                                            rankingByBookmark(item?.name, contentTypeValue, contentFeaturedValue, timeFilter, genderLead)
                                        }
                                        setNovelByGenreValue(item?.name)
                                    }}
                                        className={`px-2 cursor-pointer h-max rounded-md py-1 overflow-hidden ${novelByGenreValue === item?.name ? 'bg-gray-900 text-white hover:border-0' :
                                            'bg-white dark:bg-[#131415] dark:text-white hover:bg-gray-900 hover:text-white hover:border-0 '}`}
                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='dark:bg-[#202020]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>
                            Content Type
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] border-t-white border-t'>
                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                            {contentTypeData?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        if (rankingTab == 'views') {
                                            rankingByViews(novelByGenreValue, item?.value, contentFeaturedValue, timeFilter, genderLead)
                                        } else if (rankingTab == 'coins') {
                                            rankingByCoins(novelByGenreValue, item?.value, contentFeaturedValue, timeFilter, genderLead)
                                        } else {
                                            rankingByBookmark(novelByGenreValue, item?.value, contentFeaturedValue, timeFilter, genderLead)
                                        }
                                        setContentTypeValue(item?.value)
                                    }} className={`cursor-pointer rounded-md py-1 ${contentTypeValue === item?.value ? 'bg-gray-900 text-white hover:border-0' :
                                        'hover:bg-gray-900 hover:text-white bg-white hover:border-0 dark:bg-[#131415] dark:text-white'}`}
                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='dark:bg-[#202020]'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>
                            Content Status
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] border-t-white border-t'>
                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                            {contentFeatureData?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        if (rankingTab == 'views') {
                                            rankingByViews(novelByGenreValue, contentTypeValue, item?.value, timeFilter, genderLead)
                                        } else if (rankingTab == 'coins') {
                                            rankingByCoins(novelByGenreValue, contentTypeValue, item?.value, timeFilter, genderLead)
                                        } else {
                                            rankingByBookmark(novelByGenreValue, contentTypeValue, item?.value, timeFilter, genderLead)
                                        }
                                        setContentFeaturedValue(item?.value)
                                    }} className={`cursor-pointer rounded-md py-1 ${contentFeaturedValue === item?.value ? 'bg-gray-900 text-white hover:border-0' :
                                        'bg-white hover:bg-gray-800 hover:text-white hover:border-0 dark:bg-[#131415] dark:text-white'}`}
                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default SideDrawerRanking