import axios from "axios";

export const http = axios.create({
    baseURL: "https://nodelts-lpxk5zgcgq-uc.a.run.app/api/"
    // baseURL: "https://zscroll.peclick.com/api/"
    // baseURL: "https://localhost:4000/api/"
})