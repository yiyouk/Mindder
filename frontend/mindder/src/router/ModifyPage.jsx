// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import Modify from "../components/account/Modify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie, removeCookie } from "../api/cookie";
import { useDispatch, useSelector } from "react-redux";

import api from "../api/api";
import {SAVE_nickName, SAVE_myIdx, DELETE_TOKEN } from "../redux/reducers";

const Remove = styled.div`
    margin: 1rem;
    color: #787777;
    font-weight: 600;
    display: flex;
    justify-content: end;
`;

function ModifyPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch() 

    //로그아웃
    const logout = async() => {
        const response = await api.get(`/users/logout`);
        if(!response.data.success){
            // console.log("로그아웃실패")
        } else {
            dispatch(DELETE_TOKEN());
            dispatch(SAVE_nickName(""));
            dispatch(SAVE_myIdx(null));
            removeCookie("is_login");
            // console.log(getCookie("is_login"))
            navigate('/')
        }
    }

    return(
        <div id="main">
            <header>
                <h2>회원정보</h2>
            </header>
            <Modify></Modify>
            <Remove>
                <div>
                    <span onClick={() => {
                    navigate("/accounts/remove");
                    }}>회원탈퇴 하기 </span>|
                    <span
                    onClick={()=>{
                    logout()
                    }}
                    > 로그아웃</span>
                </div>
            </Remove>
        </div>
    );
}

export default ModifyPage;