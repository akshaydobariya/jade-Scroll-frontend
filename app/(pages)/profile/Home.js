"use client";
import useApiService from "@/services/ApiService";
import React, { useEffect, useState } from "react";
import { Avatar, CircularProgress, Switch } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import loader from '../../../public/assets/loader/loader.gif'

const label = { inputProps: { "aria-label": "Switch demo" } };

function Home() {
  const { getProfile, profileEdit, profileImageEdit } = useApiService();
  const [profiledata, setProfiledata] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lodingImage, setLoadingImage] = useState(false);
  const [imageValidation, setImageValidation] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  useEffect(() => {
    profileGet();
  }, [editProfile]);

  const profileGet = () => {
    if (localStorage.getItem("token")) {
      getProfile()
        .then((res) => {
          setProfiledata(res?.data?.data);
        })
        .catch((er) => {
          console.log(er, "er profile");
        });
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const editProfileApi = () => {
    const form = new FormData();
    form.append(
      "name",
      input.name ? input.name : profiledata?.name ? profiledata?.name : ""
    );
    form.append(
      "email",
      input.email ? input.email : profiledata?.email ? profiledata?.email : ""
    );
    form.append(
      "password",
      input.password
        ? input.password
        : profiledata?.password
        ? profiledata?.password
        : ""
    );
    form.append(
      "bio",
      input.bio ? input.bio : profiledata?.bio ? profiledata?.bio : ""
    );

    profileEdit(form)
      .then((res) => {
        toast.success(res?.data?.message);
        setEditProfile(false);
      })
      .catch((er) => {
        console.log(er, "Error Edit Profile");
      });
  };

  const editProfileImage = (Imgfile) => {
    if (Imgfile == undefined) {
    } else {
      if (Imgfile?.size > 500000) {
        setImageValidation("Maximum file size cannot be over 500 KB");
      } else {
        setLoadingImage(true);
        const form = new FormData();
        form.append(
          "images",
          Imgfile
            ? Imgfile
            : profiledata?.profileImg
            ? profiledata?.profileImg
            : ""
        );
        profileImageEdit(form)
          .then((res) => {
            profileGet();
            setLoadingImage(false);
          })
          .catch((er) => {
            console.log(er);
          });
        setImageValidation("");
      }
    }
  };

  return (
    <div className="pt-16 xl:pb-20">
      <ToastContainer position="bottom-right" newestOnTop={false} stacked />

      <div>
        {profiledata ? (
          <div className="md:max-w-full m-auto pt-10 sm:px-24 h-[100vh] xl:h-full">
            <div className="text-3xl border-b font-semibold w-full flex sm:justify-start justify-center mx-auto my-0 pb-1 sm:px-0 px-10">
              User Profile
            </div>
            <div className="pt-3 sm:flex block gap-20 sm:px-24 px-10 md:px-1 lg:px-10">
              <div className="flex-col w-[9.5rem] rounded-full flex mx-auto my-0 justify-center items-center text-gray-500">
                <div className="flex justify-center relative">
                  <label htmlFor="file-input" className="relative">
                    {lodingImage ? (
                      <div className="border p-7 rounded-full">
                        <CircularProgress size={20} color="secondary" />
                      </div>
                    ) : profiledata?.profileImg ? (
                      <Avatar
                        src={profiledata?.profileImg}
                        className="sm:my-10"
                        style={{ height: "10.5rem", width: "9rem" }}
                      />
                    ) : (
                      <Avatar
                        className="sm:my-10"
                        sx={{ height: "10rem", width: "10rem" }}
                      />
                    )}
                    <EditIcon
                      className="cursor-pointer absolute sm:bottom-[3rem] bottom-[.3rem] right-[1.5rem] md:right-[1.5rem] text-gray-800 bg-gray-500 p-1 border rounded-full"
                      fontSize="medium"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    className="hidden"
                    id="file-input"
                    onChange={(e) => editProfileImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <div className="text-red-500 text-xs pb-3">
                    {imageValidation !== "" && imageValidation}
                  </div>
                  <div className="text-sm text-start">
                    Max file size is 500 KB
                  </div>
                </div>
              </div>
              <div className="sm:pt-6 flex-1">
                <div className="">
                  <div className="flex flex-col gap-y-4 text-gray-700">
                    <div className="grid sm:grid-cols-2 sm:gap-10">
                      <div>
                        <label className="text-sm dark:text-white">
                          User Name :
                        </label>
                        <input
                          onChange={handleChange}
                          placeholder="Your Name"
                          disabled
                          name="name"
                          defaultValue={profiledata?.name}
                          className="border bg-[#b5b1b133]  focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="text-sm dark:text-white">
                          Email :
                        </label>
                        <input
                          onChange={handleChange}
                          placeholder="Your Email"
                          name="email"
                          disabled
                          defaultValue={profiledata?.email}
                          className="border bg-[#b5b1b133] focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm dark:text-white">
                        Password :
                      </label>
                      <input
                        onChange={handleChange}
                        type={visible ? "text" : "password"}
                        placeholder="Your password"
                        name="password"
                        className="border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white"
                      />
                      <div>
                        {!visible ? (
                          <Visibility
                            className="text-xs absolute bottom-[0.4rem] right-[0.4rem] text-slate-400 cursor-pointer"
                            onClick={() => setVisible(!visible)}
                          />
                        ) : (
                          <VisibilityOff
                            className="text-xs absolute bottom-[0.4rem] right-[0.4rem] text-slate-400 cursor-pointer"
                            onClick={() => setVisible(!visible)}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm dark:text-white">Bio :</label>
                      <textarea
                        rows={5}
                        onChange={handleChange}
                        placeholder="Your bio"
                        name="bio"
                        defaultValue={profiledata?.bio}
                        className="border focus:outline-none text-sm py-2 px-2 rounded-md w-full dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => editProfileApi()}
                    className=" w-fit px-10 rounded-md mt-5 buttonGradient py-[6px] text-white"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full pt-16">
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
    </div>
  );
}

export default Home;
