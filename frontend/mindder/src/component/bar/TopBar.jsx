import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../images/Logo.png"

// 상단 로고랑 알림창
const Wrapper = styled.div`
    padding-bottom: 15px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* border: 1px solid black; */
`;
const Logo = styled.div`
    width: 110px;
    height: 32px;
    /* border: 1px solid black; */
    position:relative;
    right:40px;
    background-image:url(${LogoImg});
    background-size:cover;

`
const Alert = styled.div`
    width: 32px;
    height: 32px;
    /* border: 1px solid black; */
    position:relative;
    left:30px;
    background-color:#7767FD;
    border-radius:50px;
`

function TopBar(props) {
  return (
    <Wrapper>
      <Logo/>
      <Alert/>
    </Wrapper>
  )
}

export default TopBar;