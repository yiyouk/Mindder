import React, {useEffect} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NaviBar from '../commons/bar/NaviBar';
import HeaderBar from "../commons/bar/HeaderBar";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y: scroll;
    margin-bottom: 6vh;
`;

const Body = styled.div`
    padding: 3vh 0 5vh 0;
    display: flex;
    justify-content: center;
`

const Dumm = styled.div`
    height: 6vh;
    width: 100vw;;
`

const CommonLayout =()=>{
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);

    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/");
        }
    }, [isLoggedIn])

    return(
        <Wrapper>
            <HeaderBar/>
            <Body>
                <Outlet/>
            </Body>
            <Dumm/>
            <NaviBar/>
        </Wrapper>
    )

}

export default CommonLayout;