
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
    margin: 7px;
    align-items: center;
    display: flex;
    flex-direction: column;
    &>span{
        font-size: 0.7rem;
        color: grey;
    }
`   
const FollowNum = styled.div`
    font-weight: bold;
    font-size: large;
    color: #7767FD;
    cursor: pointer;

` 


function Following({following}) {
    const navigate = useNavigate();
    const userIdx = useParams().userId;
    return (
    <Wrapper>
        <FollowNum onClick={() => {
            navigate(`/${userIdx}/following`)}}>
                {following}
        </FollowNum>
        <span>팔로잉</span>
    
    </Wrapper>
    )
}

export default Following;

