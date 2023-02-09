import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//섹션별로
import TodayCanvas from "./TodayCanvas";
import Reco from "./Reco";
import EmotionChart from "./EmotionChart"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HeaderBar = styled.div`
    color:  #eeecff;
    width: 7rem;
    height: 3rem;
    position: relative;
    bottom: 1.1rem;
    left: -6.5rem;
    z-index: 1;
    border-radius: 1rem;
    background-color: #eeecff;
`;

const HeaderText = styled.div`
    font-weight: 700;
    font-size: 1.1rem;
    position: relative;
    color:black;
    z-index: 2;
    right:120px;
    margin: 0;
`;

const ContainerT = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    width: 22rem;
    height: 9.5rem;
`;


function LoginHome(props) {
    return (
        <Wrapper>
            <TodayCanvas/>
            <ContainerT>
                <HeaderText>추천 캔버스</HeaderText>
                <HeaderBar> & .....</HeaderBar>
                <Reco/>
            </ContainerT>
            <ContainerT>
                <HeaderText>마인더 통계</HeaderText>
                <HeaderBar> & .....</HeaderBar>
                <EmotionChart/>
            </ContainerT>
        </Wrapper>
    );
}

export default LoginHome;
