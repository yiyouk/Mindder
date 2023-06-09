// 추천 캔버스 개별 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import {FaHeart, FaComment} from "react-icons/fa";
import styled, { css } from "styled-components";

//크기 디자인
const sizeStyles = css`
  /*크기*/
  ${({size}) => css`
    height: ${sizes[size].height};
    width: ${sizes[size].width};
    font-size: ${sizes[size].fontsize};
  `}
`;

const sizes = {

    // 디테일 게시글
    "l": {
        height: '22rem',
        width: '22rem'
    },
    
    "ml": {
      height: '20rem',
      width: '20rem'    
    },

    // 프로필
    "m": {
        height: '11rem',
        width: '11rem',
    },
    // 프로필
    "ms": {
      height: '10rem',
      width: '10rem',
    },

    // 추천피드
    "s": {
        height: '6.25em',
        width: '6.25em',
    },

    // 크롤링이미지
    "xs": {
        height: '4rem',
        width: '4rem',
    },
};


CanvasItem.defaultProps = {
    size: "s",
    up: true
  };
//////////////

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0.2rem;
`

const CanvaConContainer = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  bottom: 0.1em;
  right: 0.1em;
`

const CanvaImgStyle = styled.img`
  ${sizeStyles}
  border: 0.02rem solid rgba(219, 219, 219, 0.3);
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(219, 219, 219, 0.3);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
`

const CanvaConStyle = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  margin: 0.5em;
  & > img{
    width: 1.2em;
    margin-right: 0.2em;
  }
`
function CanvasItem({size, list, up}) {
  const navigate = useNavigate();

  //피드는 클릭시 상세 페이지로
  const onClick = () => {
    navigate(`/f/${list.feedIdx}`);
  };

  return(
    <Wrapper onClick={onClick}>
      <CanvaImgStyle size ={size} 
      src={"data:image/" + list.extension + ";base64," + list.base64}
      />
        <CanvaConContainer>
            { up ? 
            <>
              <CanvaConStyle>
                <FaHeart color="#fc805d" style={{position:'relative', right:'0.2rem'}}/>
                {list.likeTotalCount}
              </CanvaConStyle>
              <CanvaConStyle>
                <FaComment color="#fc805d" style={{position:'relative', right:'0.2rem'}}/>
                {list.commentCount}
              </CanvaConStyle>
            </>
            : null}
        </CanvaConContainer>
    </Wrapper>
  )
}

export default CanvasItem;