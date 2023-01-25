// 개인정보 수정
import React from "react";
import '../../assets/css/main.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sample from "../../assets/images/pro.jpg"

const Pro = styled.div`
  width: 6rem;
  height: 6rem;
  background-image:url(${Sample});
  background-size:cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 100px;
`

function ModifyMindder(props) {
    const navigate = useNavigate();

    return(
        <form className="box">
            <div className="col-12">
            <label className="form-label"> 사진</label>
            <div className="center-container">
                <Pro></Pro>     
            </div>
            <div className="logo-container">
              <button className="white-black-line-btn"
                  onClick={() => {
                      navigate("/");
                  }}>
                  수정
              </button>
              <button className="white-black-line-btn"
                  onClick={() => {
                      navigate("/");
                  }}>
                  삭제
              </button>
            </div>
        </div>
        <div className="col-12">
            <label className="form-label"> 이메일</label>
            <p> 앞에서 등록한 이멜</p>
        </div>
        <div className="col-12">
            <label className="form-label"> 닉네임</label>
            <input type="text" name="nickname" id="nickname" placeholder=" 닉네임" />
        </div>
        <div className="col-12">
            <label className="form-label">비밀번호</label>
            <div className="center-container">
            <button className="white-black-line-btn"
              onClick={() => {
                  navigate("/accounts/password/change");
              }}>
              비밀번호 변경하기
          </button>
          </div>
        </div>
        <div className="col-12">
            <label className="form-label">나의 색</label>
            <input type="color" name="myColor" id="myColor"/>
        </div>
        <div className="center-container">
          <button className="maincolor-white-btn"
              onClick={() => {
                  navigate("/");
              }}>
              수정하기
          </button>
        </div>
    </form>
    );
}

export default ModifyMindder;