import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: #7767FD;
    color: black;
    padding: 8px 16px;
    font-size: 16px;
    border: 1px solid #cbc5ff;
    border-radius: 7px;
    cursor: pointer;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
    

`;



function Button(props) {
    const { title, onClick } = props;

    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;

