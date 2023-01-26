import React from "react";
import styled from "styled-components";

// commons
import Follower from "../../commons/ui/Follower";
import Following from "../../commons/ui/Following";


const Wrapper = styled.div`
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (max-width: 992x) {
      width:90vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
    }
`;

function Follow(props) {
    return (
        <Wrapper>
            <Follower follower="20"/> 
            <Following following="123"/>
        </Wrapper>
    );
}

export default Follow;