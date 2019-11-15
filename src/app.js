import 'bulma'
import './style.scss'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.globalAlpha = 0.2
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, canvas.width, canvas.height)

var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
var grd2 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

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

const ball ={
  posX: 40,
  posY: 40,
  velX: 3,
  velY: 1,
  speed: 3,
  height: 5,
  width: 5

}


const world = {
  gravity: 0.2,
  friction: 0.9
}

const goal = {
  posX: 420,
  posY: 90,
  height: 50,
  width: 50
}



var boxes = []


function Box(posX, posY, width){
  this.posX = posX,
  this.posY = posY,
  this.width = width,
  this.height= 10
  boxes.push(this)
}


function setup(){

  goal.posX = Math.random() *500
  goal.posY = Math.random() *150

  boxes = []
  for(let i=0;i<15;i++){
    new Box(Math.floor(Math.random() *400), Math.floor(Math.random() *200), Math.floor(Math.random() *100))
    console.log(boxes)

  }

  // border walls
  boxes.push({
    posX: 0,
    posY: 290,
    width: 600,
    height: 20
  })

  boxes.push({
    posX: 0,
    posY: 0,
    width: 600,
    height: 10
  })

  boxes.push({
    posX: 0,
    posY: 0,
    width: 10,
    height: 300
  })

  boxes.push({
    posX: 590,
    posY: 0,
    width: 10,
    height: 300
  })


}
setup()



function collisionDetection(shapeA, shapeB){
  var vX = (shapeA.posX + (shapeA.width / 2)) - (shapeB.posX + (shapeB.width / 2)),
    vY = (shapeA.posY + (shapeA.height / 2)) - (shapeB.posY + (shapeB.height / 2)),
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

  // ball.velX *= world.friction
  // ball.velY *= world.gravity

  ctx.fillStyle = 'black'
  ctx.globalAlpha = 0.2




  player.grounded = false
  boxes.map(x => {
    ctx.fillRect(x.posX, x.posY, x.width, x.height)
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

    var dirB  = collisionDetection(ball, x)

    if (dirB === 'l' || dirB === 'r') {
      ball.velX = -ball.velX

    } else if (dirB === 'b') {



      ball.velY = -ball.velY


    } else if (dirB === 't') {
      console.log('t')
      ball.velY = 5
    }



  })


  var dirC  = collisionDetection(ball, player)
  // console.log(dirC)
  if (dirC === 'l') {

    ball.velX = -ball.velX



  }else if (dirC === 'r') {

    ball.velX = -ball.velX




  } else if (dirC === 'b') {

    console.log(ball.velY)

    ball.velY = -ball.velY


  } else if (dirC === 't') {
    ball.velY = - ball.velY
  }


  var goalD  = collisionDetection(ball, goal)

  if (goalD === 'l') {

    setup()



  }else if (goalD === 'r') {

    setup()




  } else if (goalD === 'b') {


    setup()


  } else if (goalD === 't') {
    setup()
  }

  if(player.grounded){
    player.velY = 0
  }


  player.posX += player.velX
  player.posY += player.velY


  ball.posX += ball.velX
  ball.posY += ball.velY

  ctx.beginPath()
  ctx.arc(ball.posX, ball.posY, 5, 0, Math.PI*2, false)
  ctx.fillStyle = grd2
  ctx.fill()
  ctx.closePath()

  grd2.addColorStop(Math.random(), '#8ED6FF')
  grd2.addColorStop(Math.random(), '#004CB3')
  grd2.addColorStop(Math.random(), '#EE4CB3')
  grd2.addColorStop(Math.random(), '#E000EE')

  ctx.fillStyle = grd2

ctx.fillRect(player.posX, player.posY, player.width, player.height)

ctx.globalAlpha = 1
ctx.fillStyle = 'rgba(255,255,255,0.8 )'
ctx.fillRect(goal.posX, goal.posY, goal.width, goal.height)



  requestAnimationFrame(gameLoop)
}




gameLoop()
