import React, {useState} from "react";
import styled from "styled-components";
import EmoHeader from "./EmoHeader";
import TodayEmotion from "./TodayEmotion";
import EmoColors from "./EmoColors";

const Wrapper = styled.div`
    /* padding: 0; */
    width: calc(100% - 2rem);
    height:31.5rem;
    display: grid;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border:1px solid blue; */
`;

const CardContainer = styled.div`
  width:330px;
  /* height:260px; */
  /* border: 1px solid black; */
  display:grid;

  grid-template-columns: repeat(4, 1fr);
  /* padding-right:10px; */
  /* margin:8px auto; */
  /* border: 1px solid black; */
`
const EmoColorList = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  /* border: 1px solid blue; */
`


function PostEmocolor(props){
  const colors = [
    {
      id:1,
      name:"red",
      code:"#F56161"
    },
    {
      id:2,
      name:"blue",
      code:"#82AAE3"
    },
    {
      id:3,
      name:"green",
      code:"#B6E2A1"
    },
    {
      id:4,
      name:"beige",
      code:"#F8EDE3"
    },
    {
      id:5,
      name:"brown",
      code:"#AD8270"
    },
    {
      id:6,
      name:"gray",
      code:"#B2B2B2"
    },
    {
      id:7,
      name:"pink",
      code:"#FC9CBB"
    },
    {
      id:8,
      name:"navy",
      code:"#3A4F7A"
    },
    {
      id:9,
      name:"peach",
      code:"#FFC7C7"
    },
    {
      id:10,
      name:"yellow",
      code:"#F8F388"
    },
    {
      id:11,
      name:"orange",
      code:"#FFCC80"
    },
    {
      id:12,
      name:"purple",
      code:"#BA94D1"
    },
    {
      id:13,
      name:"white",
      code:"#FFFFFF"
    },
    {
      id:14,
      name:"mint",
      code:"#7FE9DE"
    },
    {
      id:15,
      name:"mauve",
      code:"#863A6F"
    },
    {
      id:16,
      name:"black",
      code:"#000000"
    },
  ]
  
  const defaultSrc = require("../../assets/images/face2.png")

  const [imgSrc, setImgSrc] = useState(defaultSrc)

  return (
    <Wrapper>
      <EmoHeader text="감정의 색을 채워주세요"/>
      <TodayEmotion
      imgSrc={imgSrc}
      />
      <CardContainer>
        {colors.map((color)=>(
          <EmoColorList>
            <EmoColors
            key={color.id} colorCode={color.code} colorName={color.name} 
            />
          </EmoColorList>
        ))}
      </CardContainer>
    </Wrapper>
  )
}

export default PostEmocolor;