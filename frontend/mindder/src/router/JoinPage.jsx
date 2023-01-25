import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import JoinRegister from "../components/account/JoinRegister";
import JoinEmail from "../components/account/JoinEmail";
import ErrorPage from "./ErrorPage";

function JoinPage(props) {
    const [number, setNumber] = useState(0);
    const navigate = useNavigate();

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1);
        if(number >= 1) navigate("/login");
            
    }

    if(number == 0){
        return (
            <div id ="main">
                <header>
                    <h2>회원가입</h2>
                </header>
                <JoinEmail></JoinEmail>
                <div className="center-container">
                    <button className="maincolor-white-btn" onClick={onIncrease}>다음</button>
                </div>
            </div>
        );
    } else  if(number == 1) {
        return (
            <div id ="main">
            <header>
                <h2>회원가입</h2>
            </header>
            <JoinRegister></JoinRegister>
            </div>
        );
    } else{
        <ErrorPage></ErrorPage>
    }
}

export default JoinPage;