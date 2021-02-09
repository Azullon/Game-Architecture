import View from '../core/View'
import PressableComponent from '../core/PressableComponent'

class ButtonView extends View {
  drawRect(x, y, w, h, color) {
    this.canvasContext.beginPath()
    this.canvasContext.rect(x, y, w, h)
    this.canvasContext.fillStyle = color
    this.canvasContext.fill()
  }

  drawText(x, y, w, h, text, fontSize) {
    this.canvasContext.fillStyle = 'black'
    this.canvasContext.textAlign = 'center'
    this.canvasContext.font = fontSize + 'px Arial'
    this.canvasContext.fillText(text, x + w / 2, y + h / 2 + fontSize / 3)
  }

  render(component, frameCount) {
    let position = component.position
    let { height, width } = component
    this.drawRect(
      position.x + 4,
      position.y + 4,
      width - 4,
      height - 4,
      'black'
    )
    this.drawRect(position.x, position.y, width - 4, height - 4, 'white')
    this.drawText(
      position.x,
      position.y,
      width,
      height,
      component.text,
      component.fontSize
    )
  }

  constructor() {
    super()
  }
}

export default class ButtonComponent extends PressableComponent {
  view = new ButtonView()

  onClickCallback
  text = ''
  fontSize = 16

  constructor(x, y, width, height, text, fontSize) {
    super()
    this.position = { x, y }
    this.width = width
    this.height = height
    this.text = text
    this.fontSize = fontSize
  }
}
