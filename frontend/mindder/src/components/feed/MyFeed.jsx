// 라우터 폴더는 uri기준으로 각각 파일 작성
import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//비동기 통신
import api from "../../api/api";

//디자인
import styled, {css} from "styled-components";
import ProfileImage from "../../commons/ui/ProfileImage";
import ProfileName from "../../commons/ui/ProfileName";
import LikeIcon from "../../assets/images/like.png"

import Context from "./Context";
import CommentList from "./CommentList";
import FeedButton from "./FeedButton";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > .CC {
        align-self:flex-start;
        margin:10px auto 0 20px;
        font-size:10px;
    }
`;

const Line = styled.div`
    width:22rem;
    border-bottom: solid 0.6px rgb(231, 231, 231);
`

const positionFixed = css`
    position: fixed;
    bottom: 1rem;
`;
const positionSticky = css`
    position: sticky;
    bottom: 2.4rem;
`;

//받은 사진
const CanvasImg = styled.img`
    width: 21rem;
    height: 21rem;
    margin-top: 0.3rem;
    border-radius: 8px;
    border: solid 0.001rem rgb(231, 231, 231);
    background-size:cover;
`

const RowContainer = styled.div`
  display: flex;
  justify-content:${(props)=>props.justify? props.justify : 'flex-start'};
  align-items: center;
  width: 20rem;
  margin-top:-5px;
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

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    border-top: solid 0.6px rgb(231, 231, 231);
    width: 22rem;
    background-color: white;
    ${(props)=>props.scrollEvent? positionSticky : positionFixed};    
`

///////////////////////컴포넌트 시작/////////////////
function MyFeed(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState("");
    const [updateDate, setUpdateDate] = useState("");
    const [mainText, setMainText] = useState("");
    const [normalTag, setNormalTag] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [comment, setComment] = useState("");
    const [base64, setBase64] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const [likeTotalCount, setLikeTotalCount] = useState(0);
    const [fileIdx, setFileIdx] = useState(0);
    const [postUserIdx, setPostuserIdx] = useState(0);
    const [scrollEvent, setScrollEvent] = useState(false);

    const MyIndx = useSelector((state)=>state.USER.MyIndx);
    const NickName = useSelector((state)=>state.USER.NickName);
    const feedIdx = 7;
    const textareaVal = useRef()

    const onScroll = () => {
        // 스크롤이 60px 이상 내려가면 트루로 바꿈
        if (window.scrollY > 60){
            setScrollEvent(true)
            // console.log('스크롤내렸어!')
        } else {
            setScrollEvent(false)
        }
    }

    //정보 가져오기
    useEffect(()=>{
        getFeed();
        window.addEventListener('scroll', onScroll) 
        return ()=>{
            window.removeEventListener('scroll', onScroll)
        }
    }, [])



    //댓글 작성시 입력 ~
    const handleComment = e => {
        setComment(e.target.value)
    }

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
                setPostuserIdx(response.data.data.userIdx);
                setMainText(response.data.data.mainText);
                setNormalTag(response.data.data.normalTag);
                setBase64( "data:image/" + response.data.data.extension + ";base64," + response.data.data.base64);
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

    //댓글 업로드
    const uploadComment = () => {
        if(comment !== "" && comment.length > 100){
            alert("100자를 초과했습니다.")
        } else if (!comment) {
            alert('댓글이 없어요~')
        } else {
            sendComment();
        }
    }

    const sendComment = async() => {
        console.log(comment);
        try {
            const response = await api.post(`/comments`,{
                feedIdx: feedIdx,
                feedComment: comment
            });
    
            console.log(response);
   
            if (response.data.success){
                alert("댓글 작성 성공!");
                getFeed();
                setComment("");
            }  else {
                alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
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
                    <ProfileImage userIdx={postUserIdx} size="s"/>
                    <ProfileName userIdx={postUserIdx} name={nickname} size="s"/>
                </RowContainer>
                <FeedButton></FeedButton>
            </SideContainer>
            <CanvasImg src={base64}/>
            <SideContainer>
                <RowContainer justify={"space-between"}>
                    <div>
                        <img src={LikeIcon} style={{position:'relative', top:'6px'}} width={20} alt="감정표현수"/> <span style={{fontSize:'12px'}}>받은 마음 {likeTotalCount}개</span> 
                    </div>
                    <span style={{fontSize:'12px', position:'relative', top:'2px'}}>{updateDate}</span>
                </RowContainer>
                <Img src={base64}/>
            </SideContainer>
                <RowContainer justify={"space-between"}>
                    <Context mainText ={mainText} normalTag={normalTag}></Context>
                </RowContainer>
            <Line/>
            <span className="CC"> 댓글({commentCount})</span>
            <CommentList commentCount={commentCount} feedIdx={feedIdx} />
            <Bottom scrollEvent={scrollEvent}>
                <RowContainer>
                    <TexetAreaStyled ref={textareaVal} placeholder={placeholder} value={comment} id="commentInput"  rows="3" cols="40" onChange={handleComment}></TexetAreaStyled>
                    <InputStyled type="button" value ="게시"  onClick={uploadComment}></InputStyled>
                </RowContainer>
            </Bottom>
        </Wrapper>
    );
}

export default MyFeed;
