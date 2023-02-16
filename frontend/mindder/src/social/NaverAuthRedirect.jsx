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
import { NAVER_STATE_TOKEN, NAVER_ACCESSTOKEN_URL } from "./OAuth";
import axios from "axios";


function NaverAuthRedirect  (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code')
  let state = new URL(window.location.href).searchParams.get('state')
  console.log(state)

  const requestValidator = ()=>{
    if (state !== NAVER_STATE_TOKEN){
      return {
              "status": 401,
              "success": false,
              "message": "unauthorized",
              }
    } else {
      return {
              "status": 200,
              "success": true,
              "message": "success",
              }
    }
  }
  
  const TOKEN_URL = NAVER_ACCESSTOKEN_URL(code)
  console.log(TOKEN_URL)
  const getToken = ()=>{
    try {
      const response = axios.get(TOKEN_URL)
      console.log(response)
    } catch (error) {
      
    }
  }

  useEffect( () => {
    getToken()
  }, []);

  return (
    <>
      <h1>여기는 네이버다</h1>
      <LoadingPage/>
    </>
  )
};

export default NaverAuthRedirect;