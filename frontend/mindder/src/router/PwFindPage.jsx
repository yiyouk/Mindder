// 회원가입 이메일 인증
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailImg from "../assets/images/email_find.png"
import styled from "styled-components";

//비동기 동신
import api from "../api/api";
import Swal from "sweetalert2";

import "../assets/css/main.css";


const W = styled.div`
    padding-top: 3rem;
    color: #464646;
    font-size: 1rem;
    /* font-weight: 600; */
    display: flex;
    justify-content: center;
`;

const Text = styled.div`
    padding-bottom: 0.5rem;
    color: #303030;
    font-size: 0.9rem;
    /* font-weight: 600; */
    display: flex;
    justify-content: center;
`;



function PwFindPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false); //이메일 있는지


  //이메일 입력시
  const handleChangeEmail = e => {
    setEmailCheck(false);
    setEmail(e.target.value);
  }
  
  //이메일 입력했다면 존재 확인
  const handleCheckEmail = e => {
    if(email === ""){
        Swal.fire({
          icon: 'warning',               
          width: 300,
          iconColor: '#7767FD',
          text: '이메일을 입력해주세요.', 
          confirmButtonColor: '#7767FD',
          confirmButtonText: '확인',})
    } else{
        getCheckEmail();//이메일 존재 확인                                                                  
    }
  }

  //이메일 존재 확인 비동기 통신
  async function getCheckEmail(){ // async, await을 사용하는 경우
    try {
        const response = await api.get(`/users/check-email/${email}`, null);

        if(response.data.data.available){
          Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '등록되지 않은 이메일입니다.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})
        } else{
            setEmailCheck(true);
        }
        
    } catch (e) {
      Swal.fire({
        icon: 'warning',               
        width: 300,
        iconColor: '#7767FD',
        text: '올바른 이메일 형식이 아닙니다.', 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',})
        // console.error(e);
        navigate("/error");
    }
  }

  //이메일 보내기
  const handleEmailSend = e => {
    if(emailCheck){
      sendNewEamil();
    } else{
      Swal.fire({
        icon: 'warning',               
        width: 300,
        iconColor: '#7767FD',
        text: '이메일 확인을 완료해주세요.', 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',})                                                          
    }
  }

    //이메일 보내기 비동기 통신
    const sendNewEamil = async () => { // async, await을 사용하는 경우
      try {
          const response = await api.patch(`/users/temp-password/${email}`);
          if(response.data.success){
            Swal.fire({
              icon: 'warning',               
              width: 300,
              iconColor: '#7767FD',
              text: `${email} 로 새 비밀번호가 발송되었습니다.`, 
              confirmButtonColor: '#7767FD',
              confirmButtonText: '확인',})    
            navigate("/login");
          } else {
            Swal.fire({
              icon: 'warning',               
              width: 300,
              iconColor: '#7767FD',
              text: '올바른 이메일 형식이 아닙니다.', 
              confirmButtonColor: '#7767FD',
              confirmButtonText: '확인',}) 
          }
      } catch (e) {
          // console.error(e);
          navigate("/error");
      }
    }

  return (
    <W>
      <div id="main">
       <header/>
        <div className="center-container">
          <img className="email-logo" src={EmailImg} alt=""/>
          <Text>비밀번호를 잊어버리셨나요?</Text>
          <Text>가입 이메일로 비밀번호 재발급이 가능합니다.</Text>
        </div>
        <header/>
        <div >
          <p className="form-label-center"> 비밀번호 재발급</p>
          <form className="form-label-center">
                    <input value={email} type="text" name="email" id="email" placeholder=" 이메일" onChange={handleChangeEmail}/>
                    {emailCheck ?
                      <input className="white-black-line-btn" type="button" value="전송 요청" onClick={handleEmailSend}/>
                      :
                      <input className="white-black-line-btn" type="button" value="이메일 확인" onClick={handleCheckEmail}/>
                    }
          </form>
        </div>
      </div>
    </W>
  )
}

export default PwFindPage;