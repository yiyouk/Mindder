import React from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
    background-color:white;
    align-items: start;
    display: flex;
    margin: 0.25rem 0;
`;

function TopBar(props) {
  return (
    <Wrapper>
      <div className="headerLogo"></div>
    </Wrapper>
  )
}

export default TopBar;