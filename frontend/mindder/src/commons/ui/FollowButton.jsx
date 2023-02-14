import React from "react";
import styled from "styled-components";

const StyledFollowButton = styled.button`
    background-color: ${({ active }) => {
        if (active) {
            return "#7767FD";
        }
        return "white";
        }};
     color: ${({ active }) => {
        if (active) {
            return "white";
        }
        return "black";
        }};
     width: 5rem;
     font-weight: 600;
     font-size: 0.85rem;
     border-width: 1px;
     border-radius: 25px;
     text-align: center;
     border: 2px solid #7767FD;
     cursor: pointer;
     box-shadow: 0px 2.5px 2px rgba(0, 0, 0, 0.3);
`;

function FollowButton({children, active, onClick}) {
    return (
        <StyledFollowButton active={active} onClick={onClick}>{children}</StyledFollowButton>
    )
};

export default FollowButton;
