import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
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

function Button(props) {
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;
