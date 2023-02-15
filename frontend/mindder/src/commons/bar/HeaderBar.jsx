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

const Check = styled.div`
  padding-right: 0.5rem;
`
const AlarmCheck = styled.div`
  display: flex;
  width: 5px;
  height: 5px;
  background-color: #f37f58;
  border-radius: 50%;
  z-index: 3;
`
const M = styled.div`
  width: 5px;
  height: 5px;
`

function TopBar(props) {
  const navigate = useNavigate();
  const NickName = useSelector((state)=>state.USER.nickName)
  const AlarmCount = useSelector((state)=>state.USER.alarmCount)

  return (
    <Wrapper>
      <HeaderLogo src={LogoP} onClick={() => {navigate("/");}}/>
      <UserWrapper>
        {NickName ==="" ? null : 
          <>
            <Nick> {NickName} 님 </Nick>
            <Check>
                  
              { AlarmCount !== 0 ?
                <AlarmCheck/>
                :
                <M/>
              }
              <BsFillBellFill color="#7767FD" size="17"  onClick={() => {navigate("/alarm")}}>
              </BsFillBellFill>
            </Check>
          </>
        }
      </UserWrapper>
    </Wrapper>
  )
}

export default TopBar;