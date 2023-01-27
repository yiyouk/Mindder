// 라우터 폴더는 uri기준으로 각각 파일 작성
import React from "react";
import styled from "styled-components";
import UserProfile from "../user/UserProfile";
import Img from "../../assets/images/draw.png";
import Context from "./Context";
import CommentList from "./CommentList";
import FeedButton from "./FeedButton";
import data from '../../data.json';
import ProfileImage2 from "../../commons/ui/ProfileImage2";
import LikeIcon from "../../assets/images/Logo.png"
import CommentIcon from "../../assets/images/comment.png"
import BookMark from "../../assets/images/bookmark.png";

const Wrapper = styled.div`
    /* padding: 16px; */
    /* width: 100vw; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ImgPro = styled.div`
    width: 20rem;
    height: 20rem;
    margin-top: 0.3rem;
    border-radius: 8px;
    background-image:url(${Img});
    background-size:cover;
`

const CanvaConContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 20rem;
`


const TitleWrapper = styled.div`
    width: 19em;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    margin: 1rem 0 0.5rem 0;
`;

const CanvaConStyle = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  margin: 0.3em;
  & > img{
    width: 1em;
    margin-right: 0.1em;
  }
`

function MyFeed(props) {
    const post = data.find((item) => {
        return item.id == 1;
    });

    console.log(post);

    return (
        <Wrapper>
            <TitleWrapper>
                <ProfileImage2 name="하늘하늘"></ProfileImage2>
                <FeedButton></FeedButton>
            </TitleWrapper>
            <ImgPro></ImgPro>
            <TitleWrapper>
                <CanvaConContainer>
                    <CanvaConStyle>
                        <img src={LikeIcon} alt="감정표현수" />
                        188
                    </CanvaConStyle>
                    <CanvaConStyle>
                        <img src={CommentIcon} alt="댓글수" />
                        50
                    </CanvaConStyle>
                </CanvaConContainer>
                    <CanvaConStyle>
                        <img src={BookMark}/>
                    </CanvaConStyle>
            </TitleWrapper>
            <Context></Context>
            <CommentList comments={post.comments} />
        </Wrapper>
    );
}

export default MyFeed;
