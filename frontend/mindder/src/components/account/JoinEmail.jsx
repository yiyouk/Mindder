// 회원가입 이메일 인증
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailImg from "../../assets/images/email.png"

//비동기 동신
import api from "../../api/api";
import Swal from "sweetalert2";

function JoinEmail({getData}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false); //이메일 중복 완료 여부
  const [inputCode, setInputCode] = useState(""); //사용자 입력 인증 번호
  const [sendCode, setSendCode] = useState("0"); //실제 인증 번호


  //이메일 중복 확인 데이터
  const handleChangeEmail = e => {
    setEmailCheck(false);
    setEmail(e.target.value);
  }
  
  //이메일 인증 데이터
  const handleGetEmail = e => {
    setInputCode(e.target.value);
  }

  //이메일 입력했다면 중복 확인
  const handleCheckEmail = e => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(email === ""){
        Swal.fire({
          icon: 'warning',               
          width: 300,
          iconColor: '#7767FD',
          text: '이메일을 입력해주세요.', 
          confirmButtonColor: '#7767FD',
          confirmButtonText: '확인',
        });
    } else{
        if(!emailRegex.test(email)) {
            Swal.fire({
              icon: 'warning',               
              width: 300,
              iconColor: '#7767FD',
              text: '이메일 형식을 확인해주세요.', 
              confirmButtonColor: '#7767FD',
              confirmButtonText: '확인',})
        } else {
        getCheckEmail();//이메일 중복확인                                                                           
      }
    }
  }

  //이메일 중복 확인 비동기 통신
  async function getCheckEmail(){ // async, await을 사용하는 경우
    try {
        const response = await api.get(`/users/check-email/${email}`, null);

        if(response.data.data.available===true){
          setEmailCheck(true);
          Swal.fire({
            icon: 'success',               
            width: 300,
            iconColor: '#7767FD',
            text: '사용 가능한 이메일입니다.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})
          } else{
            Swal.fire({
              icon: 'warning',               
              width: 300,
              iconColor: '#7767FD',
              text: '이미 존재하는 회원입니다.', 
              confirmButtonColor: '#7767FD',
              confirmButtonText: '확인',})
        }
        
    } catch (e) {
        console.error(e);
        navigate("/error");
    }
  }

  //이메일 보내기
  const handleEmailSend = e => {
    if(emailCheck){
      Swal.fire({
        icon: 'success',               
        width: 300,
        iconColor: '#7767FD',
        text: `${email} 로 인증 번호가 발송되었습니다.`, 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',})
      getEmailSend();
    } else{
      Swal.fire({
        icon: 'warning',               
        width: 300,
        iconColor: '#7767FD',
        text: '이메일 중복확인을 완료해주세요.', 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',})                                                        
    }
  }

    //이메일 보내기 비동기 통신
    const getEmailSend = async() => { // async, await을 사용하는 경우
      try {
          const response = await api.get(`/users/email-confirm/${email}`);
          console.log(response.data);
          setSendCode(response.data.data);   
      } catch (e) {
          console.error(e);
          navigate("/error");
      }
    }


  //이메일 번호 인증 확인 클릭시
  const handleEmailCheck = e => {
    if(inputCode == sendCode){
      getData(email);
      Swal.fire({
        icon: 'success',               
        width: 300,
        iconColor: '#7767FD',
        text: "이메일 인증이 완료되었습니다.", 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',})
    } else if(!setEmailCheck){
      Swal.fire({
        icon: 'warning',               
        width: 300,
        iconColor: '#7767FD',
        text: '이메일 중복확인 후 이메일 인증을 완료해주세요.', 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',}) 
    } else {
      Swal.fire({
        icon: 'warning',               
        width: 300,
        iconColor: '#7767FD',
        text: '이메일 인증 번호가 틀렸습니다.', 
        confirmButtonColor: '#7767FD',
        confirmButtonText: '확인',})
    }

  }

  return (
    <div>
      <div className="center-container">
        <img className="email-logo" src={EmailImg} alt=""/>
        <p className="removeText">mindder 서비스 이용을 위해서는</p>
        <p className="removeText">이메일 인증이 필요합니다.</p>
      </div>
      <div>
        <p className="form-label-center"> 이메일 인증</p>
        <form>
              <div className="logo-container">
                  <input value={email} type="text" name="email" id="email" placeholder=" 이메일" onChange={handleChangeEmail}/>
                  {emailCheck ?
                    <input className="white-black-line-btn" type="button" value="전송 요청" onClick={handleEmailSend}/>
                    :
                    <input className="white-black-line-btn" type="button" value="중복 확인" onClick={handleCheckEmail}/>
                  }
              </div>
        </form>
        {emailCheck ? 
        <form>
              <div className="logo-container">
                  <input type="text" name="emailcheck" id="emailcheck" placeholder=" 인증 번호 입력"  onChange={handleGetEmail}/>
                  <input className="white-black-line-btn" type="button" value="확인" onClick={handleEmailCheck}/>
              </div>
        </form>
        : null
        }
      </div>
    </div>
  )
}

export default JoinEmail;