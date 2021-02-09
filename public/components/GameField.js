import Component from '../core/Component'
import View from '../core/View'

export class GameFieldView extends View {
  render(component, frameCount) {
    super.render(component, frameCount)
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.canvasContext.drawImage(
      this.assets.gameCharacter.main,
      component.playerScreenX,
      component.playerScreenY,
      component.playerScreenSize,
      component.playerScreenSize
    )
  }

  requiredAssetPacks = ['gameCharacter', 'gameEntities']
}

export default class GameFieldComponent extends Component {
  view = new GameFieldView()

  onControllerMove(deltaX, deltaY) {
    this.globalState.game.movePlayer(
      ((deltaX * this.globalState.game.playerSpeed) / this.canvasWidth) *
        this.globalState.game.worldSize,
      ((deltaY * this.globalState.game.playerSpeed) / this.canvasHeight) *
        this.globalState.game.worldSize
    )
  }

  playerScreenX = 0
  playerScreenY = 0
  playerScreenSize = 1
  entityScreenSize = 1

  onUpdate(frameCount) {
    let scale =
      Math.sqrt(this.canvasHeight * this.canvasWidth) /
      this.globalState.game.worldSize
    this.playerScreenSize = Math.round(scale * this.globalState.game.playerSize)
    this.entityScreenSize = Math.round(scale * this.globalState.game.entitySize)

    this.playerScreenX =
      ((this.canvasWidth - this.playerScreenSize) *
        this.globalState.game.playerX) /
      this.globalState.game.worldSize
    this.playerScreenY =
      ((this.canvasHeight - this.playerScreenSize) *
        this.globalState.game.playerY) /
      this.globalState.game.worldSize
    super.onUpdate(frameCount)
  }

  constructor() {
    super()
    this.provideEvent('controllerMove', 'onControllerMove')
  }
}
