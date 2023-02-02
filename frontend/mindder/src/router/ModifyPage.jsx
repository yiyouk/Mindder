// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import Modify from "../components/account/Modify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "../api/cookie";
import { useDispatch, useSelector } from "react-redux";
import { tokenAction, userAction } from "../redux/store";

import api from "../api/api";

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
    const logout = () => {
        sendLogout();
        removeCookie("is_login")
        dispatch(tokenAction.DELETE_TOKEN())
        dispatch(userAction.SAVE({selected:"", case:"nickName"}))
        dispatch(userAction.SAVE({selected:null, case:"userIdx"}))
        navigate('/')
    }

    const sendLogout = async() => {
        const response = await api.get(`/users/logout`);
        if(!response.data.success){
            alert("로그아웃 실패! 다시 시도해주세요.");
            navigate('/accounts/edit')
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