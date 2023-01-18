import React from "react";
import styled from "styled-components";

const StyledFollowButton = styled.button`
    background-color: white;
    color: black;
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 25px;
    border: 2px solid #7767FD;
    cursor: pointer;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
`;

function FollowButton(props) {
    const { title, onClick } = props;

    return <StyledFollowButton onClick={onClick}>{title || "button"}</StyledFollowButton>;
}

export default FollowButton;
