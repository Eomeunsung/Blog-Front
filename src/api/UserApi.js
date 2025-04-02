import axios from "axios";
import axiosInstance from "./axiosInstance";
export const createAccount  = async (data) => {
    console.log("회원가입 보내는 데이터 "+data)
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/user/signup`,data,{
            headers : {
                "Content-Type": "application/json",
            }
        });
        console.log(res.data);
        return res.data;
    }catch (error) {
        console.error("회원가입 실패:", error.response);
        throw error;
    }
}

export const signIn  = async (data) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`,data,{
            headers : {
                "Content-Type": "application/json",
            }
        });
        console.log(JSON.stringify(res));
        return res.data;
    }catch (error) {
        throw error;
    }
}


export const myProfile  = async () => {
    try{
        const res = await axiosInstance.get(`${process.env.REACT_APP_URL}/user/myprofile`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        console.log(res.data)
        return res.data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export const myProfileUpdate  = async (data) => {
    try{
        const res = await axiosInstance.put(`${process.env.REACT_APP_URL}/user/myprofile`, data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        });
        return res.data;
    }catch (error) {
        throw error;
    }
}

export const imgUpload = async (formData) => {
    console.log("보내기 전 API "+formData.getAll("files"));
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/user/upload`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        });
        return res.data.data;
    }catch (error) {
        console.log("이미지 업로드 에러 "+error)
        if (error.response) {
            // 서버에서 응답이 왔을 경우
            console.error("서버 응답 에러: ", error.response.data);
            console.error("상태 코드: ", error.response.status);
        } else if (error.request) {
            // 요청이 서버로 전달되지 않았을 경우
            console.error("서버로 요청이 전달되지 않았습니다: ", error.request);
        } else {
            // 그 외의 오류
            console.error("에러 발생: ", error.message);
        }
    }
}





