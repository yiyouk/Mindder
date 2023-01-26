const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
canvas.width = 800
canvas.height = 800
// width: 330px;
// height: 358px;
context.lineWidth = 6
const modeBtn = document.getElementById("mode-btn")



function downMouse(e){
  context.moveTo(e.offsetX, e.offsetY)
  console.log(e)
  isPainting = true
}

function upMouse(){
  isPainting = false
  // context.beginPath()
  // context.moveTo(e.offsetX, e.offsetY)
}

function onMove(e){
  console.log(isPainting)
  if (isPainting){
    context.lineTo(e.offsetX, e.offsetY)
    context.stroke()
    return
  }
  // path를 끊어주지 않으면 속성을 변경할 때마다 이전에 그린것까지 전부 변경된다.
  context.beginPath()
  context.moveTo(e.offsetX, e.offsetY)
}
function onModeClick(e){
  console.log(e)
  if (isFilling){
    isFilling = true
    modeBtn.innerText = "채우기"
  } else {
    isFilling = true
    modeBtn.innerText = "그리기"
  }
}


let isPainting = false
let isFilling = false

canvas.addEventListener("mousedown", downMouse)
document.addEventListener("mouseup", upMouse)
canvas.addEventListener("mousemove", onMove)
modeBtn.addEventListener("click", onModeClick)
// document.addEventListener("mouseup", ()=>{isPainting=false})

function rstCanvas(e){
  console.log(rstbtn)
  console.log(e)
  context.clearRect(0,0,canvas.height,canvas.width)
}
const rstbtn = document.querySelector(".reset")
console.log(rstbtn)
rstbtn.addEventListener("click", rstCanvas)

