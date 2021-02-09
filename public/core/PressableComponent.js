import Component from './Component'
import GameEvent from './events/GameEvent'

export default class PressableComponent extends Component {
  position = { x: 0, y: 0 }
  width = 1
  height = 1

  onClick(x, y) {
    if (
      x >= this.position.x &&
      x <= this.position.x + this.width &&
      y >= this.position.y &&
      y <= this.position.y + this.height
    )
      this.onPress.call()
  }

  onPress = new GameEvent()

  constructor() {
    super()
    this.provideEvent('click', 'onClick')
  }
}
