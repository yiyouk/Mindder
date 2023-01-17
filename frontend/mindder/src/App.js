import React from "react";
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './pages/MainPage';
import PostDrawPage from './pages/PostDrawPage';
import MyPage from './pages/MyPage';
import NaviBar from './components/bar/NaviBar';
import HeaderBar from "./components/bar/HeaderBar";

function App(props) {
    return (
        <BrowserRouter>
            <HeaderBar/>
            <Routes>
                <Route path="" element={<MainPage />} />
                <Route path="post-draw-page" element={<PostDrawPage />} />
                <Route path="my-page" element={<MyPage />} />
            </Routes>
            <NaviBar/>
        </BrowserRouter>
    );
}

export default App;