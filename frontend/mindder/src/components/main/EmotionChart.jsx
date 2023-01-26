import React from "react";
import styled from "styled-components";

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


function EmotionChart (props) {
  return (
      <Container></Container>
  )
}

export default EmotionChart;