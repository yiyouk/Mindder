import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BsFillBellFill } from "react-icons/bs";

import LogoP from "../../assets/images/LogoP.png"

const Wrapper = styled.div`
    background-color: white;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 95vw;
`;

const Nick = styled.div`
    font-size: 0.9rem;
    padding-right: 0.5rem;
`;

const UserWrapper = styled.div`
    align-items: center;
    display: flex;
`
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
      <UserWrapper>
        {NickName ==="" ? null : 
          <>
            <Nick> {NickName} 님 
            </Nick>
            <BsFillBellFill color="#7767FD" size="17"  onClick={() => {navigate("/alarm")}}/>
          </>
        }
      </UserWrapper>
    </Wrapper>
  )
}

export default TopBar;