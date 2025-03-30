import React, { useState } from 'react';
import '../../css/user/Login.css'
import {useNavigate} from "react-router-dom";
import {signIn} from "../../api/UserApi";

const initState={
    email:"",
    password:"",
}
const SignInPage = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (email && password) {
            initState.email = email;
            initState.password = password;
            signIn(initState)
                .then(response => {
                    console.log("로그인 성공", response.data);
                    if(response.code==="403"){
                        setError(response.message);
                    }else if(response.code==="200"){
                        localStorage.setItem("jwt",response.data.accessToken)
                        localStorage.setItem("name",response.data.name)
                        localStorage.setItem("email",response.data.email)
                        window.location.href="/";
                    }
                })
                .catch(error => {
                    console.log(error)
                    setError(error.response.data.message);
                });

            // 여기에 API 호출 등을 추가할 수 있습니다.
        } else {
            setError('이메일와 비밀번호를 입력해주세요.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>로그인</h2>
                <div className="input-field">
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button className="login-button" onClick={handleLogin}>
                    로그인
                </button>
                <div className="signup-link">
                    <button className="signup-button" onClick={()=>{navigate('/signup')}}>
                        회원 가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
