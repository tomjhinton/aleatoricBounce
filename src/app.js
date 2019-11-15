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


const player = {
  height: 50,
  width: 20,
  posX: 0,
  posY: 0,
  velX: 0,
  velY: 0,
  speed: 3,
  jumping: false,
  grounded: false

}


const keys =[]
document.body.addEventListener('keydown', function (e) {
  console.log(e.keyCode)
  if(e.keyCode===38){
    console.log('hiya')
    if(player.width === 20){
      player.width = 50
      player.height = 20
    } else if(player.width === 50){
      player.width = 20
      player.height = 50
    }
  }
  keys[e.keyCode] = true
})

document.body.addEventListener('keyup', function (e) {
  keys[e.keyCode] = false
})




let lastTime = 0





const ball ={
  posX: 40,
  posY: 40,
  velX: 3,
  velY: 1,
  speed: 3,
  height: 5,
  width: 5

}

const balls = []

balls.push(ball)

function BallCreate(posX, posY){
  this.posX = posX,
  this.posY = posY,
  this.velX = 3,
  this.velY = 1,
  this.speed = 3+balls.length,
  this.height = 5,
  this.width = 5
  balls.push(this)

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
let check

function Box(posX, posY, width){
  console.log(this +'+' + posY)
  this.posX = posX,
  this.posY = posY,
  this.width = width,
  this.height= 10
  check = boxes.filter(x => x.posY !== this.posY && this.posY > (x.posY-10) && this.posY < (x.posY+10) )
  if(check.length === 0){
    boxes.push(this)
  }
}



function setup(){
  console.log('setup')
  goal.posX = Math.random() *500
  goal.posY = Math.random() *150

  boxes = []


  // border walls
  boxes.push({
    posX: 0,
    posY: 590,
    width: 1200,
    height: 10
  })

  boxes.push({
    posX: 0,
    posY: 0,
    width: 1200,
    height: 10
  })

  boxes.push({
    posX: 0,
    posY: 0,
    width: 10,
    height: 600
  })

  boxes.push({
    posX: 1190,
    posY: 0,
    width: 10,
    height: 600
  })

  while(boxes.length<15){
    new Box(Math.floor(Math.random() *1400)+10, Math.floor(Math.random() *590)+10, Math.floor(Math.random() *100+50))

  }

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




function gameLoop() {

  if (keys[32] ) {

    // up arrow or space
    if (!player.jumping && player.grounded) {
      player.jumping = true
      player.grounded = false
      player.velY = -player.speed * 4
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





  ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    balls.map(ball => {
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


  })

  balls.map(ball =>{
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
    new BallCreate(Math.floor(Math.random()*1000),Math.floor(Math.random()*200))



  }else if (goalD === 'r') {

    setup()
    new BallCreate(Math.floor(Math.random()*1000),Math.floor(Math.random()*200))




  } else if (goalD === 'b') {


    setup()
    new BallCreate(Math.floor(Math.random()*1000),Math.floor(Math.random()*200))


  } else if (goalD === 't') {
    setup()
    new BallCreate(Math.floor(Math.random()*1000),Math.floor(Math.random()*200))
  }
})

  if(player.grounded){
    player.velY = 0
  }


  player.posX += player.velX
  player.posY += player.velY

  balls.map(ball => {
    ball.posX += ball.velX
    ball.posY += ball.velY

    ctx.beginPath()
    ctx.arc(ball.posX, ball.posY, 5, 0, Math.PI*2, false)
    ctx.fillStyle = grd2
    ctx.fill()
    ctx.closePath()
  })




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
