import axios from "axios"
const API = axios.create({baseURL:"http://localhost:5000"})


export const getNotify = async () => {
    const res = await API.get(`/notify/notifies`, {withCredentials: true})
    return res;
}


export const postDataAPI = async () => {
    const res = await API.post(`/notify/createNotify`, {withCredentials: true})
    return res;
}
