import axios from "axios";

export const http = axios.create({
    baseURL: "https://api.jadescrolls.com/api/"
    // baseURL: "https://zscroll.peclick.com/api/"
    // baseURL: "https://localhost:4000/api/"
})