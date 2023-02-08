// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import LoginHome from "../components/main/LoginHome";
import Home from "../components/main/Home";
import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import { useSelector } from "react-redux";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding: 0.5em 0em 0em 0em;
`;
const Body = styled.div`
    padding: 1em 0 1.2em 0;
    height: 80vh;
    overflow:scroll;
    width: 100vw;
`

function MainPage(props) {
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated)

    if(!isLoggedIn){
        return (
            <Home></Home>
        );
    } else {
        return (
            <Bodysuit>
                <HeaderBar></HeaderBar>
                <Body>
                    <LoginHome></LoginHome>
                </Body>
                <NaviBar></NaviBar>
            </Bodysuit>
        );
    }
}

export default MainPage;
