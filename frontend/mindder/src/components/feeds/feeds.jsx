// 실시간 맞춤 피드 페이지
import React from "react";
import { useNavigate} from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


function UserPage(props) {
    const navigate = useNavigate();

    return (
        <Wrapper>
        </Wrapper>
    );
}

export default UserPage;
