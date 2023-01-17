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
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import NaviBar from './components/bar/NaviBar';
import HeaderBar from "./components/bar/HeaderBar";

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