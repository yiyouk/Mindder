// 추천 캔버스 개별 컴포넌트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import CanvasSample from "../../assets/images/CanvasSample.png"



const sizeStyles = css`
  /*크기*/
  ${({size}) => css`
    height: ${sizes[size].height};
    width: ${sizes[size].width};
    font-size: ${sizes[size].fontsize};
  `}
`;

const sizes = {

    // 디테일
    "l": {
        height: '22rem',
        width: '22rem'
    },

    // 프로필
    "m": {
        height: '10rem',
        width: '10rem',
    },

    // 추천피드
    "s": {
        height: '6.5rem',
        width: '6.5rem',
    },
};


CanvasItem.defaultProps = {
    size: "s",
  };


const RecoCanvas = styled.div`
  ${sizeStyles}
  /* background-image:url(${(props)=>props.imageUrl}); */
  background-image:url(${CanvasSample});
  background-size:cover;
  filter: drop-shadow(0px 1.5px 1.5px rgba(0, 0, 0, 0.25));
  border-radius: 4px;
  cursor: pointer;
`;


function CanvasItem({size, feedIdx, imageUrl, commentCount, likeTotalCount}) {
  console.log(size, feedIdx)
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/f/${feedIdx}`);
  };
  return(
    <RecoCanvas onClick={onClick} size ={size} commentCount={commentCount} likeTotalCount={likeTotalCount}
    ></RecoCanvas>
  )
}

export default CanvasItem;