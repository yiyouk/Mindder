import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/main.css'
import {setCookie} from "../api/cookie";

//비동기 동신
import api from "../api/api";

//로그인 유지
// import store from "../store/modules/userStore";

function LoginPage(props) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    }

    const handleChangePw = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        console.log(email);
        console.log(password);
        console.log("로그인 시도")
        if(email === ""){
            alert("이메일을 입력해주세요.");
        } else if(password === ""){
            alert("비밀번호를 입력해주세요.");
        } else{
            getUser();                                                                                      
        }
    }

    async function getUser(){ // async, await을 사용하는 경우
        try {
            const response = await api.post(`/users/login`,
            {   
                email: email,
                password: password
            });

            console.log(response.data);

            if(response.data==="fail"){
                alert("로그인 정보를 다시 확인해주세요.");
            } else{
                const accessToken = response.data.accessToken;
                //setcookie함수의 첫번째 인자는 쿠키이름, 두번째 인자는 넣을 값이다.
                setCookie("is_login", `${accessToken}`); 
                alert("로그인 성공");
                navigate("/");
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    
    return (
        <div id="main">
        <header>
            <h2>로그인</h2>
        </header>
        <form className="box">
            <div className="col-12">
                <label htmlFor="email" className="form-label"> 이메일</label>
                <input value={email} type="text" name="email" id="email" placeholder=" 이메일" onChange={handleChangeEmail}/>
            </div>
            <div className="col-12">
                <label htmlFor= "password"className="form-label">비밀번호</label>
                <input value={password} type="password" name="password" id="password" placeholder=" 비밀번호" onChange={handleChangePw}/>
            </div>
            <div className="center-container">
             <input className="maincolor-white-btn" type="button" value="로그인" onClick={handleSubmit}/>
            </div>
        </form>
        <div className="right-container">
            <span className="text-black" onClick={() => {
                      navigate("/accounts/password/find");
                  }}>비밀번호 찾기</span> 
            <span className="text-black">|</span> 
            <span className="text-black" onClick={() => {
                      navigate("/join");
            }}>회원가입</span>
        </div>
    </div>
    );
}

export default LoginPage;
