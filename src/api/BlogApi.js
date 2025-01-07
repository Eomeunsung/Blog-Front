import axios from "axios";

export const getBlog  = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_URL}/blog`,{
            headers : {
                "Content-Type": "application/json",
            }
        });
        return res.data.data;
    }catch (error) {
        console.log(error);
    }
}

export const writeBlog = async (data) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_URL}/blog/write`,data,{
            headers : {
                "Content-Type": "application/json",
            }
        })
    }catch (error) {
        console.log(error);
    }
}

export const deleteBlog = async (id) => {
    try{
        const res = await axios.delete(`${process.env.REACT_APP_URL}/blog/${id}`,{
            headers : {
                "Content-Type": "application/json",
            }
        })
        console.log("삭제 성공");
    }catch (error) {
        console.log(error);
    }
}
