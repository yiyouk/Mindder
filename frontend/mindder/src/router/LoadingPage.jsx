import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loadingImg from "../assets/images/Loading.png"

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

function LoadingPage(props) {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <img src={loadingImg}/>
            <div>로딩페이지 디자인 해줘</div>
            <M/>
        </Wrapper>
    );
}

export default LoadingPage;
