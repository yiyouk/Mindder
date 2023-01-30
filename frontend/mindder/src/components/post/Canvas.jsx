import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
// import axios from "axios";
// import { BACKEND_URL } from '../../config';

import TrashImg from "../../assets/images/trash.png"
import SaveImg from "../../assets/images/saveButton.png"
const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`
// #### styled ####
const Canva = styled.canvas`
border-radius: 10px;
border: 1px solid #CACACA;
`
const Colors = styled.div`
display: flex;
border-radius: 25px;
border: 1px solid #CACACA;
background-color: white;
`
const Color = styled.button`
  border-radius: 25px;
  margin: 5px;
  width: 25px;
  height: 25px;
  border: 1px solid #CACACA;
`
const Strokes = styled.div`
display: flex;
border-radius: 25px;
border: 1px solid #CACACA;
background-color: white;
align-items: center;
`
const Stroke = styled.button`
  margin: 5px;
  width: 25px;
  height: ${(props)=>props.style?props.style.strokeWidth:5}px;
  background-color:black;
  border-radius: 10px;
  border: 1px solid #000000;
`
const EraseBtn = styled.button`
    border-radius: 25px;
    margin: 5px;
    width: 25px;
    height: 25px;
    border: 1px solid #CACACA;
`
const EraseAll = styled.button`
    margin: 5px;
    width: 25px;
    height: 25px;
    background-image:url(${TrashImg});
    border: none;
    background-color: transparent;
    background-size: 120%;
    background-position:center;
    background-repeat: no-repeat;
`
const SaveBtn = styled.button`
    margin: 5px;
    width: 25px;
    height: 25px;
    background-image:url(${SaveImg});
    border: none;
    background-color: transparent;
    background-size: 120%;
    background-position:center;
    background-repeat: no-repeat;`


    
function Draw() {
    const canvasRef = useRef(null);

    const [ctx, setCtx] = useState([]);
    const [isDrawing, setIsDrawing] = useState('');
    const [erase, setErase] = useState('');
    const [mode, setMode] = useState("brush");

    // -- 캔버스 생성 -- //
        useEffect(() => {
            const canvas = canvasRef.current;
            canvas.width = 330;
            canvas.height = 330;
        }, []);

    // -- 색 변경 -- //
    // mode가 erase 상태면 자동으로 brush 상태로 변경 //
        const [color, setColor] = useState("black");
        const handleColorClick = (event) => {
            const newColor = event.target.style.backgroundColor ;
            setColor(newColor);
            setMode("brush")
        }

    // -- 선, 지우개 두께 변경 -- //
        const [stroke, setStroke] = useState(1);
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

    // -- 전체 지우기 -- //
        const eraseAll = () => {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    
    // -- 지우개 버튼 클릭 시 모드 erase로 변경 -- //
        const eraseMode = () => {
            setMode("erase")
        }

    // -- mouseDown시 동작 -- //
    // mode가 brush면 Drawing, mode가 erase면 Erase //
        const initDraw = ({nativeEvent}) => {
            if(mode === "brush"){
                setErase(check => !check);
                setIsDrawing(check => !check);
                // console.log(setIsDrawing(true))
                // console.log(isDrawing, erase)
            } else if (mode === "erase"){
                setIsDrawing(check => !check);
                setErase(check => !check);
                // console.log(isDrawing, erase)
            }
        };

        useEffect( () => {
        }, [isDrawing]);
        
        const drawMobile = (e) => {
            const X = e.touches[0].clientX - e.target.offsetLeft;
            const Y = e.touches[0].clientY - e.target.offsetTop + document.documentElement.scrollTop;
            if(mode === "brush"){
                if (ctx) {
                    if (!isDrawing) {
                        // console.log(isDrawing, erase)
                        ctx.beginPath();
                        ctx.moveTo(X, Y);
                    } else {
                        // console.log('터치로도 그려진다!')
                        ctx.lineTo(X, Y);
                        ctx.stroke();
                    }
                }
            }
            else if (mode === "erase"){
                if(erase) {
                    // 동그랗게 지우는 건 어떻게ㅠ..
                    if (!erase) {                        
                        ctx.beginPath();
                        ctx.moveTo(X, Y);
                    } else {
                        ctx.clearRect(X-ctx.lineWidth/2, Y-ctx.lineWidth/2, ctx.lineWidth, ctx.lineWidth);
                    }
                }
            }
        };
    
    // -- mouseMove 동작 -- /
    // brush 모드 isDrawing 상태면 그림 그려짐, erase 모드면 지우개.. //
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
                    // 동그랗게 지우는 건 어떻게ㅠ..
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
            console.log(file)
            var formData = new FormData();
            formData.append("media", file);
            formData.append("content", "Blob확인");
            formData.append("tagList", "blob");
            formData.append("username", "admin");

            console.log(formData)

            // axios
            // .post(`${BACKEND_URL}/feeds`, null, {
            //   headers: {
            //     // "Content-type": "multipart/form-data",
            //     // Authorization: sessionStorage.getItem("jwt"),
            //   },
            // })
            // .then((res) => {
            //   console.log(res);
            // })
            // .catch((err) => {
            //   alert("실패");
            //   console.log(err)
            // });
        }
            return (
                <Wrapper>
                  <Canva ref={canvasRef}
                    onMouseDown={initDraw}
                    onMouseMove={draw}
                    onMouseUp={finishDraw}
                    onPointerOut={finishDraw}

                    // 모바일로 터치할때는..
                    onTouchStart={initDraw}
                    onTouchMove={drawMobile}
                    onTouchEnd={finishDraw}
                    onTouchCancel={finishDraw}
                  >
                </Canva>
            
                    <Colors>
                        <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#2c2c2c"}} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "white" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#F56161" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#FFCC80" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#F8C388" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#B6E2A1" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#7FE9DE" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#82AAE3" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#863A6F" }} />
                         <Color className="singleColor" onClick={handleColorClick} style={{ backgroundColor: "#863A6F" }} />
                    </Colors>
                    <Strokes>
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 1}}></Stroke>
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 3}}></Stroke> 
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 5}}></Stroke>                    
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 7}}></Stroke>                    
                        <Stroke onClick={handleStrokeWidth} style={{ strokeWidth: 10}}></Stroke>
                        <EraseBtn onClick={eraseMode}></EraseBtn>
                        <EraseAll onClick={eraseAll}></EraseAll>
                        <SaveBtn onClick={imageSaved}></SaveBtn>
                    </Strokes>
                
                 
                </Wrapper>
              );
            }
        
        export default Draw;

