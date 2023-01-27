// 개인정보 수정
import React from "react";
import '../../assets/css/main.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sample from "../../assets/images/pro.jpg"

const Pro = styled.div`
  width: 5rem;
  height: 5rem;
  background-image:url(${Sample});
  background-size:cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 100px;
`
const Sns = styled.div`
    color: #787777;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
`;

const P = styled.div`
    color: #787777;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

function ModifySNS(props) {
    const navigate = useNavigate();

    return(
        <form className="box">
            <Sns>SNS가입 회원입니다.</Sns>
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
            <P> &nbsp; yiyo@naver.com</P>
        </div>
        <div className="col-12">
            <label className="form-label"> 닉네임</label>
            <input type="text" name="nickname" id="nickname" placeholder=" 닉네임" />
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

export default ModifySNS;