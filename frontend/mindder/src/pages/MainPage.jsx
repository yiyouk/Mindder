import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodayCanvasImg from "../images/TodayCanvas.png"
import RecoCanvasList from "../components/list/RecoCanvasList";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// 오늘의 캔버스
const Container = styled.div`
    width: 360px;
    height: 232px;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    /* border : 1px solid black; */
    background-color:#7767FD;
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;
const TodayCanvas = styled.div`
    width:265px;
    height:151px;
    background-color:white;
    /* border: 1px solid black; */
    border-radius:15px;
    background-image:url(${TodayCanvasImg});
    background-size:cover;
`
const TodayCanvasHeader = styled.h4`
    font-size:16px;
    /* font-weight:bold; */
    color:white;
    position:relative;
    right:110px;
    margin: 0;
`



function MainPage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Container>
                <TodayCanvasHeader>
                    오늘의 캔버스
                </TodayCanvasHeader>
                <TodayCanvas/>
            </Container>
            <RecoCanvasList/>
            
        </Wrapper>
    );
}

export default MainPage;
