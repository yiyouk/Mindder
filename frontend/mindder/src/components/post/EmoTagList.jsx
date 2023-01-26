import React from "react";
import styled from "styled-components";
import EmoTag from "./EmoTag";

const EmotionTag = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 68px;
  height: 51px;
  border: 1px solid black;
  margin:0.5rem;
  flex-direction:column;
  display:flex;
  align-items:center;
`




function EmoTagList(props){

  const Emoticons = [
    {
        id:1,
        name:"화남",
    },
    {
        id:2,
        name:"기쁜",
    },
    {
        id:3,
        name:"외로움",
    },
    {
        id:4,
        name:"우울",
    },
    {
        id:5,
        name:"피곤",
    },
    {
        id:6,
        name:"만족",
    },
    {
        id:7,
        name:"행복",
    },
    {
        id:8,
        name:"슬픔",
    },
    {
        id:9,
        name:"불안",
    },
    {
        id:10,
        name:"아픔",
    },
    {
        id:11,
        name:"불쾌",
    },
    {
        id:12,
        name:"실망",
    },
    {
        id:13,
        name:"설렘",
    },
    {
        id:14,
        name:"신남",
    },
    {
        id:15,
        name:"지루함",
    },
    {
        id:16,
        name:"?",
    },
  ]

  return (
    <>
    {Emoticons.map((emo)=>(
        <EmotionTag>
            <EmoTag
            key={emo.id} emoId={emo.id} emoName={emo.name} 
            />
        </EmotionTag>
      ))}
    </>
  )
}

export default EmoTagList;
