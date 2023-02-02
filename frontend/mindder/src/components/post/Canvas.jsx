import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import TrashImg from "../../assets/images/trash.png"
import SaveImg from "../../assets/images/saveButton.png"
import EraserImg from "../../assets/images/eraser.png"
import FillImg from "../../assets/images/paint.png"


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
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
}
`


const Color = styled.button`
  border-radius: 25px;
  margin: 5px;
  width: 25px;
  height: 25px;
  border: 1px solid #CACACA;
  
  cursor: pointer;
`
const Stroke = styled.button`
  margin: 5px;
  width: 25px;
  height: ${(props)=>props.style?props.style.strokeWidth:5}px;
  background-color:black;
  border-radius: 10px;
  border: 1px solid #000000;
  cursor: pointer;
`
const PaintTool = styled.button`
    margin: 5px;
    width: 25px;
    height: 25px;
    background-image:url(${(props) => (props.img)});
    border: none;
    background-color: transparent;
    background-size: 100%;
    background-position:center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
`
    
function Draw() {

    const canvasRef = useRef(null);

    const [ctx, setCtx] = useState([]);
    const [isDrawing, setIsDrawing] = useState('');
    const [erase, setErase] = useState('');
    const [mode, setMode] = useState("brush");
    const [color, setColor] = useState("black");
    const [stroke, setStroke] = useState(1);

    // -- 캔버스 생성 -- //
        useEffect(() => {
            const canvas = canvasRef.current;
            canvas.width = 330;
            canvas.height = 330;
        }, []);

    // -- 색 변경 -- //
        const handleColorClick = (event) => {
            const newColor = event.target.style.backgroundColor ;
            setColor(newColor);
            setMode("brush")
        }


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

        const changePicker = (e) => {
            setColor(e.target.value);
            setMode("brush");

        }

    // -- 전체 지우기 -- //
        const eraseAll = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    // -- 선택된 색으로 채우기 -- //
        const fillAll = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.fillStyle = color;
            context.strokeStyle = color;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

    // -- 지우개 버튼 클릭 시 모드 erase로 변경 -- //
        const eraseMode = () => {
            setMode("erase")
        }

    // -- 마우스 클릭 -- //
        const initDraw = () => {
            if(mode === "brush"){
                setErase(check => !check);
                setIsDrawing(check => !check);
            } else if (mode === "erase"){
                setIsDrawing(check => !check);
                setErase(check => !check);
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

    
    // -- 그린거 저장 어케하지 -- /
        const imageSaved = () => {
            const canvas = canvasRef.current;
            const image = canvas.toDataURL('image/png');
            const decodImg = atob(image.split(',')[1]);
            var array = [];
            for (var i = 0; i < decodImg.length; i++) {
                array.push(decodImg.charCodeAt(i));
            }

            var myBlob = new Blob([new ArrayBuffer(array)], {type: "image/png"});

            const file = new File([myBlob], 'blobtofile.png');
            // console.log(file)
            var formData = new FormData();
            formData.append("media", file);
            formData.append("content", "Blob확인");
            formData.append("tagList", "blob");
            formData.append("username", "admin");

            // console.log(formData)
        }
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
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#2c2c2c"}} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "white" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#F56161" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#FFCC80" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#F8C388" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#B6E2A1" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#7FE9DE" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#82AAE3" }} />
                        <Color onClick={handleColorClick} style={{ backgroundColor: "#863A6F" }} />
                        <input className="picker-style" type="color" value={color.hex} onChange={changePicker}/>
                    </Container>
                    <Container>
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 1}}></Stroke>
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 4}}></Stroke> 
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 7}}></Stroke>                    
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 10}}></Stroke>                    
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 15}}></Stroke>
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 20}}></Stroke>
                        <PaintTool img={FillImg} onClick={fillAll}></PaintTool>
                        <PaintTool img={EraserImg} onClick={eraseMode}></PaintTool>
                        <PaintTool img={TrashImg} onClick={eraseAll}></PaintTool>
                        <PaintTool img={SaveImg} onClick={imageSaved}></PaintTool>
                    </Container>
                 
                </Wrapper>
              );
            }
        
        export default Draw;
