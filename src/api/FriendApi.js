import axios from "axios";

export const friendGet  = async (data) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/friend`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        console.log("친구 목록 조회 "+JSON.stringify(res.data));
        return res.data;
    }catch (error) {
        throw error;
    }
}

export const searchFriends  = async (data) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/searchFriend"`, {
            params: {data}
        });
        console.log("친구 목록 조회 "+JSON.stringify(res.data));
        return res.data;
    }catch (error) {
        throw error;
    }
}

export const recommendSearch  = async (data) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/search`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        console.log("추천 친구 목록 조회 "+JSON.stringify(res.data));
        return res.data;
    }catch (error) {
        throw error;
    }
}

export const friendAdd  = async (id) => {
    console.log("들어온 친추 아이디 "+id)
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/friendAdd/${id}`, {},{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        console.log("친구 추가 "+JSON.stringify(res));
        return res.data;
    }catch (error) {
        console.log("에러 "+JSON.stringify(error));
        throw error;
    }
}


export const friendProfile  = async (id) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/friendProfile/${id}`,{
            headers : {
                "Content-Type": "application/json",
            }
        });
        console.log(res.data)
        return res.data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
