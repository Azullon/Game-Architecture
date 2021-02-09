import Component from '../core/Component'
import View from '../core/View'
import ButtonComponent from './Button'

class MenuView extends View {
  renderBackground(frameCount) {
    const maxDelta = 20
    const c0 = 0.03,
      c1 = 0.04
    this.canvasContext.drawImage(
      this.assets.menu.background,
      Math.sin(frameCount * c0) * maxDelta - maxDelta,
      Math.cos(frameCount * c1) * maxDelta - maxDelta,
      this.canvasWidth + maxDelta * 2,
      this.canvasHeight + maxDelta * 2
    )
  }

  setButtonsPosition(component) {
    let buttonBlockHeight = 120
    let buttonBlockWidth = Math.min(400, this.canvasWidth - 80)
    let buttonsX = 40
    let buttonsY = (this.canvasHeight - buttonBlockHeight) / 2

    component.playButton.position = { x: buttonsX, y: buttonsY }
    component.playButton.width = buttonBlockWidth

    component.secondButton.position = { x: buttonsX, y: buttonsY + 80 }
    component.secondButton.width = buttonBlockWidth
  }

  render(component, frameCount) {
    if (!this.canRender) return
    this.renderBackground(frameCount)
    this.setButtonsPosition(component)
    super.render(component, frameCount)
  }

  requiredAssetPacks = ['menu']

  constructor() {
    super()
  }
}

export default class MenuComponent extends Component {
  view = new MenuView()
  playButton = new ButtonComponent(0, 0, 10, 40, 'Play', 20)
  secondButton = new ButtonComponent(0, 0, 10, 40, 'Button 2', 20)

  get children() {
    return [this.playButton, this.secondButton]
  }

  onPlayButtonPressed() {
    this.globalState.ui.openScreen('game')
  }

  onSecondButtonPressed() {
    alert('Second button')
  }

  constructor() {
    super()
    this.playButton.onPress.subscribe(() => this.onPlayButtonPressed())
    this.secondButton.onPress.subscribe(() => this.onSecondButtonPressed())
  }
}
