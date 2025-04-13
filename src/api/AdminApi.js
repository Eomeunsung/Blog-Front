import axiosInstance from "./axiosInstance";

export const userInfo = async (data) => {
    console.log("받아온 데이터 "+JSON.stringify(data))
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/admin/user/info`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log("유저 정보 리스트 "+res.data)
        return res.data.data;
    }catch (error) {
        throw error.response.status
    }
}

export const userDetail = async (data) => {
    console.log("받아온 데이터 "+JSON.stringify(data))
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/admin/user/info/${data}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        return res.data.data;
    }catch (error) {
        console.log(error);
        console.log("유정 정보 "+error.response.data)
        console.log(error.response.status);
        throw error.response.status
    }
}

export const roleGet = async (data) => {
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/admin/role`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        return res.data.data;
    }catch (error) {
        throw error;
    }
}

export const roleCreate = async (data) => {
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/admin/role`,data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        return res.data.data;
    }catch (error) {
        throw error.response;
    }
}

export const roleDelete = async (data) => {
    try{
        const res = await axiosInstance.delete(`${process.env.REACT_APP_URL}/admin/role/${data}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        return res.data.data;
    }catch (error) {
        throw error.response;
    }
}

export const userUpdate = async (data) => {
    console.log("업데이트 내역 "+data.email+" "+data.name+" "+data.roles)
    try{
        const res = await axiosInstance.put(`${process.env.REACT_APP_URL}/admin/user/info`,data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log("업데이트 성공 "+ JSON.stringify(res.data))
        return res.data;
    }catch (error) {
        throw error.response;
    }
}