// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import Modify from "../components/account/Modify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Remove = styled.div`
    margin: 1rem;
    color: #787777;
    font-weight: 600;
    display: flex;
    justify-content: end;
`;

function ModifyPage(props) {
    const navigate = useNavigate();
    
    return(
        <div id="main">
            <header>
                <h2>회원정보</h2>
            </header>
            <Modify></Modify>
            <Remove>
                <div onClick={() => {
                        navigate("/accounts/remove");
                }}>회원탈퇴 하기</div>
            </Remove>
        </div>
    );
}

export default ModifyPage;
