import React from "react";
import styled, { css } from "styled-components";

const BtnColor = {
    'main' : '#7767FD'
}
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
     padding: 0.3rem 0.6rem;
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
