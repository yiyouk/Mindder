import React, { useEffect, useState  } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from '../../api/api'



const Wrapper = styled.div`
    margin: 7px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
`   
const FollowNum = styled.div`
    font-weight: bold;
    font-size: large;
    color: #7767FD;
    cursor: pointer;
` 

function Follower({follower, userIdx}) {


    const navigate = useNavigate();
    return (
    <Wrapper>
        <div>팔로워</div>
        <FollowNum onClick={() => {
            navigate(`/0/followers`)}}>
                {follower}
        </FollowNum>
    
    </Wrapper>
    )
}

export default Follower;

