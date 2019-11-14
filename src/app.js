import 'bulma'
import './style.scss'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.globalAlpha = 0.2
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, canvas.width, canvas.height)

var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

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



let player = {
  height: 10,
  width: 10,
  posX: 0,
  posY: 0,
  velX: 3,
  velY: 0

}


let world = {
  gravity: 0.3,
  friction: 0.3

}


var boxes = []

// dimensions
boxes.push({
  x: 100,
  y: 100,
  width: 100,
  height: 10
})
boxes.push({
  x: 0,
  y: 10 - 2,
  width: 10,
  height: 50
})
boxes.push({
  x: 10 - 10,
  y: 0,
  width: 50,
  height: 10
})


function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime
  lastTime = timestamp

  ctx.clearRect(0, 0, 800, 600);
  ctx.globalAlpha = 0.2
  grd.addColorStop(0, '#8ED6FF')
  grd.addColorStop(0.2, '#004CB3')
  grd.addColorStop(0.4, '#EE4CB3')
  grd.addColorStop(0.6, '#E000EE')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'black'
  ctx.globalAlpha = 1
  boxes.map(x => ctx.fillRect(x.y, x.x, x.width, x.height))

  ctx.globalAlpha = 0.2

  requestAnimationFrame(gameLoop)
}

gameLoop()
