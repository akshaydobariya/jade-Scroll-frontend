'use client'
import { useEffect, useState } from "react"
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import { FaMoon } from 'react-icons/fa'
import { BsSunFill } from 'react-icons/bs'
import { THEME } from "@/app/Redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Toggle({darkMode, setDarkMode}) {

    return (
        <div className="relative w-16 h-7 mt-3 flex items-center dark:bg-gray-700 bg-gray-400 cursor-pointer rounded-full p-1"
            onClick={() => setDarkMode(!darkMode)}>
            <FaMoon className="text-white" size={16} />
            <div className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                style={darkMode ? { left: "2px" } : { right: "2px" }}>
            </div>
            <BsSunFill size={16} className="ml-auto text-yellow-400 mb-[2px] mr-[2px]" />
        </div>
    )
}

export default Toggle