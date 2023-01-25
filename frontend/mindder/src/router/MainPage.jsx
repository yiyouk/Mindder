// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import LoginHome from "../components/main/LoginHome";
import Home from "../components/main/Home";

function MainPage(props) {
    if(false){
        return (
            <Home></Home>
        );
    } else {
        return (
            <LoginHome></LoginHome>
        );
    }
}

export default MainPage;
