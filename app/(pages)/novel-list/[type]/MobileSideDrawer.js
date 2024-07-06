import { Box } from '@mui/material';
import React from 'react'
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

function MobileSideDrawer(props) {
    const {
        novelByGenreValue,
        filterApi,
        setGenderLead,
        sotingName,
        contentFeatureData,
        contentTypeData,
        novelGenreData,
        contentFeaturedValue,
        contentTypeValue,
        genderLead,
        genderLeadData,
        setPage,
        setNovelByGenreValue,
        setContentTypeValue,
        setContentFeaturedValue,
        handleDrawerToggle,
    } = props;

    const theme = useTheme();

    return (
        <div className='pt-3 dark:bg-gray-800 h-full dark:text-gray-100 xl:hidden block'>
            <Box className='flex justify-between items-center'>
                <div className='pl-2'>Filter</div>
                <IconButton onClick={handleDrawerToggle} className='dark:text-white'>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
            <Divider />
            <div className='flex justify-between text-sm px-3 mt-2'>
                {genderLeadData?.map((item, index) => {
                    return (
                        <div key={index} onClick={() => {
                            filterApi(novelByGenreValue, contentTypeValue, contentFeaturedValue, item?.name, sotingName, '1')
                            setGenderLead(item?.name)
                        }} className={`text-black cursor-pointer border w-full text-center py-2 ${genderLead == item?.name ? 'bg-blue-700 text-white' : "dark:text-white  bg-gray-100 dark:bg-[#131415]"}`}>{item?.name}</div>
                    )
                })}
            </div>

            <div className='flex flex-col gap-y-2 pt-2 pb-2 pl-2'>
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

            <div className='text-lg font-semibold pl-2 pt-2'>Novel By Genre :</div>
            <div className='flex flex-wrap gap-2 mt-2 px-4 pb-3'>
                {novelGenreData?.data?.map((text, index) => (
                    <div key={index} className='text-center'>
                        <div onClick={() => {
                            setNovelByGenreValue(text?.name)
                            filterApi(text?.name, contentTypeValue, contentFeaturedValue, genderLead, sotingName, '1')
                            setPage(1)
                        }} className={novelByGenreValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
                            'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text?.name}</div>
                    </div>
                ))}
            </div>
            <Divider />

            <div className='text-lg font-semibold pl-2 pt-2'>Content Type :</div>
            <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                {contentTypeData?.map((text, index) => (
                    <div key={index} className='text-center'>
                        <div onClick={() => {
                            setContentTypeValue(text?.name)
                            filterApi(novelByGenreValue, text?.name, contentFeaturedValue, genderLead, sotingName, '1')
                            setPage(1)
                        }} className={contentTypeValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
                            'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                    </div>
                ))}
            </div>
            <Divider />

            <div className='text-lg font-semibold pl-2 pt-2'>Content Featured :</div>
            <div className='grid grid-cols-3 gap-2 mt-2 px-4 pb-3'>
                {contentFeatureData?.map((text, index) => (
                    <div key={index} className='text-center'>
                        <div onClick={() => {
                            setContentFeaturedValue(text?.name)
                            filterApi(novelByGenreValue, contentTypeValue, text?.value, genderLead, sotingName, '1')
                            setPage(1)
                        }} className={contentFeaturedValue === text?.name ? 'cursor-pointer rounded-md px-2 text-sm py-1 bg-gray-900 text-white' :
                            'border border-gray-900 cursor-pointer rounded-md px-2 text-sm py-1 hover:bg-gray-800 hover:text-white hover:border-0'}>{text.name}</div>
                    </div>
                ))}
            </div>
            <Divider />
        </div>
    )
}

export default MobileSideDrawer