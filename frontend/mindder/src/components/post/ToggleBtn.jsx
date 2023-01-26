import React, {useState} from "react";
import styled from "styled-components";

const Toggle = styled.button`
  width: 42px;
  height: 24px;
  /* border-radius: 30px; */
  /* border: 1px solid grey; */
  cursor: pointer;
  /* background-color: ${(props) => (!props.toggle ? "none" : "rgb(51,30,190)")}; */
  position: absolute;
  left:23%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  background: #FFFFFF;
  border: 1px solid #7767FD;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  background: #7767FD;
  border-radius: 50px;
  position: absolute;
  left: 3%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    `
      transform: translate(20px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const Container = styled.div`
  display:flex;
  align-items:center;
  padding-left:10px;
`

function ToggleBtn(props) {
  const [toggle, setToggle] = useState(false);
  const clickedToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
 	  <Container>
      <h4>{!toggle ? "공 개" : "비공개"}</h4>
      <Toggle onClick={clickedToggle} toggle={toggle}>
        <Circle toggle={toggle} />
      </Toggle>
    </Container>
  );
}


export default ToggleBtn;