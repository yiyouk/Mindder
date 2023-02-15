import React, { useEffect, lazy, Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { getCookie, removeCookie } from "./api/cookie";
import { useDispatch } from "react-redux";
import { SAVE_myIdx, SAVE_nickName, SET_TOKEN, DELETE_TOKEN, SAVE_followerCount, SAVE_profileImg, SAVE_followingCount } from "./redux/reducers";

import api from "./api/api"
import "./index.css"

// Pages
import MainLayout from './Layout/MainLayout'
import OnlyTopBarLayout from './Layout/OnlyTopBarLayout'
import CommonLayout from './Layout/CommonLayout'
import LoadingPage from "./router/LoadingPage";
const MainPage = lazy(() => import('./router/MainPage')) ;
const PostPage = lazy(() => import('./router/PostPage')) ;
const UserPage = lazy(() => import('./router/UserPage')) ;
const FeedsPage = lazy(() => import('./router/FeedsPage')) ;
const SearchPage = lazy(() => import('./router/SearchPage')) ;
const FeedDetailPage = lazy(() => import('./router/FeedDetailPage'));
const FollowersPage = lazy(() => import("./router/FollowersPage")) ;
const FollowingPage = lazy(() => import("./router/FollowingPage")) ;
const JoinPage = lazy(() => import("./router/JoinPage")) ;
const LoginPage = lazy(() => import("./router/LoginPage")) ;
const ModifyPage = lazy(() => import("./router/ModifyPage")) ;
const PwChangePage = lazy(() => import("./router/PwChangePage")) ;
const PwFindPage = lazy(() => import("./router/PwFindPage")) ;
const RemovePage = lazy(() => import("./router/RemovePage")) ;
const SavedPage = lazy(() => import("./router/SavedPage")) ;
const ErrorPage = lazy(() => import("./router/ErrorPage")) ;
const KakaoAuthRedirect = lazy(() => import("./social/KakaoAuthRedirect")) ;
const AlarmPage = lazy(() => import("./router/AlarmPage")) ;

const renderLoader = () => <LoadingPage/>;


function App(props) {
    const dispatch = useDispatch()
    //store에 엑세스토큰, 닉네임, 유저인덱스 저장
    useEffect(()=>{
        if (getCookie("is_login") !== undefined){
            dispatch(SET_TOKEN(getCookie("is_login")));
            setUserInfo(); //닉네임, 인덱스 번호 가져오기'
        } else { //쿠키에 정보가 없으면 강제 로그아웃처리
            dispatch(DELETE_TOKEN());
            dispatch(SAVE_nickName(""));
            dispatch(SAVE_myIdx(null));
            removeCookie("is_login");
        }
    }, [])

    //로그아웃
    const logout = async() => {
        const response = await api.get(`/users/logout`);
        if(!response.data.success){
                console.log("로그아웃실패")
        } else {
            dispatch(DELETE_TOKEN());
            dispatch(SAVE_nickName(""));
            dispatch(SAVE_myIdx(null));
            removeCookie("is_login");
        }
    }

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
            } else{
                dispatch(DELETE_TOKEN());
                dispatch(SAVE_nickName(""));
                dispatch(SAVE_myIdx(null));
                removeCookie("is_login");
            }
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
        }
    }

    return (
        <BrowserRouter>
            <Suspense fallback={renderLoader()}>
                <Routes>
                    {/* 오직 홈만 */}
                    <Route element={<MainLayout/>}>
                        <Route path="" element={<MainPage />} />
                    </Route>

                    {/* 헤더만 필요함 */}
                    <Route element={<OnlyTopBarLayout/>}>
                        <Route path="join" element={<JoinPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="accounts/password/find" element={<PwFindPage />} />
                        <Route path="error" element={<ErrorPage />} />
                    </Route>

                    {/* 헤더 필요함 + 하단바 */}
                    <Route element={<CommonLayout/>}>
                        <Route path=":userId" element={<UserPage />} />
                        <Route path="feeds" element={<FeedsPage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="f/:feedIdx" element={<FeedDetailPage />} />
                        <Route path=":userId/followers" element={<FollowersPage />} />
                        <Route path=":userId/following" element={<FollowingPage />} />
                        <Route path="accounts/edit" element={<ModifyPage />} />
                        <Route path="post" element={<PostPage />} />
                        <Route path="accounts/password/change" element={<PwChangePage />} />
                        <Route path="accounts/remove" element={<RemovePage />} />
                        <Route path="saved" element={<SavedPage />} />
                        <Route path="alarm" element={<AlarmPage />} />
                    </Route>
                    <Route path="users/social/kakao" element={<KakaoAuthRedirect/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );

}

export default App;