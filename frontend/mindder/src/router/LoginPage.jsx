import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getCookie, setCookie, removeCookie} from "../api/cookie";

//로그인 유지
import { useDispatch} from "react-redux";
import {tokenAction, userAction} from "../redux/store"

//비동기 동신
import axios from "axios";
import api from "../api/api";

import '../assets/css/main.css';

function LoginPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    //닉네임 가져오기
    const setUserInfo = async () =>{ // async, await을 사용하는 경우
        try {
            console.log("이곳은 setUserInfo 함수")
            console.log(getCookie("is_login"));
            const response = await axios.get(`http://mindder.me:8888/users/information`, {
                headers: { access_token : `${getCookie("is_login")}` }
            });
            console.log(response);

            if(response.data.data !== null) {
                const NickName = response.data.data.nickname;
                const UserIdx = response.data.data.userIdx
                console.log(UserIdx)
                dispatch(userAction.SAVE({selected:UserIdx, case:"userIdx"}))
                console.log(`유저아이디 저장`)
                dispatch(userAction.SAVE({selected:NickName, case:"nickName"}))
            }
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

    async function getUser(){ // async, await을 사용하는 경우
        try {
            const response = await api.post(`/users/login`,
            {   
                email: email,
                password: password
            });

            
            if(response.data.success===true){
                const accessToken = response.data.data.accessToken;

                if(getCookie("is_login") !== undefined){
                    removeCookie("is_login")
                    dispatch(tokenAction.DELETE_TOKEN("is_login"))
                }
                        
                setCookie("is_login", accessToken);
                dispatch(tokenAction.SET_TOKEN(accessToken));
                
                console.log("현재 setting cookie");
                console.log(getCookie("is_login"));
                console.log("밑에서 get Name 부른다.")

                setUserInfo();

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