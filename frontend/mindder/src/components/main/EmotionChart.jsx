import React from "react";
import styled from "styled-components";

// 추천 캔버스
const ChartContainer = styled.div`
    margin-top:1rem;
    width: 22rem;
    height: 10rem;
    border-radius:20px;
    display: flex;
    align-items: center;
    background-color:#e1c0c0;
    justify-content: center;
    flex-direction:column;
`;

const Container = styled.div`
    width: 22rem;
    height: 9rem;
    & > * {
        :not(:last-child) {
            margin-bottom: 0.5rem;
        }
    }
    background-color:#573d3d;
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`;

const ChartHeader = styled.h4`
    font-size: 1rem;
    font-weight: 900;
    position:relative;
    right:120px;
    margin: 0;
`

function EmotionChart (props) {
  return (
    <ChartContainer>
      <ChartHeader>마인더 통계</ChartHeader>
      <Container></Container>
    </ChartContainer>
  )
}

export default EmotionChart;