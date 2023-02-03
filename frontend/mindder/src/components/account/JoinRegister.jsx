// 회원가입-정보 등록
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//비동기 동신
import api from "../../api/api";

import '../../assets/css/main.css';

function JoinRegister({email}) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [myColor, setMyColor] = useState(1);

  
  //닉네임 입력중
  const handleNickname = e => {
    setNicknameCheck(false);
    setNickname(e.target.value);
  }

    
  //비번 입력중
  const handlePassword = e => {
    setPassword(e.target.value)
  }

    
  //비번체크 입력중
  const handlePasswordCheck = e => {
    setPasswordCheck(e.target.value)
  }

    
  //내 색 입력중
  const handleMyColor = e => {
  }

  //닉네임 중복 확인
  const handleCheckNick = e => {
    // console.log(email);
    if(nickname === ""){
        alert("닉네임 입력해주세요.");
    } else{
        getNick();                                                                                 
    }
  }

  //닉네임 중복 확인 비동기 통신
  async function getNick(){ // async, await을 사용하는 경우
    try {
        const response = await api.get(`/users/check-nickname/${nickname}`, null);
        if(response.data.data.available){
            setNicknameCheck(true);
            alert("사용 가능한 닉네임입니다.");
        } else{
            alert("이미 존재하는 닉네임입니다.");
        }
        
    } catch (e) {
        console.error(e);
        navigate("/error");
    }
  }

  //회원가입시도
  const join = e => {
    if(nickname === ""){
        alert("닉네임 입력해주세요.");
    } else if(!nicknameCheck){
        alert("닉네임 확인을 완료해주세요.");                                                                             
    } else if(password !== passwordCheck){
        alert("비밀번호와 확인 비밀번호가 다릅니다.");                                                                             
    } else if(myColor ===""){
        alert("나의 색을 선택해주세요.");                                                                             
    } else {
        getjoin();
    }
  }

    //회원가입 비동기 통신
    async function getjoin(){ // async, await을 사용하는 경우
        try {
            const response = await api.post(`/users`,
            {   
                nickname: nickname,
                email: email,
                password: password,
                emoteColorIdx: myColor,
                socialId: "@mindder"
            });
            
            
            if(response.data.success){
                alert("회웝가입이 완료되었습니다.");
                navigate("/login");
            } else{
                alert("오류입니다. 다시 시도해주세요.");
                navigate("/error");
            }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
      }

  return (
        <form className="box">
            <div className="col-12">
                <label className="form-label"> 이메일</label>
                <p> {email} </p>
            </div>
            <div className="col-12">
                <label htmlFor="nickname" className="form-label"> 닉네임</label>
                <div className="logo-container">
                    <input value={nickname} type="text" name="nickname" id="nickname" placeholder=" 닉네임" onChange={handleNickname}/>
                    <input className="white-black-line-btn" type="button" value="중복 확인" onClick={handleCheckNick}/>
                </div>
            </div>
            <div className="col-12">
                <label htmlFor="password" className="form-label">비밀번호</label>
                <input value = {password} type="password" name="password" id="password" placeholder=" 비밀번호"  onChange={handlePassword}/>
            </div>
            <div className="col-12">
                <label htmlFor="passwordCheck" className="form-label">비밀번호 확인</label>
                <input value = {passwordCheck}  type="password" name="passwordCheck" id="passwordCheck" placeholder=" 비밀번호 확인" onChange={handlePasswordCheck}/>
                {/* {passwordCheckB ? null : <label className="warning">비밀번호를 확인하세요.</label>} */}
            </div>
            <div className="col-12">
                <label htmlFor="myColor" className="form-label" >나의 색</label>
                <input value={myColor} type="text" name="myColor" id="myColor"  onChange={handleMyColor}/>
            </div>
            <div className="center-container">
            <input className="maincolor-white-btn" type="button" value="가입하기" onClick={join}/>
            </div>
        </form>
  )
}

export default JoinRegister;