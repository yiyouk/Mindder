import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top:10px;
    width: 360px;
    height: 122px;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    border : 1px solid black;
    /* background-color:#7767FD; */
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction:column;
`

const ChartHeader = styled.h4`
    font-size:16px;
    font-weight:900;
    /* color:white; */
    position:relative;
    top:15px;
    right:120px;
    margin: 0;
`
const chart = styled.div`
  
`

function EmotionChart (props) {
  return (
    <Container>
      <ChartHeader>마인더 통계</ChartHeader>
    </Container>
  )
}

export default EmotionChart;