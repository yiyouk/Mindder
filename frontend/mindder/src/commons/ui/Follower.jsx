import React, { useEffect, useState  } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'
import { useParams } from "react-router-dom";


const Wrapper = styled.div`
    margin: 7px;
    display: flex;
    align-items: center;
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

function Follower({follower}) {

    const userIdx = useParams().userId;

    const navigate = useNavigate();
    return (
    <Wrapper>
        <FollowNum onClick={() => {
            navigate(`/${userIdx}/followers`)}}>
                {follower}
        </FollowNum>
        <span>팔로워</span>
    
    </Wrapper>
    )
}

export default Follower;

