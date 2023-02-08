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
    justify-content: center;
`;

const Header = styled.h4`
    font-size: 1rem;
    color:black;
    position:relative;
    right:120px;
    margin: 0;
`

const ContainerT = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:2rem;
    width: 22rem;
    height: 9.5rem;
`;


function LoginHome(props) {
    return (
        <Wrapper>
            <TodayCanvas/>
            <ContainerT>
                <Header>추천 캔버스</Header>
                <Reco/>
            </ContainerT>
            <ContainerT>
                <Header>마인더 통계</Header>
                <EmotionChart/>
            </ContainerT>
        </Wrapper>
    );
}

export default LoginHome;
