import axios from "axios"



export const getNotify = async () => {
    const res = await axios.get(`/api/notifies`, {withCredentials: true})
    return res;
}


export const postDataAPI = async (msg) => {
 
    const res = await axios.post(`/api/notify`,msg, {withCredentials: true})
    return res;
}


export const patchDataAPI = async (url, post) => {
    const res = await axios.patch(`/api/isReadNotify/${url}`, post, {
        withCredentials: true
    })
    return res;
}


export const deleteDataAPI = async (msg) => {
    const res = await axios.delete(`/api/notify/${msg.id}?url=${msg.url}`, {
        withCredentials: true
    })
    return res;
}

