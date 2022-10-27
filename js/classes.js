class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale,
    )
  }

  update(context) {
    this.draw(context)
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }
}

class Fighter {
  constructor({ position, velocity, color = 'red', offset }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.isAttacking = false
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: offset,
      width: 100,
      height: 50
    }
    this.color = color
    this.health = 100
  }

  /* turnLeft() {
    this.attackBox.offset.x = -50
  }

  turnRight() {
    this.attackBox.offset.x = 0
  } */
  draw(context) {
    const x = this.position.x;
    const y = this.position.y;

    context.fillStyle = this.color
    context.fillRect(x, y, this.width, this.height);

    // AttackBox
    if (this.isAttacking) {
      const attackBoxPositionX = this.attackBox.position.x
      const attackBoxPositionY = this.attackBox.position.y
      const attackBoxWidth = this.attackBox.width
      const attackBoxHeight = this.attackBox.height
      context.fillStyle = "green"
      context.fillRect(attackBoxPositionX, attackBoxPositionY, attackBoxWidth, attackBoxHeight)
    }
  }

  update(context) {
    this.draw(context)

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y


    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y > canvas.height - 95) {
      this.velocity.y = 0
    } else this.velocity.y += gravity
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}