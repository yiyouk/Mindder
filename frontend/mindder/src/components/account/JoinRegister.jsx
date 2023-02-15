// 회원가입-정보 등록
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";
import { Colors16 } from "../../redux/reducers";

//비동기 동신
import api from "../../api/api";
import Swal from "sweetalert2";
import '../../assets/css/main.css';

const colortyles = css`
  ${({mypick}) => css`
    background-color: ${mypick};
  `}
`;
//누르면 나오는거
const DropDown = styled.div`
    background-color: white;
    border: none;
    outline:none;
    position: relative;
`;

const ListContainer = styled.span`
  background-color: white;
  border-radius: 0.3rem;
  border: solid 0.05rem gray;
  position: absolute;
  top:-3rem;
  right: 4rem;
  display:none;
  ${DropDown}:active & {
    display:grid;
    grid-template-columns:repeat(4, 1fr);
  }
  ${DropDown}:hover & {
    display:grid;
    grid-template-columns:repeat(4, 1fr);
  }
`;

const PickColor = styled.div`
    ${colortyles}
    width: 2rem;
    height: 2rem;
    border: solid 0.01rem rgb(231, 231, 231);
`;

const ColorStyled = styled.div`
    ${colortyles}
    width: 1.5rem;
    height: 1.5rem;
    border: solid 0.01rem rgb(231, 231, 231);
    &:hover {
        outline: 0.03rem solid black;
    }
    margin: 0.5rem;
`;

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

    
     //색 선택하기
     const handlePickColor = (e) =>{
        setMyColor(e);
    }

  //닉네임 중복 확인
  const handleCheckNick = e => {
    // console.log(email);
    if(nickname === ""){
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '닉네임을 입력해주세요.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})
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
            Swal.fire({
                icon: 'success',               
                width: 300,
                iconColor: '#7767FD',
                text: '사용 가능한 닉네임입니다.', 
                confirmButtonColor: '#7767FD',
                confirmButtonText: '확인',})
        } else{
            Swal.fire({
                icon: 'warning',               
                width: 300,
                iconColor: '#7767FD',
                text: '이미 존재하는 닉네임입니다.', 
                confirmButtonColor: '#7767FD',
                confirmButtonText: '확인',})
        }
        
    } catch (e) {
        console.error(e);
        navigate("/error");
    }
  }

  //회원가입시도
  const join = e => {
    if(nickname === ""){
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '닉네임을 입력해주세요.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})
    } else if(!nicknameCheck){
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '닉네임 중복 확인을 완료해주세요.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})                                                  
    } else if(password !== passwordCheck){
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '비밀번호와 확인 비밀번호가 다릅니다.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})                                                           
    } else if(myColor ===""){
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '나의 색을 선택해주세요.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})                                                           
    } else {
        getjoin();
    }
  }

    //회원가입 비동기 통신
    const getjoin = async() => { // async, await을 사용하는 경우
        try {
            const response = await api.post(`/users/join`,
            {   
                nickname: nickname,
                email: email,
                password: password,
                emoteColorIdx: myColor,
                socialId: "@mindder",
                fileIdx:305
            });
            
            
            if(response.data.success){
                Swal.fire({
                    icon: 'success',               
                    width: 300,
                    iconColor: '#7767FD',
                    text: '회원가입이 완료되었습니다.', 
                    confirmButtonColor: '#7767FD',
                    confirmButtonText: '확인',})
                navigate("/login");
            } else{
                Swal.fire({
                    icon: 'warning',               
                    width: 300,
                    iconColor: '#7767FD',
                    text: '오류입니다. 다시 시도해주세요.', 
                    confirmButtonColor: '#7767FD',
                    confirmButtonText: '확인',})         
                navigate("/error");
            }
            
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
      }

  return (
        <div className="box">
            <div className="col-12">
                <label className="form-label"> 이메일</label>
                <div className="logo-container"> {email} </div>
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
                <label className="form-label">나의 색</label>
                <DropDown>
                    <PickColor mypick = {Colors16[myColor].code}/>
                    <ListContainer>
                        {Colors16.slice(1).map((color)=>(
                            color.id !== 0 ?<ColorStyled mypick={color.code} onClick={()=>handlePickColor(color.id)} key={color.id}/>:null
                        ))} 
                    </ListContainer>
                </DropDown>     
            </div>
            <div className="center-container">
            <input className="maincolor-white-btn" type="button" value="가입하기" onClick={join}/>
            </div>
        </div>
  )
}

export default JoinRegister;