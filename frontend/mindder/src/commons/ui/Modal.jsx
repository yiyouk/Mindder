import React, {useState} from 'react';
import styled from "styled-components";

import "../../assets/css/modal2.css"
const Modal = ({sendTag, open, close}) => {
  const [Text, setText] = useState("")

  //새로운 글 입력중
  const handleText = e => {
    setText(e.target.value);
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <>
          <footer>
          <input type="text" value={Text} onChange={handleText}/>
            <button className="close" onClick={()=>{close(); sendTag(Text);}}>
              확인
            </button>
          </footer>
        </>
      ) : null}
    </div>
  );
};

export default Modal;