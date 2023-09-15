import axios from "axios";

export const server = axios.create ({
    baseURL: "https://shorts-summary-seven.vercel.app",
})