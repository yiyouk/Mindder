import React from "react";
import { useNavigate } from "react-router-dom";
import LogoW from "../../assets/images/MainLogo.png"
import Logo from "../../assets/images/Logo.png";

import styled from "styled-components";

import naver_login from "../../assets/images/naver_login.png";
import kakao_login from "../../assets/images/kakao_login.png";

import { KAKAO_AUTH_URL } from "../../social/OAuth";

const Top = styled.div`
    width: 22rem;
    height: 4rem;
`;

const Bottom = styled.div`
    width: 22rem;
    height: 2rem;
`;

const Lnaver = styled.div`
    width: 22rem;
    height: 0.5rem;
`;


function Home(props) {
    const navigate = useNavigate();
    return (
        <div id="main" className="start-screen">
            <Top className="start-screen"/>
            <div className="center-container">
                <img className="logoText" src={LogoW}/>
                <img className="logo" src={Logo}/>
            </div>
            <div className="center-container">
                <div className="login-btn" onClick={() => {navigate("/login");}}>로그인</div>
                <Lnaver className="pad"/>
                <div className="naver"><img src={naver_login} style={{width:"10.5rem"}}
                /></div>
                <Lnaver className="pad"/>
                <img src={kakao_login} style={{width:"11.5rem"}} 
                onClick={()=>{window.open("https://mindder.me/users/social/kakao", '_blank')}}/>
                <Lnaver className="pad"/>
            </div>
            <div className="right-container">
                <span className="text-white"  onClick={() => {
                      navigate("/join");
                  }}>회원가입</span>
                <span className="text-white"> | </span>
                <span className="text-white" onClick={() => {
                      navigate("/accounts/password/find");
                  }}> 비밀번호 찾기</span>
            </div>
            <Bottom className="start-screen"/>
         </div>
    );
}

export default Home;
