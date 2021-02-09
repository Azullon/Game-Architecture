import GameEvent from './GameEvent'

export default class ControllerMoveEvent extends GameEvent {
  call(deltaX, deltaY) {
    super.call(deltaX, deltaY)
  }
  constructor() {
    super()
  }
}
