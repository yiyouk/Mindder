import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import api from "../../api/api"

import styled from "styled-components";
import '../../assets/css/modal.css';

import { Toggle, Circle } from '../post/PostCommentwrite';
import { useDispatch } from 'react-redux';
import { SAVE_feedDetailRender } from '../../redux/reducers';


const Container = styled.div`
  display:flex;
  align-items: center;
  font-size: 0.8rem;
  padding-left: 1rem;
`

const Side = styled.div`
  display:flex;
  justify-content: space-between;
`


const Modal = ({normalTag, open, close, mainText, feedIdx, isPublic}) => {
  // console.log(isPublic)
  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const [Text, setText] = useState("")
  const [toggle, setToggle] = useState(isPublic);
  // const [isPublic, setIsPublic] = useState(isPublic);

  //토글 버튼 클릭
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  //현재 글
  useEffect(()=>{
      setToggle(isPublic)
      if(normalTag===null){
        setText(mainText);
      }else{
        setText(mainText + normalTag);
      }
  }, [open])


  //새로운 글 입력중
  const handleText = e => {
      setText(e.target.value);
  }

   //댓글 수정하기 비동기 통신
   const modifyPost = async() => { // async, await을 사용하는 경우
      const getNormalTag = Text.match(/#[^\s#]+/g)
      const normalTag = getNormalTag ? getNormalTag.join('') : getNormalTag

      const getMainText = Text.replace(/#[^\s#]+/g, '').split(' ').filter(function(item) {
        return item !== ''})
      const mainText = getMainText ? getMainText.join(' ') : getMainText
      
    try {
        const response = await api.patch(`/feeds`,{
          feedIdx: feedIdx,
          mainText: mainText,
          normalTag: normalTag,
          public: toggle
        });
        
        if(response.data.success){
            dispatch(SAVE_feedDetailRender())
            navigate(`/f/${feedIdx}`)
        } else{ 
          // console.log("수정 실패")
      }
        
    } catch (e) {
        // console.error(e);
        navigate("/error");
    }
}


  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            글 수정하기
          </header>
          <textarea cols="43" rows="10" value={Text} onChange={handleText}/>
          <Side>
            <Container>
              <Toggle onClick={clickedToggle} toggle={toggle}>
                <Circle toggle={toggle}/>
              </Toggle>
                <span>{toggle ? "공 개" : "비공개"}</span>
            </Container>
            <footer>
              <button className="close" onClick={()=>{close(); modifyPost();}}> 수정 </button>
              <button className="close" onClick={close}> 닫기 </button>
            </footer>
          </Side>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;