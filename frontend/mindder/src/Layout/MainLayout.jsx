import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Bodysuit = styled.div`
    background-color:  #7767FD;
    width: 100vw;
    height: 100vh;
`;

const Bodysuit2 = styled.div`
    width: 100vw;
    height: 100vh;
`;

const MainLayout =()=>{
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);

    return(
        <>
            {isLoggedIn ? 
            <Bodysuit2>
                <Outlet/>
            </Bodysuit2>
            :
            <Bodysuit>
                <Outlet/>
            </Bodysuit> 
            }
        </>
    )

}

export default MainLayout;