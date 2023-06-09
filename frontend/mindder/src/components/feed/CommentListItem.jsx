import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {SAVE_commentNum} from "../../redux/reducers";


import ProfileImage from "../../commons/ui/ProfileImage";

import Swal from "sweetalert2";
import api from "../../api/api";

const Wrapper = styled.div`
    display: flex;
    max-width: 21rem;
    background: white;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    margin: 0 0 0 1rem;
`;

const SideContainer = styled.div`
    width: 16em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ContentText = styled.span`
    max-width: 18rem;
    color: rgb(67, 67, 67);
    font-size: 0.75rem;
    margin-bottom: 1.3rem;
`;

const CommentInfo = styled.div`
    max-width: 18rem;
    display: flex;
    align-content: flex-end;
    margin-bottom: 0.3rem;
`;

const NickName = styled.span`
    color: rgb(67, 67, 67);
    font-weight: 600;
    font-size: 0.75rem;
    margin-right: 0.5rem;
`;

const Date = styled.span`
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
    margin-right: 1rem;
`
const X = styled.span`
    font-size: 0.5rem;
    color: rgb(67, 67, 67);
`

function CommentListItem({getData, commentCount, comment, userIdx}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const MyIdx = useSelector((state)=>state.USER.myIdx);
    const [profileImg, setProfileImg] = useState(null)

    // 댓글별 프로필이미지
    const getProfile = async()=>{
        try {
            const response = await api.get(`/my/information/${userIdx}`);
            if(response.data.success){
                setProfileImg(response.data.data.base64)
            }
        } catch(err) {
            // console.log(err)
        }
    }
    getProfile()

    //닉네임 클릭시 해당 유저 페이지 이동
    const onClick = () => {
        navigate(`/${comment.userIdx}`);
      };

    //댓글 삭제 물어보기
    const deleteComment = () => {
        if(comment.userIdx == MyIdx){
            Swal.fire({
                text: "댓글을 삭제하시겠습니까?",
                width: 300,
                showCancelButton: true,
                confirmButtonText: "삭제",
                cancelButtonText: "취소"
            }).then(function(e){
                if(e.isConfirmed === true) {
                    sendDelete();
                }
            })
        }
    }
    
    //댓글 삭제 비동기 통신
    const sendDelete = async() => { 
        try {
            const response = await api.delete(`/comments/${comment.commentIdx}`);
            
            if(response.data.success){
                getData(commentCount-1);
                dispatch(SAVE_commentNum((arr)=>arr+1));
            } else{
                // console.log("삭제 실패")
            }
            
        } catch (e) {
            // console.error(e);
            navigate("/error");
        }
    }


    return (
            <Wrapper>
                <ProfileImage base64={comment.base64} extension={comment.extension} size = "xs" userIdx={comment.userIdx} imgSrc={profileImg}
                />
                <Main>
                    <SideContainer>
                        <CommentInfo>
                            <NickName onClick={onClick}>{comment.nickname}</NickName>
                            <Date>{comment.updateDate}</Date>
                        </CommentInfo>
                        {comment.userIdx == MyIdx? <X onClick={deleteComment}> 삭제 </X> : null}
                    </SideContainer>
                    <ContentText>{comment.feedComment}</ContentText>
                </Main>
            </Wrapper>
    );
}

export default CommentListItem;
