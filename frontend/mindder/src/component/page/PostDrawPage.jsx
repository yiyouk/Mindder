import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import Button from "../ui/Button";

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

function PostDrawPage(props) {
    
    const navigate = useNavigate();
    
    return (
        <Wrapper>
            <Container>
                <Button
                    title="여기는 그림그리기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default PostDrawPage;
