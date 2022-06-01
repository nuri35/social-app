import axios from "axios"
const API = axios.create({baseURL:"http://localhost:5000"})


export const getNotify = async () => {
    const res = await API.get(`/notify/notifies`, {withCredentials: true})
    return res;
}


export const postDataAPI = async (msg) => {
 
    const res = await API.post(`/notify/createNotify`,msg, {withCredentials: true})
    return res;
}


export const patchDataAPI = async (url, post) => {
    const res = await API.patch(`/notify/isReadNotify/${url}`, post, {
        withCredentials: true
    })
    return res;
}


export const deleteDataAPI = async (msg) => {
    const res = await API.delete(`/notify/removeNotify/${msg.id}?url=${msg.url}`, {
        withCredentials: true
    })
    return res;
}

