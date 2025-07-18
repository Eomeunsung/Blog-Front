import axios from "axios";
import axiosInstance from './axiosInstance';  // axiosInstance 임포트

export const getBlog  = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/blog/list`,{
            headers : {
                "Content-Type": "application/json",
            }
        });
        return res.data.data;
    }catch (error) {
        console.log(error);
        return error.response.status;
    }
}

export const getDetailBlog  = async (id) => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/blog/${id}`,{
            headers : {
                "Content-Type": "application/json",
            }
        });
        // console.log("불러오기2 "+JSON.stringify(res.data.data))
        return res.data.data;
    }catch (error) {
        console.log(error);
        return error.response.status;
    }
}

export const writeBlog = async (data) => {
    console.log("받아온 데이터 "+JSON.stringify(data))
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/blog/write`,data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log("블로그 작성 성공 "+res);
    }catch (error) {
        console.log(error);
        console.log("쓰기 에러 "+error.response.data)
        console.log(error.response.status);
        throw error.response.status
    }
}

export const deleteBlog = async (id) => {
    try{
        const res = await axiosInstance.delete(`${process.env.REACT_APP_URL}/blog/${id}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log("삭제 성공 "+JSON.stringify(res))
        return res.data;
    }catch (error) {
        throw error;
    }
}

export const imgUpload = async (formData) => {
    console.log("보내기 전 API "+formData.getAll("files"));
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/blog/upload`,formData,{
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

export const blogUpdate = async (data) => {
    try{
        const res = await axiosInstance.put(`${process.env.REACT_APP_URL}/blog`,data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        console.log(res);
    }catch (error) {
        console.log(error);
    }
}

export const commentWrite = async (data) => {
    console.log("댓글 데이터 "+data.blogId+" "+data.content)
    try{
        const res = await axiosInstance.post(`${process.env.REACT_APP_URL}/comment`,data,{
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


