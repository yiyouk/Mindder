import React, {useState} from "react";
import styled from "styled-components";
import EmoHeader from "./EmoHeader";
import TodayEmotion from "./TodayEmotion";
import EmoColors from "./EmoColors";
import { Wrapper } from "./PostEmotag";
import { CardContainer } from "./PostEmotag";
import { Colors16, SAVE_todayColor } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

function PostEmocolor(props){
  const selectedSrc = useSelector((state)=>state.USER.emotagSrc)
  const selectedEmo = useSelector((state)=>state.USER.todayEmotion)
  const dispatch = useDispatch()

  const [imgSrc, setImgSrc] = useState(selectedSrc)

  const onClick = (e) => {
    const name = e.currentTarget.id
    const updatedSrc = require(`../../assets/images/mindder_bear/${selectedEmo}/${name}.webp`)
    console.log(updatedSrc)
    setImgSrc(updatedSrc)
    dispatch(SAVE_todayColor(name))
  }
  return (
    <Wrapper>
      <EmoHeader text="감정의 색을 채워주세요"/>
      <TodayEmotion
      imgSrc={imgSrc}
      />
      <CardContainer columnGap={1}>
        {Colors16.map((color)=>(
          <div onClick={(e)=>{onClick(e)}} id={color.name} key={color.id}>
            <EmoColors
            key={color.id} colorCode={color.code} colorName={color.name}
            />
          </div>
        ))}
      </CardContainer>
    </Wrapper>
  )
}

export default PostEmocolor;