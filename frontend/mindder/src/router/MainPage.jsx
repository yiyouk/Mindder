// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Home from "../components/main/Home";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function MainPage(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Home/>
        </Wrapper>
    );
}

export default MainPage;
