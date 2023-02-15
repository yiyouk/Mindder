import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import TrashImg from "../../assets/images/trash.png"
import BrushImg from "../../assets/images/brush.png"
import EraserImg from "../../assets/images/eraser.png"
import FillImg from "../../assets/images/paint.png"
import UndoImg from "../../assets/images/undo.png"
import { useDispatch } from "react-redux";
// import { SAVE_userDrawing } from "../../redux/reducers";


// #### styled ####

const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;

`
const Canva = styled.canvas`
border-radius: 10px;
border: 1px solid #CACACA;

`

const Container = styled.div`
display: flex;
background-color: white;
align-items: center;
& > input{
    margin:5px;
    background-color: transparent;
    appearance: none;
    height: 25px; 
    cursor: pointer;
}
`
const Color = styled.button`
  border-radius: 25px;
  margin: 5px;
  width: 25px;
  height: 25px;
  border: 1px solid #CACACA;
  background-color: ${(props)=>props.value?props.value:"#FFFFFF"};
  
  cursor: pointer;
`
const Stroke = styled.div`
  margin: 5px;
  width: 25px;
  height: 25px;
  border-radius: 10px;
  background-color: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & >div{
      width: 25px;
      background-color:black;
      border-radius: 20px;
      height: ${(props)=>props.children.props.style ? props.children.props.style.strokeWidth : 5}px;
  }
`
const PaintTool = styled.button`
    margin: 5px;
    width: 25px;
    height: 25px;
    background-image:url(${(props) => (props.img)});
    border: none;
    background-color: white;
    /* background-color: ${(props) => props.mode === true? '#d9ebff' : '#ffffff'}; */
    background-size: 100%;
    background-position:center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    

`
    
function Draw({canvasRef, imageSaved}) {

    const [ctx, setCtx] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [erase, setErase] = useState(false);
    const [isFill, setIsFill] = useState(false)
    const [mode, setMode] = useState("brush");
    const [color, setColor] = useState("black");
    const [stroke, setStroke] = useState(1);
    const [prev, setPrev] = useState([]);


    // -- 캔버스 생성 -- //
        useEffect(() => {
            const canvas = canvasRef.current;
            canvas.width = 335;
            canvas.height = 335;
        }, []);


    // -- 선, 지우개 두께 변경 -- //
        const handleStrokeWidth = (event) => {
            const newStrokeWidth = event.target.style.strokeWidth ;
            setStroke(newStrokeWidth);
        }

    // -- 색, 선 굵기 변경 -- //
        useEffect(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.lineWidth = stroke;
            context.strokeStyle = color;
            setCtx(context);
        }, [color, stroke])
    // -- 색 변경 -- //
        const changePicker = (e) => {
            setColor(e.target.value);
            if (mode === "erase"){
                setMode("brush")
            }
        }

        
    // -- 브러쉬 모드 -- //
        const brushMode = () => {
            setMode("brush")
        }
    // -- 채우기 모드 -- //
        const fillAll = () => {
            setMode("fill")
        }
    // -- 지우기 모드 -- //
        const eraseMode = () => {
            setMode("erase")
        }


    // -- 전체 지우기 -- //
        const eraseAll = () => {
            saveCanva()
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    // -- 되돌리기 -- //
        const onClickUndo = () => {
            if (prev.length === 0){

            } else {
                const canvaPrevData = prev.pop();
                let canvaPrev = new Image();
                canvaPrev.src = canvaPrevData;
                canvaPrev.onload = () => {
                    const canvas = canvasRef.current;
                    const context = canvas.getContext("2d");
                    context.clearRect(0, 0, canvas.width, canvas.height); 
                    context.drawImage(
                        canvaPrev, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height
                        );
                    }
            };
        }
    // -- 되돌리기 위해 캔버스 상태 저장 -- //
        const saveCanva = () => {
            const canvas = canvasRef.current;
            prev.push(canvas.toDataURL());
        }

    // -- 마우스 클릭 -- //
        const initDraw = () => {
            saveCanva()
            if(mode === "brush"){              
                setErase(check => !check);
                setIsDrawing(check => !check);
            } else if (mode === "erase"){
                setIsDrawing(check => !check);
                setErase(check => !check);
            } else if (mode === "fill"){
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                context.fillStyle = color;
                context.strokeStyle = color;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
        };
    // -- 마우스 동작 -- /
        const draw = ({nativeEvent}) => {
            const {offsetX, offsetY} = nativeEvent;
            if(mode === "brush"){
                if (ctx) {
                    if (!isDrawing) {
                        ctx.beginPath();
                        ctx.moveTo(offsetX, offsetY);
                    } else {
                        ctx.lineTo(offsetX, offsetY);
                        ctx.stroke();
                    }
                }
            }
            else if (mode === "erase"){
                if(erase) {
                    if (!erase) {                        
                        ctx.beginPath();
                        ctx.moveTo(offsetX, offsetY);
                    } else {
                        ctx.clearRect(offsetX-ctx.lineWidth/2, offsetY-ctx.lineWidth/2, ctx.lineWidth, ctx.lineWidth);
                    }
                }
            }
        };
    // -- 마우스 클릭 멈췄을 때 -- /
        const finishDraw = () => {
            setIsDrawing(false);
            setErase(false);
        };
    // -- 모바일 터치 시작 시 -- /  
        const mobileInit = (e) => {
            saveCanva()
            const X = e.touches[0].clientX - e.target.offsetLeft + document.documentElement.scrollLeft;
            const Y = e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;         
            ctx.beginPath();
            ctx.moveTo(X, Y);
        
        };
    // -- 모바일 터치 후 이동 -- /
        const drawMobile = (e) => {
            const X = e.touches[0].clientX - e.target.offsetLeft + document.documentElement.scrollLeft;
            const Y = e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;
            if(mode === "brush"){
                ctx.lineTo(X, Y);
                ctx.stroke();
            }
            else if (mode === "erase"){ 
                ctx.clearRect(X-ctx.lineWidth/2, Y-ctx.lineWidth/2, ctx.lineWidth, ctx.lineWidth);
            }
        };

            return (
                <Wrapper>
                    <Canva ref={canvasRef}
                        onMouseDown={initDraw}
                        onMouseMove={draw}
                        onMouseUp={finishDraw}
                        onPointerOut={finishDraw}

                        onTouchStart={mobileInit}
                        onTouchMove={drawMobile}
                        onTouchEnd={finishDraw}
                        onTouchCancel={finishDraw}
                    >
                    </Canva>
                    <Container>
                        <Color onClick={changePicker} value="#2c2c2c"/>
                        <Color onClick={changePicker} value="#FFFFFF"/>
                        <Color onClick={changePicker} value="#F56161"/>
                        <Color onClick={changePicker} value="#FFCC80"/>
                        <Color onClick={changePicker} value="#F8C388"/>
                        <Color onClick={changePicker} value="#B6E2A1"/>
                        <Color onClick={changePicker} value="#7FE9DE"/>
                        <Color onClick={changePicker} value="#82AAE3"/>
                        <input type="color" value={color.hex} onClick={changePicker} onChange={changePicker}/>
                    </Container>
                    <Container>
                        <div></div>
                        <Stroke onClick={handleStrokeWidth}><div style={{ strokeWidth: 3}}/></Stroke>
                        <Stroke onClick={handleStrokeWidth}><div style={{ strokeWidth: 7}}/></Stroke> 
                        <Stroke onClick={handleStrokeWidth}><div style={{ strokeWidth: 11}}/></Stroke>                    
                        <Stroke onClick={handleStrokeWidth}><div style={{ strokeWidth: 15}}/></Stroke>  
                        <Stroke onClick={handleStrokeWidth}><div style={{ strokeWidth: 20}}/></Stroke>
                        <PaintTool img={BrushImg} onClick={brushMode}></PaintTool>
                        <PaintTool img={FillImg} onClick={fillAll}></PaintTool>
                        <PaintTool img={EraserImg} onClick={eraseMode}></PaintTool>
                        <PaintTool img={UndoImg} onClick={onClickUndo}></PaintTool>
                        <PaintTool img={TrashImg} onClick={eraseAll}></PaintTool>
                    </Container>
                 
                </Wrapper>
              );
            }
        
        export default Draw;
