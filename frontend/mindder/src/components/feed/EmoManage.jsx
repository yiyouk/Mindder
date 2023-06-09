import {React, useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {BsEmojiHeartEyes, BsEmojiHeartEyesFill, BsEmojiWink, BsEmojiWinkFill, BsEmojiFrown, BsEmojiFrownFill} from "react-icons/bs";
import {FaRegSmile, FaSmile} from "react-icons/fa";

//api통신
import api from "../../api/api";

const Text = styled.span`
    color: gray;
    font-size: 0.8rem;
    margin-left: 0.5rem;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

//이모지
const Emote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2em 0.5rem 0.1rem 0.5rem;
`;

const EmoteText = styled.div`
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 0.2rem;
    color: #ffffff;
`;

//누르면 나오는거
const DropDown = styled.div`
    background-color: white;
    border: none;
    outline:none;
    position: relative;
`;

//박스 전체 컨테이너
const ListContainer = styled.div`
  padding: 0.1rem;
  background-color: #7667fd78;
  border-radius: 1rem;
  position: absolute;
  bottom: 1.5rem;
  display:none;
  ${DropDown}:active & {
    display: block;
  }
  ${DropDown}:hover & {
    display: block;
  }
`;

function EmoManage({getData, feedIdx, myLikeType, likeCount, cheerupCount, sadCount, likeTotalCount}) {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [cheerup, setCheerup] = useState(false);
  const [sad, setSad] = useState(false);

  //현재 공감 상황에 따라 다르게 보이게
  useEffect(()=>{
      if(myLikeType === 1){
        setLike(true);
        setCheerup(false);
        setSad(false);
      } else if(myLikeType === 2){
        setLike(false);
        setCheerup(true);
        setSad(false);
      } else if(myLikeType === 3){
        setLike(false);
        setCheerup(false);
        setSad(true);
      } else if(myLikeType === 0){
        setLike(false);
        setCheerup(false);
        setSad(false);
      }
  }, [myLikeType])

  //공감 취소
  const likeCancel = async() => {
    try {
      const response = await api.delete(`/likes/${feedIdx}`);
      if(response.data.success){
        getData(0);      
      } else{
          // console.log("다시 시도해주세요.")
      }
    } catch (e) {
        // console.error(e);
        navigate("/error");
    }
  }

  //공감 등록 & 수정은 상황에 따라
  const likeTry = (num) => {
      if(myLikeType !== 0){ //이미 공감 있으면 수정
        getData(num);
        likeModify(num);
      }else{  //없으면 등록
        likeRegister(num);
      }
  }

  //공감 등록
  const likeRegister = async(num) => {
    try {
      const response = await api.post(`/likes`, {
        feedIdx : feedIdx,
        likeType : num
      });

      if(response.data.success){
        getData(num);
      }else{
          // console.log("다시 시도해주세요.")
      }

    } catch (e) {
        // console.error(e);
        navigate("/error");
    }
  }

    //공감 수정
    const likeModify = async(num) => {
      try {
        const response = await api.patch(`/likes`, {
          feedIdx : feedIdx,
          likeType : num
        });
  
        if(response.data.success){
          getData(num);     
        }else{
          // console.log("다시 시도해주세요.")
        }
  
      } catch (e) {
          // console.error(e);
          navigate("/error");
      }
    }

  return (
    <div>
      <DropDown>
        <Container>
            {myLikeType !== 0 ? <FaSmile color="#7767FD" size="23"/>:<FaRegSmile color="#7767FD" size="23"/>}
            <Text>받은 마음 {likeTotalCount}개</Text>  
        </Container>
          <ListContainer>
            <Container>
              <Emote>
                {like ? <BsEmojiHeartEyesFill  onClick={likeCancel} color="white" size="22" />:<BsEmojiHeartEyes onClick={()=>{likeTry(1)}} color="white" size="22"/>}
                <EmoteText>{likeCount}
                </EmoteText>
                </Emote>
              <Emote>
                {cheerup ? <BsEmojiWinkFill  onClick={likeCancel} color="white" size="22"/>:<BsEmojiWink onClick={()=>{likeTry(2)}} color="white" size="22"/>}
                <EmoteText>{cheerupCount}</EmoteText>
              </Emote>
              <Emote>
                {sad ? <BsEmojiFrownFill onClick={likeCancel} color="white" size="22"/>:<BsEmojiFrown onClick={()=>{likeTry(3)}} color="white" size="22"/>}
                <EmoteText>{sadCount}</EmoteText>
                </Emote>
            </Container>
          </ListContainer>
      </DropDown>    
    </div>

  );
};

export default EmoManage;