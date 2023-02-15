import React from "react";
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
    width: 5.5rem;
    height: 3rem;
    position: relative;
    bottom: 1.1rem;
    right: 8rem;
    z-index: 1;
    border-radius: 1rem;
    background-color: #eeecff;
    color: #eeecff;
`;

const HeaderText = styled.div`
    position: relative;
    right: 8rem;
    z-index: 2;
    font-weight: 700;
    font-size: 1.1rem;
    color: black;
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
                <HeaderBar>  /.....</HeaderBar>
                <Reco/>
            </ContainerT>
            <ContainerT>
                <HeaderText>마인더 통계</HeaderText>
                <HeaderBar>  /.....</HeaderBar>
                <EmotionChart/>
            </ContainerT>
        </Wrapper>
    );
}

export default LoginHome;
