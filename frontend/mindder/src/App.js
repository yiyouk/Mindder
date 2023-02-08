import React, {useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { getCookie } from "./api/cookie";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_myIdx, SAVE_nickName, SET_TOKEN, DELETE_TOKEN, SAVE_followerCount, SAVE_profileImg, SAVE_followingCount } from "./redux/reducers";

import api from "./api/api"
import "./index.css"

// Pages
import MainLayout from './Layout/MainLayout'
import MainPage from './router/MainPage';
import PostPage from './router/PostPage';
import UserPage from './router/UserPage';
import FeedsPage from './router/FeedsPage';
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
import ErrorPage from "./router/ErrorPage";

function App(props) {
    const dispatch = useDispatch()
    //store에 엑세스토큰, 닉네임, 유저인덱스 저장
    useEffect(()=>{
        if (getCookie("is_login") !== undefined){
            dispatch(SET_TOKEN(getCookie("is_login")));
            setUserInfo(); //닉네임, 인덱스 번호 가져오기'
        } else { //쿠키에 정보가 없으면 tonken 초기화
            dispatch(DELETE_TOKEN(getCookie("is_login")));
        }
    }, [])

    
    const setUserInfo = async () =>{ // async, await을 사용하는 경우
        try {
            const response = await api.get(`/my/information`);
            console.log(response.data)
            if (response.data.data !== null) {
                dispatch(SAVE_myIdx(response.data.data.userIdx))
                dispatch(SAVE_nickName(response.data.data.nickname))
                dispatch(SAVE_followerCount(response.data.data.followerCount))
                dispatch(SAVE_followingCount(response.data.data.followingCount))
                dispatch(SAVE_profileImg(response.data.data.base64))
            }
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
        }
    }

    return (
        <BrowserRouter>
                <Routes>
                    {/* 오직 홈만 */}
                    <Route path="" element={<MainPage />} />

                    {/* 헤더 필요함 + 공백 */}
                    <Route element={<MainLayout/>}>
                        <Route path=":userId" element={<UserPage />} />
                        <Route path="feeds" element={<FeedsPage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="calendar" element={<CalendarPage />} />
                        <Route path="f/:feedIdx" element={<FeedDetailPage />} />
                        <Route path=":userId/followers" element={<FollowersPage />} />
                        <Route path=":userId/following" element={<FollowingPage />} />
                        <Route path="join" element={<JoinPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="accounts/edit" element={<ModifyPage />} />
                        <Route path="post" element={<PostPage />} />
                        <Route path="accounts/password/change" element={<PwChangePage />} />
                        <Route path="accounts/password/find" element={<PwFindPage />} />
                        <Route path="accounts/remove" element={<RemovePage />} />
                        <Route path="saved" element={<SavedPage />} />
                        <Route path="search/:keyword/nickname" element={<SearchNamePage />} />
                        <Route path="search/:keyword" element={<SearchResPage />} />
                        <Route path="search/:keyword/canvas" element={<SearchTagPage />} />
                        <Route path="error" element={<ErrorPage />} />
                    </Route>
                </Routes>
        </BrowserRouter>
    );

}

export default App;