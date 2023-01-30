// 회원가입 이메일 인증
import React from "react";
import EmailImg from "../../assets/images/email.png"

function JoinEmail(props) {
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
                <input type="text" name="email" id="email" placeholder=" 이메일" />
                <button className="white-black-line-btn">중복 확인</button>
                <button className="white-black-line-btn">전송 요청</button>
            </div>
          </form>
        <form>
            <div className="logo-container">
                <input type="text" name="emailcheck" id="emailcheck" placeholder=" 인증 번호 입력" />
                <button className="white-black-line-btn">확인</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default JoinEmail;