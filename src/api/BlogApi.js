import axios from "axios";

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

export const writeBlog = async (data) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/blog/write`,data,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
    }catch (error) {
        console.log(error);
        console.log(error.response.status);
        throw error.response.status
    }
}

export const deleteBlog = async (id) => {
    try{
        const res = await axios.delete(`${process.env.REACT_APP_URL}/blog/${id}`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("jwt"),
            }
        })
        return res.data;
    }catch (error) {
        throw error;
    }
}

export const imgUpload = async (formData) => {
    console.log("보내기 전 "+formData.getAll("files"));
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/blog/upload`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        });
        return res.data.data;
    }catch (error) {
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
        const res = await axios.put(`${process.env.REACT_APP_URL}/blog`,data,{
            headers : {
                "Content-Type": "application/json",
            }
        })
        console.log("게시물 수정성공");
    }catch (error) {
        console.log(error);
    }
}

