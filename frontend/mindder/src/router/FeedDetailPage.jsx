import React, {useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {GiPadlock} from "react-icons/gi";
import { FaCommentDots } from "react-icons/fa";

//비동기 통신
import api from "../api/api";
import Swal from "sweetalert2";

//디자인
import Profile from "../commons/ui/Profile";
import Context from "../components/feed/Context";
import CommentList from "../components/feed/CommentList";
import FeedManage from "../components/feed/FeedManage";
import EmoManage from "../components/feed/EmoManage";
import Scraps from "../components/feed/Scraps";
import loadingImg from "../assets/images/Loading.png"

const Wrapper = styled.div`
    max-width: 21.5rem;
    width: 21.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Line = styled.div`
    width:23rem;
    border-top: solid 0.6px rgb(231, 231, 231);
`;

//게시글 사진
const CanvasImg = styled.img`
    width: 21rem;
    height: 21rem;
    border-radius: 8px;
    border: solid 0.001rem rgb(231, 231, 231);
    background-size:cover;
`

const SideContainer = styled.div`
    width: 20.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0 0.6rem 0;
`;

const SideContainer2 = styled.div`
    width: 20.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.8rem 0 0.8rem 0;
`;

//////댓글 작성 영역//////
const TexetAreaStyled = styled.textarea`
    padding: 0.2rem;
    width: 17.6rem;
    height: 1.6rem;
    border: none;
`
const InputStyled = styled.input`
    width: 2.5rem;
    height: 1rem;
    font-weight: 600;
    border: none;
    background-color: #ffffff;
    color: #7767FD;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`

const Bottom2 = styled.div`
    width: 21em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`

///////////////////////컴포넌트 시작/////////////////
function FeedDetailPage() {
    const navigate = useNavigate();
    const myIdx = useSelector((state)=>state.USER.myIdx);
    const nickName = useSelector((state)=>state.USER.nickName);
    const {feedIdx} = useParams();
    const textareaVal = useRef();
    const [nickname, setNickname] = useState("");
    const [updateDate, setUpdateDate] = useState("");
    const [mainText, setMainText] = useState("");
    const [normalTag, setNormalTag] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [comment, setComment] = useState("");
    const [base64, setBase64] = useState("");
    const [emoteBase64, setEmoteBase64] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const [likeTotalCount, setLikeTotalCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [cheerupCount, setCheerupCount] = useState(0);
    const [sadCount, setSadCount] = useState(0);
    const [postUserIdx, setPostuserIdx] = useState(0);
    const [myLikeType, setMyLikeType] = useState(0);
    const [emoteColorIdx, setEmoteColorIdx] = useState(0);
    const [emoteIdx, setEmoteIdx] = useState(0);
    const [myScrap, setMyScrap] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [scrollEvent, setScrollEvent] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const render = useSelector((state)=>state.USER.feedDetailRender)

    const onScroll = () => {
        // 스크롤이 60px 이상 내려가면 트루로 바꿈
        if (window.scrollY > 60){
            setScrollEvent(true)
        } else {
            setScrollEvent(false)
        }
    }

    const getProfile = async(userIdx)=>{
        try {
            const response = await api.get(`/my/information/${userIdx}`);
            if(response.data.success){
                setProfileImg(response.data.data.base64)
            }
        } catch(err) {
            // console.log(err)
        }
    }

    //정보 가져오기
    useEffect(()=>{
        getFeed();
        setPlaceholder(nickName + "(으)로 댓글달기")
        window.addEventListener('scroll', onScroll)
         
        return ()=>{
            window.removeEventListener('scroll', onScroll)
        }
    }, [myLikeType, render])


    //댓글 작성시 입력 ~
    const handleComment = e => {
        setComment(e.target.value)
    }

   //피드 정보 불러오기
   
   const getFeed = async() => {
        try {
            const response = await api.get(`/feeds/${feedIdx}`);
            if (response.data.success){
                // console.log(response.data)
                setNickname(response.data.data.nickname);
                setUpdateDate(response.data.data.updateDate);
                setCommentCount(response.data.data.commentCount);
                setLikeTotalCount(response.data.data.likeTotalCount);
                setLikeCount(response.data.data.likeCount);
                setCheerupCount(response.data.data.cheerupCount);
                setSadCount(response.data.data.sadCount);
                setPostuserIdx(response.data.data.userIdx);
                setMainText(response.data.data.mainText);
                setNormalTag(response.data.data.normalTag);
                setMyLikeType(response.data.data.myLikeType);
                setEmoteColorIdx(response.data.data.emoteColorIdx);
                setEmoteIdx(response.data.data.emoteIdx);
                setMyScrap(response.data.data.myScrap);
                setIsPublic(response.data.data.public);
                setBase64( "data:image/" + response.data.data.extension + ";base64," + response.data.data.base64);
                setEmoteBase64( "data:image/" + response.data.data.emoteCompleteExtension + ";base64," + response.data.data.emoteCompleteBase64);
                await getProfile(response.data.data.userIdx)
            }  else {
                // console.log("조회 실패")
                navigate("/");
            }
        } catch (e) {
            // console.error(e);
            navigate("/error");
        }
    }

    //댓글 업로드
    const uploadComment = () => {
        if(comment !== "" && comment.length > 100){
            Swal.fire({
                icon: 'warning',               
                width: 300,
                iconColor: '#7767FD',
                text: '100자를 초과했습니다.', 
                confirmButtonColor: '#7767FD',
                confirmButtonText: '확인',})
        } else if (!comment) {
            Swal.fire({
                icon: 'warning',               
                width: 300,
                iconColor: '#7767FD',
                text: '작성된 글이 없어요', 
                confirmButtonColor: '#7767FD',
                confirmButtonText: '확인',})
        } else {
            sendComment();
        }
    }

    const sendComment = async() => {
        try {
            const response = await api.post(`/comments`,{
                feedIdx: feedIdx,
                feedComment: comment
            });
    
            // console.log(response);
   
            if (response.data.success){
                getFeed();
                setComment("");
            } else {
                // console.log("작성 실패")
    
            }

        } catch (e) {
            // console.error(e);
            navigate("/error");
        }
    }

    //like~
    const getData = (num) => {
        setMyLikeType(num);
    }

    const handleCommentInput = () => {
        setShowCommentInput((showCommentInput=>!showCommentInput))
        textareaVal.current.scrollIntoView({behavior:'smooth'})
    }

    // 이미지로딩 완료되면 로딩false로 변경
    const handleOnLoad = ()=>{
        setIsLoading(false)
    }

    return (
        <Wrapper>
            <SideContainer>
                <Profile userIdx={postUserIdx} imgsize="s" name={nickname} namesize="s" imgSrc={profileImg}/>
                <div>
                    {isPublic ? null:<GiPadlock color=" #7767FD" size="22" style={{position:'relative', top:'3.2rem', left:'3rem'}}/>}

                    {myIdx == postUserIdx ? <FeedManage normalTag={normalTag} isPublic ={isPublic} mainText={mainText} feedIdx={feedIdx}/> : null}
                </div>
            </SideContainer>
            {/* 이미지 로딩 중일때 밥아저씨 보여주기 */}
            <CanvasImg src={loadingImg} style={{ display: isLoading ? "block" : "none" }}/>
            <CanvasImg src={base64} 
            onLoad={handleOnLoad}
            style={{ display: isLoading ? "none" : "block" }}
            />
            <SideContainer2>
                <EmoManage getData={getData} feedIdx={feedIdx} myLikeType={myLikeType} likeCount={likeCount} cheerupCount={cheerupCount} sadCount={sadCount} likeTotalCount={likeTotalCount}/>
                <Scraps feedIdx={feedIdx} myScrap={myScrap}/>
            </SideContainer2>
            <Context emoteBase64={emoteBase64} emoteIdx={emoteIdx} emoteColorIdx={emoteColorIdx} updateDate={updateDate} mainText ={mainText} normalTag={normalTag}/>
            <Line/>
            <FaCommentDots style={{position:"relative", top:"-1rem", right:"-9.5rem", margin:"0"}} color=" #7767FD" size="25" onClick={handleCommentInput}/>
            <CommentList commentCount={commentCount} feedIdx={feedIdx} />
            <Bottom show={showCommentInput}>
                <Line/>
                <Bottom2>
                    <TexetAreaStyled className="textInput" ref={textareaVal} placeholder={placeholder} value={comment} id="commentInput" onChange={handleComment}/>
                    <InputStyled className="inputBtn" type="button" value ="게시"  onClick={uploadComment}/>
                </Bottom2>
            </Bottom>
        </Wrapper>
    );
}

export default FeedDetailPage;
