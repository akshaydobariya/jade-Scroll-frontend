'use client'
import React, { useState } from 'react'
import leftImage from '../../public/assets/Images/LoginPageImage.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useApiService from '@/services/ApiService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch } from 'react-redux'
import { BOOKMARK, COIN_HISTORY, LIKE_NOVEL, NOTIFICATION_BOOKMARK, THEME } from '../Redux/slice/userSlice'
import { CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link'

function LoginPage() {
    const router = useRouter()
    const { loginApi, verifyOtpApi, otpResetPassword, forgotPasswordApi } = useApiService()
    const [otpScreen, setOtpScreen] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [forgotPasswordError, setForgotPasswordError] = useState('')
    const [forgotError, setFogotPasswordError] = useState('')
    const [otpError, setOtpError] = useState('')
    const [forgotPassword, setForgotPassword] = useState(false)
    const [forgotPasswordOtp, setForgotPasswordOtp] = useState(false)
    const [resetPasswordInput, setResetPasswordInput] = useState(false)
    const dispatch = useDispatch()
    const [loadingButton, setLoadingButton] = useState(false)
    const [visible, setVisible] = useState(false);

    // const [forgotPasswordInput, setForgotPasswordInput] = useState()
    const [input, setInput] = useState({
        email: "",
        password: "",
        otp: "",
        forgotPasswordEmail: "",
        forgotPassword: "",
    })

    const [errors, setErrors] = useState({
        email: '',
        forgot_PasswordEmail: ''
    });

    const validateEmail = (email) => {
        // const regex =
        // /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = () => {
        setEmailError('');
        let isValid = true;
        const newErrors = {};

        // Email validation
        if (!validateEmail(input.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const userLogin = () => {
        if (input.email == '') {
            setEmailError('Email is required');
            setErrors({ email: "" })
        }
        if (input.password == '') {
            setPasswordError('Password is required');
        }

        const formData = new FormData();
        formData.append("email", input.email);
        formData.append("password", input.password);

        if (input.email !== "" && input.password !== "") {
            if (validateForm()) {
                setLoadingButton(true);
                loginApi(formData)
                    .then((res) => {
                        if (res.status === 200) {
                            if (!res?.data?.isVerified) {
                                setOtpScreen(true);
                                setLoadingButton(false);
                            } else {
                                localStorage.setItem('token', res?.data?.data?.accessToken);
                                const userData = JSON.stringify(res?.data?.data);
                                localStorage.setItem('userData', userData);
                                if (res?.data?.data?.userPreferences?.bookmarkNotification == true) {
                                    dispatch(NOTIFICATION_BOOKMARK('on'))
                                } else {
                                    dispatch(NOTIFICATION_BOOKMARK('off'))
                                }
                                localStorage.setItem('user_id', res?.data?.data?._id);
                                toast.success('Login Successfully.');
                                dispatch(BOOKMARK(res?.data?.data?.savedNovels));
                                dispatch(LIKE_NOVEL(res?.data?.data?.likedNovels));
                                dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))

                                if (res?.data?.data?.userPreferences?.mode == "DARK") {
                                    dispatch(THEME('dark'))
                                } else {
                                    dispatch(THEME('light'))
                                }
                                setTimeout(() => {
                                    router.push('/');
                                    setLoadingButton(false);
                                }, 2000);
                            }
                        } else {
                            // Handle non-200 status codes here
                            toast.error('An unexpected error occurred. Please try again later.');
                        }
                    }).catch((er) => {
                        toast.error(er?.response?.data?.message)
                        setLoadingButton(false)
                    })
            }
        }
    };

    // const userLogin = () => {
    //     setEmailError('');
    //     setPasswordError('');

    //     // Check if email and password are provided
    //     if (!input.email) {
    //         setEmailError('Email is required');
    //         return; // Stop further execution
    //     }
    //     if (!input.password) {
    //         setPasswordError('Password is required');
    //         return; // Stop further execution
    //     }

    //     // setErrors({
    //     //     email: "",
    //     // })

    //     if (validateForm()) {
    //         setLoadingButton(true)
    //         const form = new FormData()
    //         form.append("email", input.email)
    //         form.append("password", input.password)
    //         loginApi(form).then((res) => {
    //             if (res.status == 200) {
    //                 toast.success(res?.data?.data?.message)
    //                 if (!res?.data?.isVerified) {
    //                     setOtpScreen(true)
    //                 } else {
    //                     localStorage.setItem('token', res?.data?.data?.accessToken)
    //                     localStorage.setItem('user_id', res?.data?.data?._id)
    //                     toast.success('Login Successfully.')
    //                     dispatch(BOOKMARK(res?.data?.data?.savedNovels))
    //                     dispatch(LIKE_NOVEL(res?.data?.data?.likedNovels))
    //                     setTimeout(() => {
    //                         router.push('/')
    //                         setLoadingButton(false)
    //                     }, 2000);

    //                 }
    //             }
    //         }).catch((er) => {
    //             toast.error(er?.response?.data?.message)
    //             setLoadingButton(false)
    //         })
    //     }
    // }

    const OtpVerify = () => {
        setLoadingButton(true)
        const form = new FormData()
        form.append("email", input.email)
        form.append("password", input.password)
        form.append('otp', input.otp)
        verifyOtpApi(form).then((res) => {
            if (res.status == 200) {
                localStorage.setItem('token', res?.data?.data?.accessToken)
                localStorage.setItem('user_id', res?.data?.data?._id)
                const userData = JSON.stringify(res?.data?.data);
                localStorage.setItem('userData', userData)
                dispatch(BOOKMARK(res?.data?.data?.savedNovels))
                dispatch(LIKE_NOVEL(res?.data?.data?.likedNovels))
                toast.success('Login Successfully.')
                dispatch(COIN_HISTORY(res?.data?.data?.purchasedAvailableCoins))
                setTimeout(() => {
                    router.push('/')
                    setLoadingButton(false)
                }, 2000);

            }
        }).catch((er) => {
            setLoadingButton(false)
            toast.error(er?.response?.data?.error)
        })
    }

    const forgotPasswordButton = () => {
        const form = new FormData()
        if (input.forgotPasswordEmail == '') {
            setForgotPasswordError('Email is required')
        } else {
            setLoadingButton(true)
            form.append('email', input.forgotPasswordEmail)
            otpResetPassword(form).then((res) => {
                setLoadingButton(false)
                setForgotPasswordOtp(true)
                setForgotPasswordError('')
                toast.success(res?.data?.message)
            }).catch((er) => {
                toast.error(er?.response?.data?.message)
                setLoadingButton(false)
            })
        }
    }

    const OtpVerifyForgotPassword = () => {
        if (input.otp == '') {
            setOtpError('otp is required')
        } else {
            setLoadingButton(true)
            const form = new FormData()
            form.append('email', input.forgotPasswordEmail)
            form.append('otp', input.otp)
            verifyOtpApi(form).then((res) => {
                setResetPasswordInput(true)
                setLoadingButton(false)
                setForgotPasswordOtp(false)
                toast.success('Otp Verify')
                localStorage.setItem('token', res?.data?.data?.accessToken)
                localStorage.setItem('user_id', res?.data?.data?._id)
            }).catch((er) => {
                toast.error(er?.response?.data?.error)
                setLoadingButton(false)
                console.log(er);
            })
        }
    }

    const resetPasswordApi = () => {
        if (input.password == '') {
            setFogotPasswordError('Password is required')
        } else {
            setLoadingButton(true)
            const form = new FormData()
            form.append('password', input.password)
            forgotPasswordApi(form).then((res) => {
                toast.success(res?.data?.message)
                setTimeout(() => {
                    router.push('/')
                    setLoadingButton(true)
                }, 2000);
            }).catch((er) => {
                console.log(er);
            })
        }
    }

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                newestOnTop={false}
                stacked
            />
            <section className="h-[70vh] lg:mt-0 lg:mb-0">
                <div className="h-full">
                    {/* <!-- Left column container with background--> */}
                    <div className="pb-[64px] md:pb-0 g-6 flex h-full relative flex-wrap items-center justify-center lg:justify-between lg:mt-10">
                        <div className=" h-full sm:mt-[1rem] mt-[4rem] flex  shrink-1 grow-0 basis-auto md:mb-0 w-full bg-[#5d8f9b] justify-center items-center"
                            style={{ boxShadow: "rgb(189 225 233) 5px 0px 16px 0px" }}>

                            {/* <!-- Right column container --> */}
                            <div className="rounded-lg  py-10  px-10 sm:w-2/4 md:w-[75%] lg:w-2/4  w-full absolute flex md:mx-auto my-0 sm:right-0 sm:left-0  bg-[#1313134f]"
                                style={{ boxShadow: "0px 0px 6px 0px #D5D0D1" }}>
                                {forgotPassword ?
                                    <div className='w-full sm:px-10'>
                                        <div className="mb-5 flex items-center lg:justify-start">
                                            <KeyboardBackspaceIcon onClick={() => {
                                                setForgotPassword(false)
                                                setForgotPasswordOtp(false)
                                                setResetPasswordInput(false)
                                            }} className='cursor-pointer' />
                                            <p className="text-2xl text-white font-semibold ml-5">FORGOT PASSWORD</p>
                                        </div>
                                        <div className='flex justify-center flex-col'>
                                            <input
                                                type="email"
                                                name='forgotPasswordEmail'
                                                label="Email address"
                                                placeholder='Enter Your Email'
                                                autoComplete="off"
                                                size="lg"
                                                onChange={handleChange}
                                                className="border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020]"
                                            />
                                            <span className='font-semibold text-sm text-red-400 pl-1'>{forgotPasswordError}</span>
                                            {errors.forgot_PasswordEmail && <p className='pl-1 text-red-400 text-sm font-semibold'>{errors.forgot_PasswordEmail}</p>}

                                            {forgotPasswordOtp &&
                                                <div className='flex justify-center flex-col mt-2'>
                                                    <input
                                                        type="text"
                                                        name='otp'
                                                        label="Email address"
                                                        placeholder='Enter Otp'
                                                        autoComplete="off"
                                                        size="lg"
                                                        onChange={handleChange}
                                                        className="border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020]"
                                                    />
                                                    <span className='font-semibold text-sm text-red-400 pl-1'>{otpError}</span>
                                                </div>}

                                            {resetPasswordInput &&
                                                <div className='flex justify-center flex-col mt-2'>
                                                    <input
                                                        type="password"
                                                        name='password'
                                                        label="Email address"
                                                        placeholder='Enter Password'
                                                        autoComplete="off"
                                                        size="lg"
                                                        onChange={handleChange}
                                                        className="border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020]"
                                                    />
                                                    <span className='text-sm text-red-400 pl-1'>{forgotError}</span>
                                                </div>
                                            }

                                            {
                                                resetPasswordInput ?
                                                    <div className='flex justify-center mt-4'>
                                                        <button onClick={() => resetPasswordApi()} className='w-fit text-white px-10 inline-block rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal'>Forgot password</button>
                                                    </div> :
                                                    forgotPasswordOtp ?
                                                        <div className='flex justify-center mt-4'>
                                                            <button onClick={() => OtpVerifyForgotPassword()} className='w-fit text-white px-10 inline-block rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal'>Forgot password</button>
                                                        </div> :
                                                        <div className='flex justify-center mt-4'>
                                                            <button onClick={() => forgotPasswordButton()} className='w-fit text-white px-10 inline-block rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal'>Forgot password</button>
                                                        </div>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <form className='w-full sm:px-10'>
                                        {/* <!--Sign in section--> */}
                                        <div className="flex flex-col items-center justify-center lg:justify-start">
                                            <p className="mb-5 md:mb-10 mr-4 text-2xl text-white font-semibold">LOGIN</p>
                                        </div>

                                        <div className='flex flex-col'>
                                            {/* <!-- Email input --> */}
                                            <input
                                                type="email"
                                                name='email'
                                                disabled={otpScreen}
                                                label="Email address"
                                                placeholder='Enter Your Email'
                                                autoComplete="off"
                                                size="lg"
                                                onChange={handleChange}
                                                className="border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020]"
                                            />
                                            <span className='text-sm text-red-400 pl-1 font-semibold'>{emailError}</span>
                                            {errors.email && <p className='text-red-400 text-sm font-semibold'>{errors.email}</p>}

                                            {/* <!--Password input--> */}
                                            <span className='relative'>
                                                <input
                                                    type={visible ? "text" : "password"}
                                                    name='password'
                                                    disabled={otpScreen}
                                                    placeholder='Enter Your Password'
                                                    autoComplete="off"
                                                    label="Password"
                                                    size="lg"
                                                    onChange={handleChange}
                                                    className="w-full mt-6 border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020]"
                                                />
                                                <div>
                                                    {!visible ? <Visibility className="text-base absolute bottom-[2rem] right-[1rem] text-slate-400 cursor-pointer" onClick={() => setVisible(!visible)} /> :
                                                        <VisibilityOff className="text-base absolute bottom-[2rem] right-[1rem] text-slate-400 cursor-pointer" onClick={() => setVisible(!visible)} />}
                                                </div>
                                                <span className='text-sm text-red-400 pl-1 font-semibold'>{passwordError}</span>
                                            </span>

                                            {otpScreen &&
                                                <input
                                                    type='otp'
                                                    name='otp'
                                                    placeholder='Enter Otp'
                                                    autoComplete="off"
                                                    label='Otp'
                                                    size='lg'
                                                    onChange={handleChange}
                                                    className="border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020]"
                                                />}
                                        </div>

                                        {/* <!-- Login button --> */}
                                        <div className="text-center lg:text-left mt-2">
                                            <div ripplecolor="light" className='flex justify-center mt-2'>
                                                {otpScreen ?
                                                    (loadingButton ? <div className="w-fit flex mx-auto my-2 px-10 rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                        <CircularProgress size={20} />
                                                    </div>
                                                        :
                                                        <button
                                                            onClick={() => OtpVerify()}
                                                            type="button"
                                                            className="w-fit  flex mx-auto my-2 px-10 rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                        >
                                                            Verify Otp
                                                        </button>)
                                                    :
                                                    (loadingButton ?
                                                        <div className="w-fit flex mx-auto my-2 px-10 rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                            <CircularProgress size={20} />
                                                        </div>
                                                        : <button
                                                            onClick={() => userLogin()}
                                                            type="button"
                                                            className="w-fit flex mx-auto my-2 px-10 rounded bg-primary  pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                        >
                                                            Login
                                                        </button>)}
                                            </div>

                                            {/* <!-- Register link --> */}
                                            <div className='flex  items-center justify-between mt-2 text-white pt-1 text-sm font-normal'>
                                                <Link href={{ pathname: '/register' }} className="mb-0 cursor-pointer text-left">
                                                    Don't have an account?{" "}Register
                                                </Link>
                                                <p onClick={() => setForgotPassword(true)} className="text-right cursor-pointer">Forgot password?</p>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default LoginPage
