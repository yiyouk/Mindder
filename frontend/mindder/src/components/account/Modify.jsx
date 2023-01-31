import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

//비동기 동신
import api from "../../api/api";

import '../../assets/css/main.css';

const Sns = styled.div`
    color: #787777;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
`;

function Modify(props) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [nicknameOrigin, setnicknameOrigin] = useState("");
    const [nicknameCheck, setNicknameCheck] = useState(true);
    // const [password, setPassword] = useState("");
    const [myColor, setMyColor] = useState(1);
    const [socialId, setSocialId] = useState("");
 
    useEffect(()=>{
        getUserInfo();
    }, [])


    //닉네임 입력중
    const handleNickname = e => {
        setNicknameCheck(false);
        setNickname(e.target.value);
    }


    //닉네임 중복 확인
    const handleCheckNick = e => {
        // console.log(email);
        if(nickname === ""){
            alert("닉네임 입력해주세요.");
        } else if(nicknameOrigin === nickname) {
            alert("원래 닉네임 입니다.");
        }else{
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


    //닉네임 수정하기
    const handleModify = e => {
        if(nicknameOrigin === nickname) {
            setNicknameCheck(true);
        }

        if(nickname === ""){
            alert("닉네임 입력해주세요.");
        } else if(!nicknameCheck){
            alert("닉네임 중복 확인을 완료해주세요.");                                                                             
        } else {
            sendInfo();
            navigate("/accounts/edit");
        }
    }

    const isLoggedIn = useSelector((state)=>state.authToken)

    //현재 accesstonken에 맞는 user 정보 불러오기
    async function getUserInfo(){ // async, await을 사용하는 경우
        try {
            console.log("--------------------##########################-----------------------------------")
            console.log(isLoggedIn);
            const response = await api.get(`/users/information`, null);
            console.log(response.data);
            console.log("-------------------------------------------------------")
            setEmail(response.data.data.email);
            setNickname(response.data.data.nickname);
            setnicknameOrigin(response.data.data.nickname);
            setMyColor(response.data.data.emoteColor);
            setSocialId(response.data.data.socialId);
            
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

    //정보 수정하기
    async function sendInfo(){ // async, await을 사용하는 경우
        try {
            const response = await api.patch(`/users`, {
                profileImageUrl: profile,
                nickname: nickname,
                emoteColor : myColor, 
            },null);
            console.log(response.data);
            if (response.data.success===true){
                getUserInfo()
            }
            navigate("/accounts/edit");   
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

    return(
        <form className="box">
            {(socialId === "@mindder")? <Sns></Sns>: null}
            <div className="col-12">
            <label className="form-label"> 사진</label>
            <div className="center-container">
                <img scr={profile}/>
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
                <p> {email} </p>
        </div>
            <label htmlFor="nickname" className="form-label"> 닉네임</label>
            <div className="logo-container">
                <input value={nickname|| ''} type="text" name="nickname" id="nickname" placeholder=" 닉네임" onChange={handleNickname}/>
                <input className="white-black-line-btn" type="button" value="중복 확인" onClick={handleCheckNick}/>
            </div>
        {
        (socialId === "@mindder")? 
        <div className="col-12">
            <label className="form-label">비밀번호</label>
            <div className="center-container"> 
            <button className="white-black-line-btn"
              onClick={() => {
                  navigate("/accounts/password/change");
              }}>
              비밀번호 수정
              </button>
          </div>
        </div>
        :
        null
        }
        <div className="col-12">
            <label className="form-label">나의 색</label>
            <input type="color" name="myColor" id="myColor"/>
        </div>
        <div className="center-container">
        <input className="maincolor-white-btn" type="button" value="수정하기" onClick={handleModify}/>
        </div>
    </form>
    );
}

export default Modify;