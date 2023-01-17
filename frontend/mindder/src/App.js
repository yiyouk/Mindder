import React from "react";
import './App.css';
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


function App(props) {
    return (
        <BrowserRouter>
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