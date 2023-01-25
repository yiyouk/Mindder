import React from "react";
import styled from "styled-components";

// commons
import Follower from "../../commons/ui/Follower";
import Following from "../../commons/ui/Following";


const Wrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

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