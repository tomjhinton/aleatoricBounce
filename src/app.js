import 'bulma'
import './style.scss'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.globalAlpha = 0.2
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, canvas.width, canvas.height)

document.onkeydown = checkKey

function checkKey(e) {
  e = e || window.event
  e.preventDefault()
  console.log(e)

  if (e.keyCode === 38 || e.keyCode === 32) {
    // up arrow


  }else if (e.keyCode === 40) {
    // down arrow

  } else if (e.keyCode === 37) {
    // left arrow




  }else if (e.keyCode === 39) {
    // right arrow


  }else if (e.keyCode === 82) {
    //R
  }
}

let lastTime = 0;

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, 800, 600);
  ctx.globalAlpha = 0.2
  ctx.fillStyle = 'green'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  requestAnimationFrame(gameLoop);
}

gameLoop();
