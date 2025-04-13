import axios from 'axios';

export const refreshToken = async (data) => {
    const token = localStorage.getItem("jwt");
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/refresh`, {token},
            {
                headers : {
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+localStorage.getItem("jwt"),
                }
            }
        );
        if(!response.data.data.tokenFlag){
            return;
        }else{
            localStorage.setItem("jwt",response.data.data.refreshToke);
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers:{'Content-Type':'application/json'},
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            const data = await refreshToken(token);  // 토큰 갱신
        }
        return config;  // 요청 config 반환
    },
    (error) => {
        return Promise.reject(error);  // 에러 반환
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        // console.log("인터셉터 응답 "+JSON.stringify(response));
        return response;  // 응답을 반환
    },
    (error) => {
        console.log("인터 셉터 오류 "+error)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("jwt");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            alert("세션이 만료되어 다시 로그인 해주세요.");
            window.location.href = "/login";
        }

        // localStorage.removeItem("jwt"); // 토큰 삭제
        //         // localStorage.removeItem("name");
        //         // localStorage.removeItem("email");
        //         // alert("다시 로그인 해주시기 바랍니다.")
        //         // window.location.href = "/login"; // 로그인 페이지로 리디렉트
        //         //
                console.log("인터셉터"+error);
        return Promise.reject(error);  // 응답 에러 반환
    }
);
export default axiosInstance;