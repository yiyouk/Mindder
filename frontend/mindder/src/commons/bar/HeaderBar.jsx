import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Wrapper = styled.div`
    background-color: white;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0.25rem 0;
    width: 100vw;
`;

const Nick = styled.div`
    color: #404040;
    padding-right: 1rem;
    font-size: 0.9rem;
`;

function TopBar(props) {
  const navigate = useNavigate();
  const NickName = useSelector((state)=>state.USER.nickName)

  return (
    <Wrapper>
      <div className="headerLogo" onClick={() => {navigate("/");}}></div>
      {NickName ==="" ? null : <Nick> {NickName} 님 </Nick>}
    </Wrapper>
  )
}

export default TopBar;