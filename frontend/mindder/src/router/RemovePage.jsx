// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import '../assets/css/main.css';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function RemovePage(props) {
    const navigate = useNavigate();

    return (
        <div className="line-box">
            <div id="remove">
                정말 회원 탈퇴를
                하시겠습니까?
            </div>
            <div id="remove2">
                <p className="removeText">회원탈퇴 시 마인더 서비스를</p>
                <p className="removeText">사용하실 수 없습니다.</p>
            </div>
            <button className="maincolor-white-btn"
                onClick={() => {
                    navigate("/login");
                }}>
                탈퇴하기
            </button>
        </div>
    );
}

export default RemovePage;
