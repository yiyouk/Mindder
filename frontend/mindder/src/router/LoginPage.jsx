// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/main.css'


function LoginPage(props) {
    const navigate = useNavigate();

    return (
        <div id="main">
        <header>
            <h2>로그인</h2>
        </header>
        <form className="box">
            <div className="col-12">
                <label className="form-label"> 이메일</label>
                <input type="text" name="email" id="email" placeholder=" 이메일" />
            </div>
            <div className="col-12">
                <label className="form-label">비밀번호</label>
                <input type="password" name="password" id="password" placeholder=" 비밀번호" />
            </div>
            <div className="center-container">
                <button className="maincolor-white-btn"
                  onClick={() => {
                      navigate("/");
                  }}>
                  로그인
              </button>
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
