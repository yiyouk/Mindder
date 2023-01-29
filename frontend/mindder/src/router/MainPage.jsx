// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import LoginHome from "../components/main/LoginHome";
import Home from "../components/main/Home";

const Wrapper = styled.nav`
    margin: 1rem 0 0 0;
`;

function MainPage(props) {
    if(true){
        return (
            <Home></Home>
        );
    } else {
        return (
            <Wrapper>
                <LoginHome></LoginHome>
            </Wrapper>
        );
    }
}

export default MainPage;
