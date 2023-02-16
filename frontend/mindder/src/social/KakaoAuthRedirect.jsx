// 소셜로그인 시 리다이렉트될 화면 컴포넌트
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import api from "../api/api"
import {getCookie, setCookie, removeCookie} from "../api/cookie";
import {SAVE_nickName, SAVE_myIdx, DELETE_TOKEN, SET_TOKEN } from "../redux/reducers";
import Swal from "sweetalert2";
import '../assets/css/main.css';
import loading from "../assets/images/Loading.png"
import { useNavigate } from "react-router-dom";
import LoadingPage from "../router/LoadingPage";

function KakaoAuthRedirect  (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code')

  const kakaoLogin = async()=>{
    try {
      const response = await api.get(`/users/social/kakao?code=${code}`);
      console.log(response.data)
      if (response.data.success===true){
        const accessToken = response.data.data.accessToken;
        const nickname = response.data.data.nickname;
        const userIdx = response.data.data.userIdx;
        if(!getCookie("is_login")){
          //쿠키 삭제
          //전역 변수 삭제
          dispatch(DELETE_TOKEN())
          dispatch(SAVE_nickName(""))
          dispatch(SAVE_myIdx(null))

          removeCookie("is_login")
        }
        //쿠키 새롭게 세팅
        setCookie("is_login", accessToken);

        //전역 변수 세팅
        dispatch(SET_TOKEN("is_login", accessToken));
        dispatch(SAVE_nickName(nickname))
        dispatch(SAVE_myIdx(userIdx))
        navigate("/");
      } else {
        Swal.fire({
            icon: 'warning',               
            width: 300,
            iconColor: '#7767FD',
            text: '로그인 정보를 다시 확인해주세요.', 
            confirmButtonColor: '#7767FD',
            confirmButtonText: '확인',})
    }
    } catch (error) {
      console.log(error)
      navigate("/error");
    }
  }

  useEffect( () => {
    kakaoLogin()
  }, []);

  return (
    <>
      <LoadingPage/>
    </>
  )
};

export default KakaoAuthRedirect;