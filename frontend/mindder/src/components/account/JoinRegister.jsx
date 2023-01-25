// 회원가입-정보 등록
import React from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/css/main.css';

function JoinRegister(props) {
  
  const navigate = useNavigate();

  return (
        <form className="box">
            <div className="col-12">
                <label className="form-label"> 이메일</label>
                <p> 앞에서 등록한 이멜</p>
            </div>
            <div className="col-12">
                <label className="form-label"> 닉네임</label>
                <div className="logo-container">
                    <input type="text" name="nickname" id="nickname" placeholder=" 닉네임" />
                    <button className="white-black-line-btn">확인</button>
                </div>
            </div>
            <div className="col-12">
                <label className="form-label">비밀번호</label>
                <input type="password" name="password" id="password" placeholder=" 비밀번호" />
            </div>
            <div className="col-12">
                <label className="form-label">비밀번호 확인</label>
                <input type="password" name="passwordCheck" id="passwordCheck" placeholder=" 비밀번호 확인"/>
                <label className="warning" v-if="notSamePassword">비밀번호를 확인하세요.</label>
            </div>
            <div className="col-12">
                <label className="form-label">나의 색</label>
                <input type="color" name="myColor" id="myColor"/>
            </div>
            <div className="center-container">
              <button className="maincolor-white-btn"
                  onClick={() => {
                      navigate("/login");
                  }}>
                  가입하기
              </button>
            </div>
        </form>
  )
}

export default JoinRegister;