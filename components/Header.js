"use client";
import gif from "../public/assets/Images/load.gif";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import { Avatar, ClickAwayListener, useTheme } from "@mui/material";
import coin from "../public/assets/Images/Coins/coin.png";
import logoLight from "../public/assets/icon/logoLightMode.png";
import logoDark from "../public/assets/icon/logoDarkMode.png";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import useApiService from "@/services/ApiService";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Toggle from "@/app/(pages)/themeToggle/Toggle";
import { useDispatch, useSelector } from "react-redux";
import { RESET_REDUX, THEME } from "@/app/Redux/slice/userSlice";
function Header(props) {
  const router = useRouter();
  const pathname = usePathname();
  const [profiledata, setProfiledata] = useState();
  const { themeMode, searchApi, getProfile, notificationUnsubscribe } =
    useApiService();
  const [localStorageToken, setLocalStorageToken] = useState(false);
  const [debounceTime, setDebounceTime] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [novelOptions, setNovelOptions] = useState([]);
  const [searchToggle, setSearchToggle] = useState(false);
  const theme = useTheme();
  const [searchkey, setSearchKey] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const darkModeData = useSelector((state) => state?.user?.darkModeTheme);
  const dispatch = useDispatch();
  const coinHistoryData = useSelector((state) => state?.user?.coinHistory);
  const loader = useSelector((state) => state?.user?.loader);
  const [resetInput, setResetInput] = useState(false);

  useEffect(() => {
    if (resetInput) {
      setResetInput(false);
    }
  }, [resetInput]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (darkModeData === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      dispatch(THEME("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(THEME("light"));
    }
  }, [darkMode]);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // drawer
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAutocompleteChange = (e, item) => {
    setSearchKey(item);
    if (item !== null) {
      let route;
      if (item.label.includes("- Novel")) {
        route = `/detail/view/${item.id.replaceAll(" ", "")}`;
      } else if (item.label.includes("- Author")) {
        route = `/authorProfile/${item.id.replaceAll(" ", "")}`;
      } else {
        route = `/novel-list/${item.label.replaceAll(" ", "")}`;
      }
      setSearchToggle(false);
      setNovelOptions([]); // Close the search
      router.push(route);
      setMobileOpen(false);
      setSearchKey("");
    }
  };

  const drawer = (
    <div className="dark:bg-gray-800 h-full container dark:text-gray-100 block lg:hidden">
      <Box className="pl-2 pb-1">
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "ltr" ? (
            <CloseIcon className="dark:text-white text-black" />
          ) : (
            <CloseIcon className="dark:text-white text-black" />
          )}
        </IconButton>
      </Box>
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <Box
        className="bg-white"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
          borderRadius: "8px",
          borderColor: "gray",
          width: "90%",
          margin: "auto",
        }}
      >
        <SearchIcon alt="" className="h-4 w-4 text-black" />
        <Autocomplete
          id="Search00"
          loading={isSearching}
          options={novelOptions}
          value={searchkey}
          sx={{
            "& fieldset": { border: "none" },
          }}
          onChange={(e, item) => {
            if (item !== null) {
              handleAutocompleteChange(e, item);
              setNovelOptions([]);
              setResetInput(true);
            }
          }}
          onInput={(inputValue) => {
            setIsSearching(true);
            handleSearchNovel(inputValue);
          }}
          renderOption={(props, option) => (
            <>
              <li {...props}>
                <Avatar src={option.img} className="w-10 h-10 mr-2">
                  {option.label[0]}
                </Avatar>
                {option.label}
              </li>
              <hr />
            </>
          )}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                placeholder="search by novel, genre, author"
                value={searchkey}
                className="text-white w-full focus:outline-none"
              />
            );
          }}
          className="focus:outline-none w-[90%] px-2 text-sm text-white"
          placeholder="search.."
        />
      </Box>
      <List>
        <ListItem
          disablePadding
          sx={{ display: "flex", flexDirection: "column", paddingLeft: "15px", paddingTop: "8px"}}
        >
          <ListItemButton
            sx={{ width: "100%" }}
            onClick={() => {
              router.push("/novel-list/popular");
              setMobileOpen(false);
            }}
          >
            <ListItemText primary="Novels" />
          </ListItemButton>
          <ListItemButton
            sx={{ width: "100%" }}
            onClick={() => {
              router.push("/ranking/views");
              setMobileOpen(false);
            }}
          >
            <ListItemText primary="Honors" />
          </ListItemButton>
          {
            <ListItemButton
              sx={{ width: "100%" }}
              onClick={() => {
                router.push("/package");
                setMobileOpen(false);
              }}
            >
              <ListItemText primary="Treasury" />
            </ListItemButton>
          }
          {/* <ListItemButton
            sx={{ width: "100%" }}
            onClick={() => {
              router.push("/resources");
              setMobileOpen(false);
            }}
          >
            <ListItemText primary="Ebooks" />
          </ListItemButton> */}
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>
  );

  var container =
    window !== undefined ? () => window().document.body : undefined;

  const handleClickPopper = () => {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      setLocalStorageToken(true);
    } else {
      setLocalStorageToken(false);
    }
  }, [pathname, localStorageToken]);

  function handleSearchNovel(searched) {
    if (!searched) {
      setNovelOptions([]);
      setIsSearching(false);
    } else {
      if (debounceTime) {
        clearTimeout(debounceTime);
      }
      setDebounceTime(
        setTimeout(() => {
          const url = `page=1&limit=10&filter[search]=${
            searched.target.value
          }&filter[genre]=${""}&filter[type]=${""}&filter[novelStatus]=${""}`;
          searchApi(url)
            .then((res) => {
              if (res?.data?.status) {
                const novels = [];
                res?.data?.data?.novels?.data?.forEach((novel) => {
                  novels.push({
                    id: novel?._id,
                    label: novel?.title + " - Novel",
                    img: novel.coverImg,
                  });
                });
                const genre = [];
                res?.data?.data?.genres?.forEach((novel) => {
                  genre.push({
                    id: novel?._id,
                    label: novel?.name + " - Genre",
                    img: novel.img,
                  });
                });
                const authors = [];
                res?.data?.data?.authors?.data?.forEach((novel) => {
                  novels.push({
                    id: novel?._id,
                    label: novel?.pseudonym + " - Author",
                    img: novel.profileImg,
                  });
                });
                setNovelOptions([...novels, ...authors, ...genre]);
              }
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setIsSearching(false);
            });
        }, 1000)
      );
    }
  }

  const searchRef = useRef();

  useEffect(() => {
    const handleSearchClose = (e) => {
      if (searchRef?.current && !searchRef.current.contains(e.target)) {
        setSearchToggle(false);
      }
    };

    document.addEventListener("mousedown", handleSearchClose);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleSearchClose);
    };
  }, []);

  const notificationUnsbscribeApi = () => {
    const localToken = localStorage.getItem("token");
    notificationUnsubscribe(localToken)
      .then((res) => {
        router.push("/login");
        setOpen(false);
        themeApi();
        localStorage.clear();
        dispatch(RESET_REDUX());
      })
      .catch((er) => {
        console.log(er);
        router.push("/login");
        setOpen(false);
        themeApi();
        localStorage.clear();
        dispatch(RESET_REDUX());
      });
  };

  useEffect(() => {
    if (loader) {
      document.getElementById("body").style.overflow = "hidden";
    } else {
      document.getElementById("body").style.overflowY = "scroll";
    }
  }, [loader]);

  const themeApi = () => {
    let mode = darkModeData === "dark" ? "DARK" : "LIGHT";
    themeMode(mode)
      .then((res) => {
        // console.log('first')
      })
      .catch((er) => {
        console.log("error");
      });
  };

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1400
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {loader && (
        <div
          className="bg-[#1f1e1e8a] absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center h-[100vh]"
          style={{ zIndex: "9999" }}
        >
          <Image src={gif} alt="my gif" height={50} width={50} />
        </div>
      )}

      <div className="bg-[#FFFFFF] text-black  dark:bg-[#202020] dark:text-white fixed flex mx-auto my-0 max-w-[1400px]  inset-x-0 top-0 w-full z-40 shadow-xl">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              maxHeight: "41vh",
              overflowY: "auto",
            },
          }}
        >
          {drawer}
        </Drawer>

        <div className="flex justify-between w-full items-center px-5 pt-4 pb-4">
          <div className="flex items-center">
            <div onClick={() => router.push("/", undefined, { shallow: true })}>
              <div className="text-2xl cursor-pointer">
                <Image
                  alt="logo"
                  className="w-40 md:w-52 object-fill"
                  priority={true}
                  src={darkMode ? logoDark : logoLight}
                  height={500}
                  width={500}
                />
              </div>
            </div>
          </div>
          {!pathname.includes("/login") && !pathname.includes("/register") && (
            <>
              <div className="hidden md:flex justify-center items-center w-full">
                {searchToggle ? (
                  <>
                    <Autocomplete
                      // ref={searchRef}
                      id="Search"
                      sx={{
                        "& fieldset": { border: "none", color: "white" },
                        padding: "0px",
                        "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":
                          { color: `${darkMode ? "white" : "black"}` },
                      }}
                      freeSolo
                      loading={isSearching}
                      options={novelOptions}
                      disablePortal={true}
                      className="text-center flex justify-end dark:bg-gray-700 bg-gray-200 text-white inputWidth outline-none pl-3 rounded-full  focus:outline-none border-none z-50"
                      onChange={handleAutocompleteChange}
                      onInput={(inputValue) => {
                        setIsSearching(true);
                        handleSearchNovel(inputValue);
                      }}
                      renderOption={(props, option) => (
                        <>
                          <li key={""} {...props}>
                            <Avatar src={option.img} className="w-10 h-10 mr-2">
                              {option.label[0]}
                            </Avatar>
                            {option.label}
                          </li>
                          <hr />
                        </>
                      )}
                      renderInput={(params) => (
                        <TextField
                          autoFocus
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                {params.InputProps.startAdornment}
                                <IconButton>
                                  {/* Insert icon for search here */}
                                </IconButton>
                              </>
                            ),
                          }}
                          sx={{ color: "white" }}
                          placeholder="search by novel, genre, author"
                          value={searchkey}
                          {...params}
                          className="text-white w-full focus:outline-none border"
                        />
                      )}
                    />
                  </>
                ) : (
                  <div className="lg:flex items-center hidden h-[41px]">
                    <div className="md:gap-x-12 lg:flex">
                      <div
                        onClick={() =>
                          router.push("/novel-list/popular", "/", {
                            shallow: true,
                          })
                        }
                      >
                        <div className="cursor-pointer hover:text-blue-500 font-semibold tracking-wider">
                          Novels
                        </div>
                      </div>
                      {/* prefetch={true} */}
                      <div
                        onClick={() =>
                          router.push("/ranking/views", "/", { shallow: true })
                        }
                      >
                        <div className="cursor-pointer hover:text-blue-500 font-semibold tracking-wider">
                          Honors
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          router.push("/package", "/", { shallow: true })
                        }
                      >
                        <div className="cursor-pointer hover:text-blue-500 font-semibold tracking-wider">
                          Treasury
                        </div>
                      </div>
                      {/* <div
                        onClick={() =>
                          router.push("/resources", "/", { shallow: true })
                        }
                      >
                        <div className="cursor-pointer hover:text-blue-500 font-semibold tracking-wider">
                          Ebooks
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-x-4">
                <div className="hidden lg:block">
                  {searchToggle ? (
                    <CloseIcon
                      onClick={() => setSearchToggle(false)}
                      className="cursor-pointer dark:text-white"
                    />
                  ) : (
                    <SearchIcon
                      className="cursor-pointer hover:text-blue-600 dark:text-white"
                      onClick={() => setSearchToggle(true)}
                    />
                  )}
                </div>

                {!localStorageToken && (
                  <Link href={{ pathname: "/bookmark" }} prefetch>
                    <BookmarksIcon
                      titleAccess="Library"
                      className="cursor-pointer hover:text-blue-600"
                    />
                  </Link>
                )}

                <div>
                  <PersonIcon
                    onClick={() => {
                      handleClickPopper();
                      handleToggle();
                    }}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    ref={anchorRef}
                    fontSize="large"
                    sx={{ cursor: "pointer" }}
                    className="hover:text-blue-600"
                  />
                </div>
                <div className="block lg:hidden">
                  <MenuIcon onClick={handleDrawerToggle} />
                </div>
              </div>
            </>
          )}
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}>
              <Box
                sx={{ p: 1, mt: 1, mr: 1, width: "270px" }}
                className={`${
                  screenWidth > 1400 ? "text-gray-100 mr-20" : "text-gray-100"
                }`}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <div
                    autoFocus={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    className="p-3 dark:bg-[#202020] dark:text-white bg-white text-black rounded-md z-10"
                  >
                    {!localStorageToken && (
                      <>
                        <div className="flex items-center w-full">
                          {profiledata?.profileImg == null ? (
                            <Avatar />
                          ) : (
                            <Image
                              src={profiledata?.profileImg}
                              alt="profile"
                              height={100}
                              width={100}
                              className="h-14 w-14 rounded-full"
                            />
                          )}
                          <div className="pl-[6px] flex-1">
                            <div className="font-semibold capitalize">
                              {profiledata?.name ? profiledata?.name : "---"}
                            </div>
                            <div className="flex justify-between items-center w-full ">
                              <div className="flex items-center">
                                <Image
                                  src={coin}
                                  alt="coin"
                                  className="w-4 h-4 mr-1"
                                />
                                <span>{coinHistoryData}</span>
                              </div>
                              <Link href={{ pathname: "/package" }} prefetch>
                                <button className="rounded-md px-3 py-1 text-sm coinsCard hover:underline text-white">
                                  GET MORE
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* <div className="mt-3 border-2 rounded-md p-2 border-orange-500 coinsCard">
                          <Link href={{ pathname: "/becomeAuthor" }} prefetch>
                            <div
                              onClick={() => setOpen(false)}
                              className="text-orange-400 cursor-pointer"
                            >
                              BECOME AN AUTHOR
                            </div>
                          </Link>
                        </div> */}
                      </>
                    )}
                    <div className="pt-3 pl-2 leading-7 cursor-pointer flex flex-col">
                      {!localStorageToken && (
                        <>
                          <Link
                            href={{ pathname: "/profile" }}
                            prefetch
                            onClick={() => setOpen(false)}
                          >
                            User Profile
                          </Link>
                          <Link
                            href={{ pathname: "/notification" }}
                            prefetch
                            onClick={() => setOpen(false)}
                          >
                            Notification
                          </Link>
                          <Link
                            href={{ pathname: "/purchaseHistory" }}
                            prefetch
                            onClick={() => setOpen(false)}
                          >
                            Purchase History
                          </Link>
                          <Link
                            href={{ pathname: "/profile-settings" }}
                            prefetch
                            onClick={() => setOpen(false)}
                          >
                            Settings
                          </Link>
                          <div
                            onClick={() => {
                              notificationUnsbscribeApi();
                            }}
                          >
                            Log Out
                          </div>
                        </>
                      )}
                      {localStorageToken && (
                        <div
                          onClick={() => {
                            setOpen(false);
                            router.push("/login");
                          }}
                          className="text-white w-fit rounded-md bg-blue-500 my-2 cursor-pointer px-10 py-1 flex mx-auto "
                        >
                          Login
                        </div>
                      )}
                      <div className="flex justify-between mt-2 border-t border-gray-500">
                        <div className="mt-3">Mode</div>
                        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
                      </div>
                    </div>
                  </div>
                </ClickAwayListener>
              </Box>
            </Grow>
          )}
        </Popper>
      </div>
    </>
  );
}
Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};
export default Header;
