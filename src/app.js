import 'bulma'
import './style.scss'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.globalAlpha = 0.2
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, canvas.width, canvas.height)

var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
const keys =[]
document.body.addEventListener('keydown', function (e) {
  keys[e.keyCode] = true
})

document.body.addEventListener('keyup', function (e) {
  keys[e.keyCode] = false
})




let lastTime = 0



const player = {
  height: 20,
  width: 20,
  posX: 0,
  posY: 0,
  velX: 0,
  velY: 0,
  speed: 3,
  jumping: false,
  grounded: false

}


const world = {
  gravity: 0.3,
  friction: 0.8
}


var boxes = []

// dimensions
boxes.push({
  x: 100,
  y: 100,
  width: 100,
  height: 20
})
boxes.push({
  x: 0,
  y: 120,
  width: 80,
  height: 20
})
boxes.push({
  x: 10 - 10,
  y: 80,
  width: 50,
  height: 20
})


function collisionDetection(shapeA, shapeB){
  var vX = (shapeA.posX + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.posY + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
    // add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2),
    hHeights = (shapeA.height / 2) + (shapeB.height / 2),
    colDir = null

  // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    //  figures out on which side we are colliding (top, bottom, left, or right)
    var oX = hWidths - Math.abs(vX),
      oY = hHeights - Math.abs(vY)
    if (oX >= oY) {
      if (vY > 0) {
        colDir = 't'
        shapeA.posY += oY
      } else {
        colDir = 'b'
        shapeA.posY -= oY

      }
    } else {
      if (vX > 0) {
        colDir = 'l'
        shapeA.posX += oX
      } else {
        colDir = 'r'
        shapeA.posX -= oX
      }
    }
  }
  return colDir
}




function gameLoop(timestamp) {

  if (keys[38] || keys[32]) {
    // up arrow or space
    if (!player.jumping && player.grounded) {
      player.jumping = true
      player.grounded = false
      player.velY = -player.speed * 2
    }
  }if (keys[39]) {
  // right arrow
    if (player.velX < player.speed) {
      player.velX++
    }
  }
  if (keys[37]) {         // left arrow
    if (player.velX > -player.speed) {
      player.velX--
    }
  }


  const deltaTime = timestamp - lastTime
  lastTime = timestamp

  ctx.clearRect(0, 0, 800, 600)
  ctx.globalAlpha = 0.2
  grd.addColorStop(0, '#8ED6FF')
  grd.addColorStop(0.2, '#004CB3')
  grd.addColorStop(0.4, '#EE4CB3')
  grd.addColorStop(0.6, '#E000EE')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, canvas.width, canvas.height)


  player.velX *= world.friction
  player.velY += world.gravity

  ctx.fillStyle = 'black'
  ctx.globalAlpha = 1




  player.grounded = false
  boxes.map(x => {
    ctx.fillRect(x.x, x.y, x.width, x.height)
    var dir  = collisionDetection(player, x)
    if (dir === 'l' || dir === 'r') {
      player.velX = 0
      player.jumping = false
    } else if (dir === 'b') {

      player.grounded = true
      player.jumping = false
    } else if (dir === 't') {
      player.velY = 0
    }
  })




  if(player.grounded){
    player.velY = 0
  }
  player.posX += player.velX
  player.posY += player.velY

  ctx.fillStyle = 'rgba(250,250,250,0.8)'
  ctx.strokeStyle = 'blue'
  ctx.stroke()
  ctx.fillRect(player.posX, player.posY, player.width, player.height)





  requestAnimationFrame(gameLoop)
}




gameLoop()
