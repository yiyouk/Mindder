import React, {useEffect} from "react";
import styled from "styled-components";
import LoginHome from "../components/main/LoginHome";
import Home from "../components/main/Home";
import NaviBar from '../commons/bar/NaviBar';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoWW from "../assets/images/LogoWW.png"
import { AlarmCheck } from "../commons/bar/HeaderBar"
import { BsFillBellFill } from "react-icons/bs";

import api from "../api/api";

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

const Check = styled.div`
  padding-right: 0.8rem;
`


function MainPage() {
    const isLoggedIn = useSelector((state)=>state.TOKEN.authenticated);
    const AlarmCount = useSelector((state)=>state.USER.alarmCount);
    const firebaseCode = useSelector((state)=>state.USER.firebaseCode);
    const pushAlarmAgree = useSelector((state)=>state.USER.pushAlarmAgree);
    const navigate = useNavigate();
    
    //토큰 발급 및 전송
    useEffect(()=>{
        // console.log(firebaseCode)
        if(isLoggedIn){
            if(pushAlarmAgree){
                sendToken();
            }
        }
    }, [firebaseCode])

    //토큰 보내기
    const  sendToken = async () => {
        try{
            const response = await api.post(`/alarms`, {
                deviceToken: firebaseCode
            })
            
            if(response.data.success){
                // console.log(response);
            }

        } catch (e) {
            // console.error(e);
            navigate("/error");
        }
    }

    if(!isLoggedIn){
        return (
            <Home></Home>
        );
    } else {
        return (
            <Bodysuit>
                <HeaderBar>
                    <HeaderLogo src={LogoWW}/>
                    <Check>
                        { AlarmCount !== 0 ?
                            <AlarmCheck/>
                            :
                            null
                        }
                        <BsFillBellFill color="#ffffff" size="20" onClick={() => {navigate("/alarm")}}/>
                    </Check>
                </HeaderBar>
                <LoginHome/>
                <NaviBar/>
            </Bodysuit>
        );
    }
}

export default MainPage;
