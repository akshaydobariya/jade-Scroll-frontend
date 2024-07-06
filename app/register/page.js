"use client";
import React, { useState } from "react";
import leftImage from "../../public/assets/Images/LoginPageImage.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useApiService from "@/services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function RegisterPage() {
  const router = useRouter();
  const { signUpApi, verifyOtpApi } = useApiService();
  const [loadingButton, setLoadingButton] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [visible, setVisible] = useState(false);
  const [termsValue, setTermsValue] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
    otp: "",
    name: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({
    email: "",
  });

  const validateEmail = (email) => {
    // const regex =
    //   /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const validateForm = () => {
    if (input.name !== "" && input.password !== "" && input.email !== "") {
      setNameError("");
      setPasswordError("");
      setEmailError("");
    }
    let isValid = true;
    const newErrors = {};

    if (!validateEmail(input.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
      setEmailError("");
    }

    // if (input.password.length < 6) {
    //   newErrors.password = 'Password must be at least 6 characters';
    //   isValid = false;
    // }

    // if (input.password !== input.confirmPassword) {
    //   newErrors.confirmPassword = 'Passwords do not match';
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const SignUp = () => {
    if (input.email == "") {
      setEmailError("Email is required");
      setErrors({ email: "" });
    }
    if (input.name == "") {
      setNameError("Name is required");
    }
    if (input.password == "") {
      setPasswordError("Password is required");
    }

    const form = new FormData();
    form.append("email", input.email);
    form.append("password", input.password);
    form.append("name", input.name);

    if (input.email !== "" && input.name !== "" && input.password !== "") {
      if (termsValue) {
        if (validateForm()) {
          setNameError("");
          setPasswordError("");
          setEmailError("");
          setLoadingButton(true);
          signUpApi(form)
            .then((res) => {
              if (res.status == 200) {
                setLoadingButton(false);
                toast.success(res?.data?.message?.message);
                setOtpScreen(true);
              }
            })
            .catch((er) => {
              toast.error(er?.response?.data?.message);
              setLoadingButton(false);
            });
        }
      } else {
        toast.error("Accept terms & condition");
      }
    }
  };

  const OtpVerify = () => {
    if (input.otp == "") {
      setOtpError("Otp is required");
    }
    setLoadingButton(true);
    const form = new FormData();
    form.append("email", input.email);
    form.append("otp", input.otp);
    verifyOtpApi(form)
      .then((res) => {
        localStorage.setItem("token", res?.data?.data?.accessToken);
        toast.success("Account Registered Successfully.");
        setTimeout(() => {
          router.push("/login");
          setLoadingButton(false);
        }, 2000);
      })
      .catch((er) => {
        toast.error(er?.response?.data?.error);
        setLoadingButton(false);
      });
  };

  return (
    <div>
      <ToastContainer position="bottom-right" newestOnTop={false} stacked />
      <section className="h-[85vh]  lg:mt-0 lg:mb-0">
        <div className="h-full">
          {/* <!-- Left column container with background--> */}
          <div className="pb-[64px] md:pb-0 g-6 relative flex h-full items-center justify-center lg:mt-10">
            <div
              className="mt-[8rem] sm:mt-[3rem] flex  shrink-1  grow-0 basis-auto md:mb-0  md:shrink-0 w-full bg-[#5d8f9b] justify-center items-center h-full"
              style={{ boxShadow: "rgb(189 225 233) 5px 0px 16px 0px" }}
            >
              {/*  <Image
                                src={leftImage}
                                className="w-full h-full object-contain"
                                alt="Sample image"
                            /> */}

              {/* <!-- Right column container --> */}
              <div
                className="rounded-lg absolute flex mx-auto my-0 right-0 left-0 bg-[#1313134f] py-10 px-10 sm:w-2/4 md:w-[75%] lg:w-2/4 w-full"
                style={{ boxShadow: "0px 0px 6px 0px #D5D0D1" }}
              >
                <form className="w-full sm:px-10">
                  {/* <!--Sign in section--> */}
                  <div className="flex flex-col items-center justify-center lg:justify-start">
                    <p className="mb-6 mr-4 text-2xl font-semibold text-white">
                      SIGN UP
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-center flex-col">
                      <input
                        type="text"
                        name="name"
                        label="User Name"
                        disabled={otpScreen}
                        placeholder="Enter User Name"
                        autoComplete="off"
                        size="lg"
                        onChange={handleChange}
                        className="mt-5 border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020] dark:text-white bg-white text-black"
                      />
                      <span className="font-semibold text-sm text-red-400 pl-1">
                        {nameError}
                      </span>
                    </div>
                    {/* <!-- Email input --> */}
                    <div className="flex justify-center flex-col">
                      <input
                        type="email"
                        name="email"
                        disabled={otpScreen}
                        label="Email address"
                        placeholder="Enter Your Email"
                        autoComplete="off"
                        size="lg"
                        onChange={handleChange}
                        className="mt-5 border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020] dark:text-white bg-white text-black"
                      />
                      <span className="font-semibold text-sm text-red-400 pl-1">
                        {emailError}
                      </span>
                      {errors.email && (
                        <p className="pl-1 text-red-400 text-sm font-semibold">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* <!--Password input--> */}
                    <div className="flex justify-center flex-col relative">
                      <input
                        type={visible ? "text" : "password"}
                        name="password"
                        placeholder="Enter Your Password"
                        autoComplete="off"
                        label="Password"
                        disabled={otpScreen}
                        onChange={handleChange}
                        className="mt-5 border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020] dark:text-white bg-white text-black"
                        size="lg"
                      />
                      <div>
                        {!visible ? (
                          <Visibility
                            className={
                              passwordError
                                ? "text-base absolute bottom-[1.8rem] right-[1rem] text-slate-400 cursor-pointer"
                                : "text-base absolute bottom-[.6rem] right-[1rem] text-slate-400 cursor-pointer"
                            }
                            onClick={() => setVisible(!visible)}
                          />
                        ) : (
                          <VisibilityOff
                            className="text-base absolute bottom-[.6rem] right-[1rem] text-slate-400 cursor-pointer"
                            onClick={() => setVisible(!visible)}
                          />
                        )}
                      </div>
                      <span className="font-semibold text-sm text-red-400 pl-1">
                        {passwordError}
                      </span>
                    </div>

                    {otpScreen && (
                      <div className="flex justify-center flex-col">
                        <input
                          type="password"
                          name="otp"
                          placeholder="Enter OTP"
                          autoComplete="off"
                          label="Password"
                          onChange={handleChange}
                          className="mt-5 border-2 focus:outline-none px-2 text-sm rounded-md py-2 dark:bg-[#202020] dark:text-white bg-white text-black"
                          size="lg"
                        />
                        <span className="font-semibold text-sm text-red-400 pl-1">
                          {otpError}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-x-2 pt-2">
                      <input
                        type="checkbox"
                        onChange={(e) => setTermsValue(e.target.checked)}
                      />
                      <div className="text-sm text-white">
                        I accept{" "}
                        <span
                          className="text-[#009acc] font-semibold cursor-pointer"
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              window.open("/cms/terms&condition");
                            }
                          }}
                        >
                          terms & condition
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Login button --> */}
                  <div className="text-center lg:text-left">
                    <div ripplecolor="light" className="flex justify-center">
                      {otpScreen ? (
                        loadingButton ? (
                          <div className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            <CircularProgress size={20} />
                          </div>
                        ) : (
                          <button
                            onClick={() => OtpVerify()}
                            type="button"
                            className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Verify Otp
                          </button>
                        )
                      ) : loadingButton ? (
                        <div className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                          <CircularProgress size={20} />
                        </div>
                      ) : (
                        <button
                          onClick={() => SignUp()}
                          type="button"
                          className="w-fit flex mx-auto my-2 rounded bg-primary px-10 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        >
                          SignUp
                        </button>
                      )}
                    </div>

                    {/* <!-- Register link --> */}
                    <p
                      onClick={() => router.push("/login")}
                      className="mb-0 mt-2 pt-1 text-sm font-normal w-fit text-white cursor-pointer"
                    >
                      Already have an account? Login
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
