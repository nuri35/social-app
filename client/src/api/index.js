import axios from "axios"

export const createPost = async (post)=> await axios.post("/api/post",post,{withCredentials: true})

export const fetchSinglePost = async (id)=> await axios.get(`/api/post/${id}`,{withCredentials: true})