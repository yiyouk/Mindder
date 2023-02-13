import React, {useEffect} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import HeaderBar from "../commons/bar/HeaderBar";
import styled from "styled-components";

const Bodysuit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;

const NoNaviLayout =()=>{
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/");
        }
    }, [isLoggedIn])

    return(
        <Bodysuit>
            <HeaderBar/>
            <Outlet/>
        </Bodysuit>
    )

}

export default NoNaviLayout;