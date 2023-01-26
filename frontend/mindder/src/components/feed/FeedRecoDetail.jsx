// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import UserFeedsList from "../user/UserFeedsList";


function FeedRecoDetail(props) {
    return (
        <div>
            <UserFeedsList></UserFeedsList>
        </div>
    );
}

export default FeedRecoDetail;
