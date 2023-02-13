import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeCookie} from "../api/cookie";

//비동기 동신
import api from "../api/api";

import '../assets/css/main.css';
import {DELETE_TOKEN,SAVE_nickName, SAVE_myIdx } from "../redux/reducers";


function RemovePage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goodbye = async () => {
        try{
            const response = await api.delete(`/users`, null);
            if(response.data.success){                
                dispatch(DELETE_TOKEN());
                dispatch(SAVE_nickName(""));
                dispatch(SAVE_myIdx(null));
                removeCookie("is_login")
                navigate('/');
            } else{
                navigate("/error"); 
            }
        } catch (e) {
            console.error(e);
            navigate("/error");
        }
    }

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
                    goodbye();
                }}>
                탈퇴하기
            </button>
        </div>
    );
}

export default RemovePage;
