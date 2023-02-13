// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import LoginHome from "../components/main/LoginHome";
import Home from "../components/main/Home";
import NaviBar from '../commons/bar/NaviBar';
import { useSelector } from "react-redux";
import LogoWW from "../assets/images/LogoWW.png"

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Body = styled.div`
    padding: 0 0 3em 0;
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    background-color: #7767FD;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100vw;
`;

const HeaderLogo = styled.img`
    background-color: #7767FD;
    width: 6rem;
    height: 2.5rem;
    padding-left: 0.5rem;
`;

function MainPage() {
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);

    if(!isLoggedIn){
        return (
            <Home></Home>
        );
    } else {
        return (
            <Bodysuit>
                <Wrapper>
                    <HeaderLogo src={LogoWW}/>
                </Wrapper>
                <Body>
                    <LoginHome></LoginHome>
                </Body>
                <NaviBar></NaviBar>
            </Bodysuit>
        );
    }
}

export default MainPage;
