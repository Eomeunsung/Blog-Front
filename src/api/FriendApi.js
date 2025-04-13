import axios from "axios";
import axiosInstance from './axiosInstance';  // axiosInstance 임포트

export const friendGet = async () => {
    try {
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/friend`);
        console.log("친구 목록 조회 " + res);
        console.log("친구 목록 조회2 " + JSON.stringify(res));
        return res.data;
    } catch (error) {
        console.log("친구 조회 에러 " + error.message);  // "토큰이 만료되었습니다"
        console.log("친구 조회 에러2 " + error);
        throw error;
    }
}

// export const friendGet  = async (data) => {
//     try{
//         const res = await axios.get(`${process.env.REACT_APP_URL}/friend`, {
//             headers : {
//                 "Content-Type": "application/json",
//                 Authorization: "Bearer "+localStorage.getItem("jwt"),
//             }
//         });
//         console.log("친구 목록 조회 "+res);
//         console.log("친구 목록 조회2 "+JSON.stringify(res));
//         return res.data;
//     }catch (error) {
//         console.log("친구 조회 에러러 "+error.message); // "토큰이 만료되었습니다
//         console.log("친구 조회 에러2 "+error);
//         throw error;
//     }
// }

export const friendRequest = async (id) => {
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/friendRequest`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });

        console.log("친구 요청 조회 "+JSON.stringify(res.data));
        return res.data;
    }catch (error) {
        console.log("친구 요청 에러러 "+error.response.data.message); // "토큰이 만료되었습니다
        console.log(error)
        throw error;
    }
}

export const friendAccept = async (id) => {
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/friendAccept/${id}`, {},{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        console.log("친구 수락 확인 데이터 "+JSON.stringify(res));
        return res.data;
    }catch (error) {
        console.log("친구 수락 환인 에러 "+JSON.stringify(error));
        throw error;
    }
}

export const searchFriends  = async (data) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/searchFriend`, {
            params: {data}
        });
        console.log("친구 목록 조회 "+JSON.stringify(res));
        return res.data;
    }catch (error) {

        console.log("에러 "+error);
        throw error;
    }
}

export const recommendSearch  = async (data) => {
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/search`, {
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        return res.data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export const friendAdd  = async (id) => {
    console.log("들어온 친추 아이디 "+id)
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/friendAdd/${id}`, {},{
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

export const friendDelete  = async (id) => {
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/friendDelete/${id}`,{},{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        return res.data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
