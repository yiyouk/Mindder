import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './component/page/MainPage';
import PostDrawPage from './component/page/PostDrawPage';
import MyPage from './component/page/MyPage';
import NaviBar from './component/bar/NaviBar';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    return (
        <BrowserRouter>
            <MainTitleText>Mindder</MainTitleText>
            <Routes>
                <Route path="" element={<MainPage />} />
                <Route path="post-draw-page" element={<PostDrawPage />} />
                <Route path="my-page" element={<MyPage />} />
            </Routes>
            <NaviBar></NaviBar>
        </BrowserRouter>
    );
}

export default App;