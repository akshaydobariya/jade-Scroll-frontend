'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NOTIFICATION_BOOKMARK } from '@/app/Redux/slice/userSlice';
import useApiService from '@/services/ApiService';
import { Switch } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Home() {
    const { allNotificationBookmark } = useApiService()
    const dispatch = useDispatch()
    const notificationButton = useSelector((state) => state?.user?.notificationBookmark)
    

    const handleNotification = (data) => {
        allNotificationBookmark(data).then((res) => {
            if (res?.data?.message == "You have turned off bookmark novels notifications.") {
                dispatch(NOTIFICATION_BOOKMARK(false))
            } else {
                dispatch(NOTIFICATION_BOOKMARK(true))
            }
            toast.success(res?.data?.message)
        }).catch((er) => {
            console.log(er, "er")
        })
    }

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                newestOnTop={false}
                stacked
            />
            <div className='md:max-w-full xl:min-h-[450px] m-auto pt-24 sm:px-24 h-[100vh]'>
                <div className='text-3xl text-center items-center font-semibold w-full flex sm:justify-start md:justify-center justify-center mx-auto my-0 pb-1 sm:px-0 px-10'>General Settings</div>
                {/* <div className='pt-4 px-10'>
                    <div className='pb-1'>Delete My Account</div>
                    <div className='text-sm text-gray-600 dark:text-gray-200'>If you delete your account, you will lose access to all associated bookmarks, purchases, and settings. Account deletion is irreversible.</div>
                    <button className='border px-10 py-1 bg-red-600 rounded-md mt-4 text-white'>Delete account</button>
                </div> */}

                {/* <div className='py-8'>
                        <div className='text-2xl border-b font-semibold pb-1'>Web Notification Settings</div>
                        <div className='flex justify-between pt-3'>
                            <div>
                                <div>Unlock Updates</div>
                                <div>Receive notification when chapters are ready to be unlocked</div>
                            </div>
                            <Switch {...label} defaultChecked onChange={(e) => handleNotification(e.target.checked)} />
                        </div>
                    </div> */}

                <div className='pt-12 pl-3 pr-3 md:pl-2 md:pr-10'>
                    <div className='text-2xl border-b font-semibold pb-1'>Push Notification Settings</div>
                    <div className='flex justify-between pt-3'>
                        <div>
                            <div>Chapter Updates</div>
                            <div>Receive notification when chapters of bookmarked series are published</div>
                        </div>
                        <Switch {...label}   id={'notifcationname'} checked={notificationButton}  inputProps={{ 'aria-label': 'controlled' }} onChange={(e) => handleNotification(e.target.checked)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home