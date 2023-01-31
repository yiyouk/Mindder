// import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "../../api/cookie";
import { useDispatch } from "react-redux";
import { tokenAction } from "../../redux/store";
import { useSelector } from "react-redux";

const Wrapper = styled.nav`
    background-color:white;
    align-items: start;
    display: flex;
    margin: 0.25rem 0;
`;

function TopBar(props) {
  const isLoggedIn = useSelector((state)=>state.authToken.authenticated)
  const navigate = useNavigate();
  const dispatch = useDispatch() 
  const logout = () => {
      removeCookie("is_login")
      dispatch(tokenAction.DELETE_TOKEN())
  }   

  return (
    <Wrapper>
      <div className="headerLogo"></div>
      <div onClick={logout}>로그아웃</div>
    </Wrapper>
  )
}

export default TopBar;