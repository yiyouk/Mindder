import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


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

function Follower(props) {
    const navigate = useNavigate();


    // // const { title, onClick } = props;
    // const moveFollower = () => {
    //     navigate("/search");
    // }
    return (
    <Wrapper>
        <div>팔로워</div>
        <FollowNum onClick={() => {
            navigate("../0/Followers")}}>
                {props.follower}
        </FollowNum>
    
    </Wrapper>
    )
}

export default Follower;

