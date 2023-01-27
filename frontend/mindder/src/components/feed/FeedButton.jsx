import {React, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/images/menulistbtn.png";

const Wrapper = styled.div`
    width: 6rem;
`;

const Li = styled.li`
    list-style: none;
    /* border-bottom: 3rem; */
`;

const Ul = styled.ul`
    list-style: none;
    font-style: normal;
    font-weight: bold;
    font-size: 0.8rem;
    color: #666666;
    width: 3rem;
    margin: 0.5rem 0.2rem 0.5rem 0.2rem;
    padding: 0 0 0 0;
`;

//누르면 나오는거
const DropDown = styled.button`
    background-color: white;
    border: none;
    outline:none;
    position: relative;
`;

//박스 전체 컨테이너
const ListContainer = styled.div`
  background-color: white;
  /* border: 1px solid ${props => props.theme.borderColor}; */
  /* background-color: ${props => props.theme.bgColor}; */
  border-radius: 5px;
  border: solid 0.6px  #7767FD;
  /* border-color: #7767FD; */
  padding: 3px;
  margin-top: 7px;
  position: absolute;
  right: 0.5rem;
  display:none;
  ${DropDown}:active & {
    display: block;
  }
  ${DropDown}:focus & {
    display: block;
  }
`;

const EditBtn = styled.div`
    margin-top: 0.7rem;
    width: 0.3rem;
    height: 1.605rem;
    background-image: url(${Img});
    background-size: 0.3rem;
    background-color: white;
    justify-Content:center;
    align-Items:center;
`
const W = styled.span`
    background-color: white;
    color: #7767FD;
`

const P = styled.span`
    color: white;
    background-color: #7767FD;
`

function FeedButton(props) {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(0);

  return (
    <div>
        <Li>
            <DropDown>
                <EditBtn></EditBtn>
                <ListContainer  onMouseOver={() => setIsHovering(1)}
                                onMouseOut={() => setIsHovering(0)}>
                    <Ul>
                        <Li onClick={() => {navigate("/post");}}>
                        {isHovering ? (<W>수정</W>) : (<P>수정</P>)}</Li>
                        
                        <Li onClick={() => {navigate("/main");}}>
                        {isHovering ? (<W>삭제</W>) : (<P>삭제</P>)}</Li>

                    </Ul>
                </ListContainer>
            </DropDown>
        </Li>
    </div>

  );
};

export default FeedButton;