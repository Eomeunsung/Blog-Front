import axios from "axios";
import axiosInstance from './axiosInstance'

export const chatRoomList = async () => {
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/chat/list`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log(res.data);
        return res.data.data;
    }catch (error) {
        console.log(error)
        throw error.response.status;
    }
}

export const chatRoomCreate = async (id) => {

    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/chat/create/private/${id}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log(res.data);
        return res.data;
    }catch (error) {
        console.log(error)
        throw error.response.status;
    }
}

export const chatPrivateGet = async (data) => {
    console.log("챗 들어온 데이터 "+data)
    const accountId = data;
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/chat/get/${accountId}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log(res.data);
        return res.data;
    }catch (error) {
        console.log(error)
        throw error.response.status;
    }
}

export const chatMsgGet = async (data) => {
    console.log("챗 들어온 데이터")
    const id = data;
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/chat/msg/${id}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log(res.data);
        return res.data;
    }catch (error) {
        console.log(error)
        throw error.response.status;
    }
}

export const chatCreateGroup = async (data) => {
    console.log("들어온 단톡방 생성 "+JSON.stringify(data))
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/chat/create/group`,data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log(res.data);
        return res.data;
    }catch (error) {
        console.log(error)
        throw error.response.status;
    }
}


