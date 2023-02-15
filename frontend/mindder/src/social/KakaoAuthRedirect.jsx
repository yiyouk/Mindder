// 소셜로그인 시 리다이렉트될 화면 컴포넌트

import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import api from "../api/api"
import axios from "axios";

const KakaoAuthRedirect = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  // let code = new URL(window.location.href).searchParams.get('code')
  // console.log(code)

  // const kakaoLogin = async()=>{
  //   try {
  //     const response = await api.get(`/users/social/kakao?code=${code}`);
  //     console.log(response.data)
  //     // if (response.data.success)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect( () => {
    // kakaoLogin()
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