"use strict"

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 1024
canvas.height = 576




const gravity = 0.2;

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './images/background.png'
})

const shop = new Sprite({
  position: {
    x: 600, y: 125
  },
  imageSrc: './images/shop.png',
  scale: 2.75,
  framesMax: 6
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offsetAttack: {
    x: 0,
    y: 0
  },
  offset: {
    x: 215,
    y: 157
  },
  imageSrc: './images/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5

})

const enemy = new Fighter({
  position: { x: 400, y: 50 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  offsetAttack: {
    x: 0,
    y: 0
  },
  imageSrc: './images/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5
})

function render() {
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  background.update(ctx)
  shop.update(ctx)
  player.update(ctx)
  // enemy.update(ctx)
  collision()
}



function collision() {
  let hit = 1


  // Player Hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) && player.isAttacking
  ) {

    enemy.health -= hit
    document.querySelector('#enemyHealth').style.width = `${enemy.health}%`
  }

  // Enemy Hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) && enemy.isAttacking
  ) {
    player.health -= hit
    document.querySelector('#playerHealth').style.width = `${player.health}%`
  }

  // enf game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

function animate() {
  render()
  window.requestAnimationFrame(animate)
}

animate()



decreaseTimer()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      player.velocity.y = -10
      break;

    case 'a':
      player.velocity.x = -1
      // player.turnLeft()
      break;

    case 'd':
      player.velocity.x = 1
      // player.turnRight()

      break;
    case ' ':
      player.attack()
      break;
    case 'ArrowUp':
      enemy.velocity.y = -10
      break;

    case 'ArrowLeft':
      enemy.velocity.x = -1
      break;

    case 'ArrowRight':
      enemy.velocity.x = 1
      break;
    case 'Shift':
      enemy.attack()
      break;
    default:
      break;
  }
})


window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
      player.velocity.y = 0
      break;

    case 'a':
      player.velocity.x = 0
      break;

    case 'd':
      player.velocity.x = 0
      break;
    case 'ArrowUp':
      enemy.velocity.y = 0
      break;

    case 'ArrowLeft':
      enemy.velocity.x = 0
      break;

    case 'ArrowRight':
      enemy.velocity.x = 0
      break;
  }
})