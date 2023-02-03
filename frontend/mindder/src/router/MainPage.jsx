// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import LoginHome from "../components/main/LoginHome";
import Home from "../components/main/Home";
import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { useSelector } from "react-redux";

const Wrapper = styled.nav`
    padding: 0.5rem 1rem 3rem 1rem;
`;

function MainPage(props) {
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated)

    if(!isLoggedIn){
        return (
            <Home></Home>
        );
    } else {
        return (
            <Wrapper>
                <HeaderBar></HeaderBar>
                <NaviBar></NaviBar>
                <LoginHome></LoginHome>
            </Wrapper>
        );
    }
}

export default MainPage;
