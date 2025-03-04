import axios from "axios";

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
        return res.data;
    }catch (error) {
        throw error;
    }
}


export const myProfile  = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/user/myprofile`,{
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

