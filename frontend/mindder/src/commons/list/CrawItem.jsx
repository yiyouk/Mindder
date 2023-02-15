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
    margin-left: ${sizes[size].margin};
    margin-right: ${sizes[size].margin};
  `}
`;

const sizes = {
    // 검색창에서 사용
    "s": {
        height: '7rem',
        width: '5rem',
        margin: '0.8rem'
    },
    // 포스트 페이지에서 사용
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
  const toExternal = () => {
    window.open(feedIdx, '_blank')
  };

  return(
    <RecoCanvas onClick={toExternal} size ={size} imageUrl={imageUrl} />
  )
}

export default CrawItem;