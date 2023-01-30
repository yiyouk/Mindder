import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.nav`
    background-color:white;
    align-items: start;
    display: flex;
    margin: 0.25rem 0;
`;

function TopBar(props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="headerLogo"></div>
    </Wrapper>
  )
}

export default TopBar;