import axios from "axios";

export const chatRoomList = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/chat/list`,{
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