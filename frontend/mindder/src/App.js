import React from "react";
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './components/main/Home';
import PostPage from './components/post/post_emotag';
import UserPage from './components/user/user_calendar';
import FeedPage from './components/feeds/feeds';
import SearchPage from './components/search/search_home';
import NaviBar from './commons/bar/NaviBar';
import HeaderBar from "./commons/bar/HeaderBar";

function App(props) {
    return (
        <BrowserRouter>
            <HeaderBar/>
            <Routes>
                <Route path="" element={<MainPage />} />
                <Route path="post" element={<PostPage />} />
                <Route path="user" element={<UserPage />} />
                <Route path="feeds" element={<FeedPage />} />
                <Route path="search" element={<SearchPage />} />
            </Routes>
            <NaviBar/>
        </BrowserRouter>
    );
}

export default App;