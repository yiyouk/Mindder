import React from "react";
import styled from "styled-components";

const EmotionChart = styled.div`
  margin-top:10px;
    width: 360px;
    height: 152px;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
    /* border : 1px solid black; */
    /* background-color:#7767FD; */
    border-radius:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
`