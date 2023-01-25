// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import ModifyMindder from "./ModifyMindder";
import ModifySNS from "./ModifySNS";

function Modify(props) {
    if(false){
        return (
            <ModifyMindder></ModifyMindder>
        );
    } else {
        return (
            <ModifySNS></ModifySNS>
        );
    }
}

export default Modify;
