import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`

function PostCommentwrite(props){
  return (
    <Wrapper>
      그림그리고, 코멘트 작성하는 페이지에요
    </Wrapper>
  );
};

export default PostCommentwrite;