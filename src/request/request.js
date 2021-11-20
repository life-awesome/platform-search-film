import axios from "axios";
import {API_KEY} from "../Сonstants/constants";

export const get = async (url) => {
    return axios(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        }
    })
}