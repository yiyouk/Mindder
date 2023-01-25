
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
    margin: 7px;
    align-items: center;
    display: flex;
    flex-direction: column;
`   
const FollowNum = styled.div`
    font-weight: bold;
    font-size: large;
    color: #7767FD;
    cursor: pointer;
` 


function Following(props) {
    const navigate = useNavigate();

    return (
    <Wrapper>
        <div>팔로잉</div>
        <FollowNum onClick={() => {
            navigate("../0/Following")}}>
                {props.following}
        </FollowNum>
    
    </Wrapper>
    )
}

export default Following;

