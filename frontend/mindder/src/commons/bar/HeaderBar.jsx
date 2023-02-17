import React, {useEffect} from "react";
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
  padding-right: 0.3rem;
`
export const AlarmCheck = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  width:  0.3rem;
  height:  0.3rem;
  background-color: #f37f58;
  border-radius: 50%;
`

function TopBar(props) {
  const navigate = useNavigate();
  const NickName = useSelector((state)=>state.USER.nickName)
  const AlarmCount = useSelector((state)=>state.USER.alarmCount)
  useEffect(()=>{
    // console.log("헤더바 렌더됨")
    // console.log(AlarmCount)
  }, [AlarmCount])

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
                null
              }
              <BsFillBellFill color="#7767FD" size="20"  onClick={() => {navigate("/alarm")}}/>
            </Check>
          </>
        }
      </UserWrapper>
    </Wrapper>
  )
}

export default TopBar;