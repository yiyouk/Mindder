// 추천 캔버스 개별 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
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
        height: '7rem',
        width: '7rem',
    },

    // 크롤링이미지
    "xs": {
        height: '4rem',
        width: '4rem',
    },
};


CrawItem.defaultProps = {
    size: "s"
  };
//////////////

const RecoCanvas = styled.div`
  ${sizeStyles}
  background-image:url(${(props)=>props.imageUrl});
  background-size:cover;
  filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
  cursor: pointer;
`;

function CrawItem({size, imageUrl, feedIdx}) {
  const navigate = useNavigate();

  // 크롤링 이미지는 일단 새창에서 열리게 함
  const toExternal = () => {
    window.open(feedIdx, '_blank')
  };

  return(
    <RecoCanvas onClick={toExternal} size ={size} imageUrl={imageUrl} />
  )
}

export default CrawItem;