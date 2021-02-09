export class GameState {
  playerX = 720
  playerY = 720
  worldSize = 1440
  playerSize = 200
  playerSpeed = 5
  entitySize = 60
  score = 0
  entitiyCoordinates = []

  movePlayer(deltaX, deltaY) {
    this.playerX += deltaX
    this.playerY += deltaY
    if (this.playerX < 0) this.playerX = 0
    if (this.playerX > this.worldSize) this.playerX = this.worldSize

    if (this.playerY < 0) this.playerY = 0
    if (this.playerY > this.worldSize) this.playerY = this.worldSize
  }

  generateEntity() {
    this.entitiyCoordinates.push({
      x:
        this.entitySize / 2 +
        Math.floor(Math.random() * (this.worldSize - this.entitySize)),
      y:
        this.entitySize / 2 +
        Math.floor(Math.random() * this.worldSize - this.entitySize),
    })
  }

  removeEntity(x, y) {
    let newEntityCoordinates = []
    for (const coord of this.entitiyCoordinates) {
      if (coord.x == x && coord.y == y) continue
      newEntityCoordinates.push(coord)
    }
    this.entitiyCoordinates = newEntityCoordinates
  }
}
