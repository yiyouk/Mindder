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

const HeaderBar = styled.div`
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #7767FD;
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
                <HeaderBar>
                    <HeaderLogo src={LogoWW}/>
                </HeaderBar>
                <LoginHome/>
                <NaviBar/>
            </Bodysuit>
        );
    }
}

export default MainPage;
