import React, {useState} from "react";
import styled from "styled-components";
import EmoHeader from "./EmoHeader";
import TodayEmotion from "./TodayEmotion";
import EmoColors from "./EmoColors";
import { Wrapper } from "./PostEmotag";
import { CardContainer } from "./PostEmotag";
import { Colors16 } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../redux/store";

const EmoColorList = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  /* border: 1px solid blue; */
`

function PostEmocolor(props){
  const selectedSrc = useSelector((state)=>state.reducer.emotagSrc)
  const selectedEmo = useSelector((state)=>state.reducer.todayEmotion)
  const dispatch = useDispatch()

  const [imgSrc, setImgSrc] = useState(selectedSrc)

  return (
    <Wrapper>
      <EmoHeader text="감정의 색을 채워주세요"/>
      <TodayEmotion
      imgSrc={imgSrc}
      />
      <CardContainer>
        {Colors16.map((color)=>(
          <EmoColorList key={color.id} id={color.name}
          onClick={(e)=>{
            const name = e.currentTarget.id
            const updatedSrc = require(`../../assets/images/mindder_bear/${selectedEmo}/${name}.png`)
            setImgSrc(updatedSrc)
            dispatch(userAction.SAVE({selected:name, case:"emoColor"}))
          }}
          >
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