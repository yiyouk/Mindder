import React from "react";
import { useNavigate } from "react-router-dom";
import LogoW from "../../assets/images/LogoW.png"
import Logo from "../../assets/images/Logo.PNG";
import Never from "../../assets/images/Never.png";
import Kakao from "../../assets/images/Kakao.png";

function Home(props) {
    const navigate = useNavigate();
    return (
        <div id="main" className="start-screen">
            <div className="center-container">
                <img className="logoText" src={LogoW}/>
                <img className="logo" src={Logo}/>
            </div>
            <div className="center-container">
                <button className="white-black-btn" onClick={() => {
                      navigate("/login");
                  }}>로그인</button>
                <div className="logo-container">
                    <img className="snslogos" src={Never}/>
                    <img className="snslogos" src={Kakao}/>
                </div>
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
         </div>
    );
}

export default Home;
