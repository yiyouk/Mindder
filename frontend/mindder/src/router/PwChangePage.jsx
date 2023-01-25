// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import PwForm from "../components/account/PwForm";

function PwChangePage(props) {
    return (
        <div id ="main">
            <header>
                <h2>비밀번호 재설정</h2>
            </header>
            <PwForm></PwForm>
        </div>
    );
}

export default PwChangePage;
