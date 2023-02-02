// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//비동기 통신
import api from "../../api/api";

//디자인
import styled from "styled-components";
import ProfileImage from "../../commons/ui/ProfileImage";
import ProfileName from "../../commons/ui/ProfileName";
import LikeIcon from "../../assets/images/like.png"
import CommentIcon from "../../assets/images/comment.png"
import BookMark from "../../assets/images/bookmark.png";


import Img2 from "../../assets/images/draw.png";
import Context from "./Context";
import CommentList from "./CommentList";
import FeedButton from "./FeedButton";


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    width:22rem;
    border-bottom: solid 0.6px rgb(231, 231, 231);
`
//Bottom
const Bottom = styled.div`
    background-color: white;    
    position: relative;
    bottom: 0;
`

//사라져야함
const ImgPro = styled.div`
    width: 20rem;
    height: 20rem;
    margin-top: 0.3rem;
    border-radius: 8px;
    background-image:url(${Img2});
    background-size:cover;
`

const RowContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20rem;
`

const SideContainer = styled.div`
    width: 19em;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    margin: 1rem 0 0.5rem 0;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: end;
  align-items: center;
  color: grey;
  font-size: 0.8rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  & > img{
    /* width: 1.1em; */
    height: 1.2rem;
    /* margin-right: 0.1em; */
  }
`
const Img = styled.div`
  & > img{
    width: 1.1em;
    height: 1.2rem;
  }
`
const TexetAreaStyled = styled.textarea`
    width: 20rem;
    height: 1.3rem;
    border: none;
    /* pa */

`
const InputStyled = styled.input`
    width: 2rem;
    height: 2rem;
    border: none;
    color: #7767FD;
    font-weight: 600;
    background-color: white;
`

function MyFeed(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState("");
    const [updateDate, setUpdateDate] = useState("");
    const [mainText, setMainText] = useState("");
    const [normalTag, setNormalTag] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const [likeTotalCount, setLikeTotalCount] = useState(0);
    const [fileIdx, setFileIdx] = useState(0);
    const [postUserIdx, setPostuserIdx] = useState(0);

    const feedIdx = 7;

    //정보 가져오기
    useEffect(()=>{
        getFeed();
    }, [])

   //피드 정보 불러오기
   const getFeed = async() => {
        try {
            const response = await api.get(`/feeds/${feedIdx}`);
            console.log("피드정보는 바로~");
            console.log(response);
            // console.log(response)
            if (response.data.success){
                setNickname(response.data.data.nickname);
                setPlaceholder(response.data.data.nickname + "(으)로 댓글달기")
                setUpdateDate(response.data.data.updateDate);
                setCommentCount(response.data.data.commentCount);
                setLikeTotalCount(response.data.data.likeTotalCount);
                setFileIdx(response.data.data.fileIdx);
                setPostuserIdx(response.data.data.postUserIdx);
                setMainText(response.data.data.mainText);
                setNormalTag(response.data.data.normalTag);
            }  else {
                alert("정보를 불러오지 못했습니다.");
                navigate("/");
            }
        } catch (e) {
            alert("오류 발생!");
            console.error(e);
            navigate("/error");
        }
    }

    return (
        <Wrapper>
            <SideContainer>
                <RowContainer>
                    <ProfileImage size="s"/>
                    <ProfileName name={nickname} size="s"/>
                </RowContainer>
                <FeedButton></FeedButton>
            </SideContainer>
            <ImgPro/>
            <SideContainer>
                <RowContainer>
                    <CenterContainer>
                        <img src={CommentIcon} alt="댓글수" />
                        <span>{commentCount}</span>
                    </CenterContainer>
                    <CenterContainer>
                        <img src={LikeIcon} alt="감정표현수" />
                        <span>{likeTotalCount}</span>
                    </CenterContainer>
                </RowContainer>
                <Img>
                    <img src={BookMark}/>
                </Img>
            </SideContainer>
            <Context updateDate ={updateDate} mainText ={mainText} normalTag={normalTag}></Context>
            <Line/>
            <CommentList feedIdx={feedIdx} />
            <Bottom>
                <Line/>
                <RowContainer>
                    <TexetAreaStyled placeholder={placeholder} id="commentInput"  rows="3" cols="40" ></TexetAreaStyled>
                    <InputStyled type="button" value ="게시"></InputStyled>
                </RowContainer>
            </Bottom>
        </Wrapper>
    );
}

export default MyFeed;
