import React from "react";
import styled from "styled-components";

import Follow from "./Follow";
import FollowButton from "../../commons/ui/FollowButton";

import BookMarkImg from "../../assets/images/bookmark.png"
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 330px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 1.6rem;
    border-bottom: 2px solid #7767FD;

`;

const SavedButton = styled.div`
    align-self: end;
    margin: 7px;
    border-width: 1px;
    cursor: pointer;
`;


function UserFollow(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            {/* 유저가 나 일 경우 보이는 버튼 */}
                <SavedButton onClick={() => {
                    navigate("../0/saved")}}>
                        <img src={BookMarkImg}/>
                </SavedButton>
            {/* 유저가 다른 사람일 경우 보이는 버튼 */}
                {/* <FollowButton/> */}
            <Follow></Follow>

        </Wrapper>
    );
}

export default UserFollow;