import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;


function NaviBar(props) {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                <Button
                    title="검색"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />
                <Button
                    title="실시간"
                    onClick={() => {
                        navigate("/post-write");
                    }}
                />
                <Button
                    title="홈"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <Button
                    title="마이페이지"
                    onClick={() => {
                        navigate("/my-page");
                    }}
                />
                <Button
                title="그리기"
                onClick={() => {
                    navigate("/post-draw-page");
                }}
                />   
            </Container>
        </Wrapper>
    );
}

export default NaviBar;
