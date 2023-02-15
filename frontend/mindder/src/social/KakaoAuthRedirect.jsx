// 소셜로그인 시 리다이렉트될 화면 컴포넌트

import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import api from "../api/api"
import axios from "axios";

const KakaoAuthRedirect = (props) => {
  const dispatch = useDispatch();

  // const requestURL = `https://kauth.kakao.com/oauth/authorize?client_id=dc63597430966307c80d8e0e8c0d9b8a&redirect_uri=https://mindder.me/dev/users/social/kakao&response_type=code`;

  // const request = new XMLHttpRequest()
  // request.open('GET', requestURL)
  // request.responseType = 'json';
  // request.send();

  // console.log(request.response)
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code')
  console.log(code)

  const kakaoLogin = async()=>{
    try {
      const response = await api.get(`/users/social/kakao?code=${code}`);
      console.log(response.data)
      // if (response.data.success)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect( () => {

    // 1.여기서 axios로 백엔드에 보내서 엑세스 토큰받아옴
    // 2. 쿠키에 토큰 저장후 메인화면으로 리다이렉트
    kakaoLogin()
    // getToken(code)
  }, []);

  return (
    <>
      <h1>To. 백엔드</h1>
      <h2>인가코드를 받으면 엑세스토큰을 주시면 돼요</h2>
      <h2>그럼, 기다릴게요.</h2>
    </>
  )
};

export default KakaoAuthRedirect;