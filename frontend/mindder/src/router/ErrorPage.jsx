import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {IoAlertCircle} from "react-icons/io5";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8.5rem;
    & > div {
        margin: 1rem;
        color:grey;
        font-weight: bold;
    }
`
const Button = styled.button`
    font-weight: bold;
    width: 7.3rem;
    height: 2.8rem;
    background-color: #7767FD;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    margin: 2rem 0;
`;
const M = styled.div`
    margin: 2rem;
`;
function ErrorPage(props) {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <IoAlertCircle color="#7767FD" size="130"/>
            <div>요청하신 페이지를 찾을 수 없습니다</div>
            <M/>
            <Button onClick={() => navigate(-1)}>이전화면</Button>
        </Wrapper>
    );
}

export default ErrorPage;
