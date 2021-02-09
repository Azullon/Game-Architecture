import Game from './Game'

export default class Component {
  onUpdate(frameCount) {
    this.view.render(this, frameCount)
  }

  provideEvent(eventName, handlerName) {
    Game.instance[eventName + 'Event'].subscribe((...args) =>
      this[handlerName](...args)
    )
  }

  get globalState() {
    return Game.instance.state
  }

  get canvasHeight() {
    return Game.instance.canvasHeight
  }
  get canvasWidth() {
    return Game.instance.canvasWidth
  }
}
