// 개인정보 수정
import React, {useState, useEffect} from "react";
import '../../assets/css/main.css';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//비동기 동신
import api from "../../api/api";


function ModifyMindder(props) {
    const navigate = useNavigate();
    // const [nickname, setNickname] = useState("");
    // const [nicknameCheck, setNicknameCheck] = useState(true);
    const [img, setImg] = useState("");
    // const [myColor, setMyColor] = useState(1);
    
    useEffect(()=>{
        getUserInfo();
    }, [])

    async function getUserInfo(){ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/users/information`, null);
            
            console.log(response);
            // if(response.data==="fail"){
            //     alert("이미 존재하는 회원입니다.");
            // } else{
            //     // setEmailCheck(true);
            //     alert("사용 가능한 이메일입니다.");
            // }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
      }

    return(
        <form className="box">
            <div className="col-12">
            <label className="form-label"> 사진</label>
            <div className="center-container">
                <img scr={img}/>
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