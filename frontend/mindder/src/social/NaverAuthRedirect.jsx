// 소셜로그인 시 리다이렉트될 화면 컴포넌트
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import api from "../api/api"
import {getCookie, setCookie, removeCookie} from "../api/cookie";
import {SAVE_nickName, SAVE_myIdx, DELETE_TOKEN, SET_TOKEN } from "../redux/reducers";
import Swal from "sweetalert2";
import '../assets/css/main.css';
import { useNavigate } from "react-router-dom";
import LoadingPage from "../router/LoadingPage";


function NaverAuthRedirect  (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code')
  let state = new URL(window.location.href).searchParams.get('state')
  console.log(code)

  useEffect( () => {
    
  }, []);

  return (
    <>
      <h1>여기는 네이버다</h1>
      <LoadingPage/>
    </>
  )
};

export default NaverAuthRedirect;