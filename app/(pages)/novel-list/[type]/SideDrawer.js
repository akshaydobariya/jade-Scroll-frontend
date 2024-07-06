import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

function SideDrawer(props) {
    const { setContentFeaturedValue, setContentTypeValue, sotingName, contentFeatureData, contentTypeData, novelGenreData, contentFeaturedValue, contentTypeValue, filterApi, setGenderLead, setPage, setNovelByGenreValue, novelByGenreValue, genderLeadData, genderLead } = props;
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <div className='text-lg font-semibold text-gray-700 dark:text-gray-200'>Filters</div>
            <div className='mt-2'>
                <div className='flex justify-between text-sm'>
                    {genderLeadData?.map((item, index) => {
                        return (
                            <div key={index} onClick={() => {
                                filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, sotingName, '1')
                                setGenderLead(item?.name)
                                setPage(1)
                            }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "dark:text-white  bg-gray-100 dark:bg-[#131415]"}`}>{item?.name}</div>
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
                                    filterApi('', contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                                    setPage(1)
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
                                    filterApi(novelByGenreValue, '', contentFeaturedValue, genderLead, sotingName, '1')
                                    setPage(1)
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
                                    filterApi(novelByGenreValue, contentTypeValue, '', genderLead, sotingName, '1')
                                    setPage(1)
                                }} className='text-sm cursor-pointer' />
                            </div>
                        </div>
                    }
                </div>

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='dark:bg-[#202020] dark:text-white '>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ color: 'text.secondary' }} className='dark:text-gray-100 text-gray-800 font-semibold'>Novel By Genre</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='bg-[#F2F2F2] dark:bg-[#202020] border-t'>
                        <div className='flex flex-wrap text-center gap-1 text-[13px]'>
                            {novelGenreData?.data?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        filterApi(item?.name, contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                                        setNovelByGenreValue(item?.name)
                                        // setPage(1)
                                    }}
                                        className={`px-3 break-words h-max cursor-pointer hover:bg-gray-950 rounded-md py-1 hover:border-0
                                                         ${novelByGenreValue === item?.name ? 'bg-gray-900 text-white dark:bg-gray-700' : 'bg-white dark:bg-[#131415] hover:text-white'}`}
                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='dark:bg-[#202020] dark:text-white'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-100 font-semibold'>
                            Content Type
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] dark:border-t'>
                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                            {contentTypeData?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        setContentTypeValue(item?.name)
                                        filterApi(novelByGenreValue, item?.name, contentFeaturedValue, genderLead, sotingName, '1')
                                        setPage(1)
                                    }} className={`cursor-pointer hover:bg-gray-950 h-max rounded-md py-1 hover:border-0
                                                     ${contentTypeValue === item?.name ? 'bg-gray-900 text-white dark:bg-gray-700' : 'bg-white dark:bg-[#131415] hover:text-white'}`}
                                        style={{ boxShadow: "0px 0px 3px 0px #d7cdcd" }}>{item?.name}</div>
                                )
                            })}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='dark:bg-[#202020] dark:text-white'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className='dark:text-white' />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ color: 'text.secondary' }} className='text-gray-800 dark:text-gray-200 font-semibold'>
                            Content Status
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails className='bg-gray-100 dark:bg-[#202020] dark:border-t'>
                        {/* <div className='flex justify-center mb-3'>
                                        <input onChange={handleChange} type='search' placeholder='Search Novel by genre..' className='border border-gray-500 focus:outline-none px-4 text-sm py-1 rounded-full' />
                                    </div> */}
                        <div className='grid grid-cols-3 text-center gap-2 text-sm'>
                            {contentFeatureData?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        setContentFeaturedValue(item?.name)
                                        filterApi(novelByGenreValue, contentTypeValue, item?.value, genderLead, sotingName, '1')
                                        setPage(1)
                                    }} className={`cursor-pointer hover:bg-gray-950 h-max rounded-md py-1 hover:border-0
                                                     ${contentFeaturedValue === item?.name ? 'bg-gray-900 dark:bg-gray-700 text-white hover:border-0' :
                                            ' hover:bg-gray-900 hover:text-white hover:border-0 dark:bg-[#131415]'}`}
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

export default SideDrawer