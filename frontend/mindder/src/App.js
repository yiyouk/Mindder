import React, {useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route, useNavigate
} from "react-router-dom";

import api from "./api/api"

// Pages
import MainPage from './router/MainPage';
import PostPage from './router/PostPage';
import UserPage from './router/UserPage';
import FeedPage from './router/FeedPage';
import SearchPage from './router/SearchPage';
import CalendarPage from "./router/CalendarPage";
import FeedDetailPage from "./router/FeedDetailPage";
import FollowersPage from "./router/FollowersPage";
import FollowingPage from "./router/FollowingPage";
import JoinPage from "./router/JoinPage";
import LoginPage from "./router/LoginPage";
import ModifyPage from "./router/ModifyPage";
import PwChangePage from "./router/PwChangePage";
import PwFindPage from "./router/PwFindPage";
import RemovePage from "./router/RemovePage";
import SavedPage from "./router/SavedPage";
import SearchNamePage from "./router/SearchNamePage";
import SearchResPage from "./router/SearchResPage";
import SearchTagPage from "./router/SearchTagPage";
import NaviBar from './commons/bar/NaviBar';
import HeaderBar from "./commons/bar/HeaderBar";
import ErrorPage from "./router/ErrorPage";
import { getCookie } from "./api/cookie";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_myIdx, SAVE_nickName, SET_TOKEN, DELETE_TOKEN } from "./redux/reducers";

const userId = 0
const idx = 0
// const keyword = "사랑"

function App(props) {
    const dispatch = useDispatch()
    //store에 엑세스토큰, 닉네임, 유저인덱스 저장
    useEffect(()=>{
        console.log("나는 App.js의 함수")
        if (getCookie("is_login") !== undefined){ 
            console.log(getCookie("is_login"))
            dispatch(SET_TOKEN(getCookie("is_login")));
            setUserInfo(); //닉네임, 인덱스 번호 가져오기'
        } else { //쿠키에 정보가 없으면 tonken 초기화
            dispatch(DELETE_TOKEN(getCookie("is_login")));

        }
    }, [])

    
    const setUserInfo = async () =>{ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/my/information`);
            if (response.data.data !== null) {
                dispatch(SAVE_myIdx(response.data.data.userIdx))
                dispatch(SAVE_nickName(response.data.data.nickname))
            }
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
        }
    }

    return (
        <BrowserRouter>
            <HeaderBar/>
            <div id = "bodysuit">
                <Routes>
                    <Route path="" element={<MainPage />} />
                    <Route path={`${userId}`} element={<UserPage />} />
                    <Route path="feeds" element={<FeedPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path={`${userId}/calendar`} element={<CalendarPage />} />
                    {/* <Route path={`f/${idx}`} element={<FeedDetailPage />} /> */}
                    <Route path="f/0" element={<FeedDetailPage />} />
                    <Route path={`${userId}/followers`} element={<FollowersPage />} />
                    <Route path={`${userId}/following`} element={<FollowingPage />} />
                    <Route path="join" element={<JoinPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="accounts/edit" element={<ModifyPage />} />
                    <Route path="post" element={<PostPage />} />
                    <Route path="accounts/password/change" element={<PwChangePage />} />
                    <Route path="accounts/password/find" element={<PwFindPage />} />
                    <Route path="accounts/remove" element={<RemovePage />} />
                    <Route path={`${userId}/saved`} element={<SavedPage />} />
                    <Route path={`search/:keyword/nickname`} element={<SearchNamePage />} />
                    <Route path={`search/:keyword`} element={<SearchResPage />} />
                    <Route path={`search/:keyword/canvas`} element={<SearchTagPage />} />
                    <Route path={`error`} element={<ErrorPage />} />
                </Routes>
            </div>
            <NaviBar/>
        </BrowserRouter>
    );

}

export default App;