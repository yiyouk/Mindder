import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Colors16, Emoticons } from "../../redux/reducers";
import styled from "styled-components";

import LogoP from "../../assets/images/LogoP.png"

const Wrapper = styled.div`
    background-color: white;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0m;
    width: 95vw;
`;

const Nick = styled.div`
    font-size: 0.9rem;
    padding-right: 0.5rem;
`;

const HeaderLogo = styled.img`
  width: 6rem;
  height: 2.5rem;
`;

function TopBar(props) {
  const navigate = useNavigate();
  const NickName = useSelector((state)=>state.USER.nickName)

  return (
    <Wrapper>
      <HeaderLogo src={LogoP} onClick={() => {navigate("/");}}/>
      {NickName ==="" ? null : <Nick> {NickName} 님 </Nick>}
    </Wrapper>
  )
}

export default TopBar;