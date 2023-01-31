// 회원가입 이메일 인증
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailImg from "../../assets/images/email.png"

//비동기 동신
import api from "../../api/api";

function JoinEmail(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);


  const handleChangeEmail = e => {
    setEmailCheck(false);
    setEmail(e.target.value);
  }

  //이메일 중복 확인
  const handleCheckEmail = e => {
    console.log(email);
    console.log("이메일 중복 확인")
    if(email === ""){
        alert("이메일을 입력해주세요.");
    } else{
        getCheckEmail();                                                                                 
    }
  }

  //이메일 중복 확인 비동기 통신
  async function getCheckEmail(){ // async, await을 사용하는 경우
    try {
        const response = await api.get(`/users/check-email/${email}`, null);

        // console.log(response.data)
        if(response.data.data.available===true){
          setEmailCheck(true);
          alert("사용 가능한 이메일입니다.");
          } else{
          alert("이미 존재하는 회원입니다.");
        }
        
    } catch (e) {
        console.error(e);
        navigate("/error");
    }
  }

  //이메일 보내기
  const handleEmailSend = e => {
    if(emailCheck){
      getEmailSend();
        alert(`${email} 로 인증 번호가 발송되었습니다.`);
    } else{
      alert("이메일 중복확인을 완료해주세요.");                                                                             
    }
  }

    //이메일 보내기 비동기 통신
    async function getEmailSend(){ // async, await을 사용하는 경우
      try {
          const response = await api.get(`/users/${email}`);
          setEmailCheck = response.data;

          console.log(response.data);
  
          //이메일 인증 미구현 됐다 치고 
          
      } catch (e) {
          console.error(e);
          navigate("/error");
      }
    }


  //이메일 번호 인증
  const handleEmailCheck = e => {
    //백엔드 미구현 일단  ok하기 쓰기
    props.getData(email);
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
                  <input className="white-black-line-btn" type="button" value="중복 확인" onClick={handleCheckEmail}/>
                  <input className="white-black-line-btn" type="button" value="전송 요청" onClick={handleEmailSend}/>
              </div>
        </form>
        <form>
              <div className="logo-container">
                  <input type="text" name="emailcheck" id="emailcheck" placeholder=" 인증 번호 입력" />
                  <input className="white-black-line-btn" type="button" value="확인" onClick={handleEmailCheck}/>
              </div>
        </form>
      </div>
    </div>
  )
}

export default JoinEmail;