import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getCookie, setCookie, removeCookie} from "../api/cookie";

//로그인 유지
import { useDispatch} from "react-redux";

//비동기 동신
import api from "../api/api";

import '../assets/css/main.css';
import {SAVE_nickName, SAVE_myIdx, DELETE_TOKEN, SET_TOKEN } from "../redux/reducers";

function LoginPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //이메일 input 받기
    const handleChangeEmail = e => {
        setEmail(e.target.value);
    }

    //비밀번호 input 받기
    const handleChangePw = e => {
        setPassword(e.target.value);
    }

    //로그인 시도했을때
    const handleSubmit = e => {
        console.log("로그인 시도")
        if(email === ""){
            alert("이메일을 입력해주세요.");
        } else if(password === ""){
            alert("비밀번호를 입력해주세요.");
        } else{
            getUser();                                                                                      
        }
    }

    //로그인 비동기 통신
    const getUser = async() => {
        try {
            const response = await api.post(`/users/login`,
            {   
                email: email,
                password: password
            });

            
            if(response.data.success===true){
                const accessToken = response.data.data.accessToken;
                const nickname = response.data.data.nickname;
                const userIdx = response.data.data.userIdx;

                //원래 쿠키가 있다면?
                if(!getCookie("is_login")){
                    //쿠키 삭제
                    //전역 변수 삭제
                    dispatch(DELETE_TOKEN())
                    dispatch(SAVE_nickName(""))
                    dispatch(SAVE_myIdx(null))

                    removeCookie("is_login")
                }
                        
                //쿠키 새롭게 세팅
                setCookie("is_login", accessToken);

                //전역 변수 세팅
                dispatch(SET_TOKEN("is_login", accessToken));
                dispatch(SAVE_nickName(nickname))
                dispatch(SAVE_myIdx(userIdx))
                navigate("/");
            } else{
                alert("로그인 정보를 다시 확인해주세요.");
            }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }
    
    return (
        <div id="main">
            <header>
                <h2> 로그인 </h2>
            </header>
            <form className="box">
                <div className="col-12">
                    <label htmlFor="email" className="form-label"> 이메일</label>
                    <input value={email} type="text" name="email" id="email" placeholder=" 이메일" onChange={handleChangeEmail}/>
                </div>
                <div className="col-12">
                    <label htmlFor= "password"className="form-label">비밀번호</label>
                    <input value={password} type="password" name="password" id="password" placeholder=" 비밀번호" autoComplete="off" onChange={handleChangePw}/>
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