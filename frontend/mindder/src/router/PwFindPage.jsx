// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import PwForm from "../components/account/PwForm";

function PwFindPage(props) {
    return (
        <div id ="main">
            <header>
                <h2>비밀번호 찾기</h2>
            </header>
            <PwForm></PwForm>
        </div>
    );
}

export default PwFindPage;
