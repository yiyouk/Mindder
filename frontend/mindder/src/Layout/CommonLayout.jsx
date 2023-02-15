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
`;

const Body = styled.div`
    padding: 2vh 0 8vh 0;
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
            <NaviBar/>
        </Wrapper>
    )

}

export default CommonLayout;