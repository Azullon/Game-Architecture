import { GameState } from '../state/GameState'
import UIState from '../state/UIState'
import AssetLoader from './AssetLoader'
import ClickEvent from './events/ClickEvent'
import UpdateEvent from './events/UpdateEvent'
import ControllerMoveEvent from './events/ControllerMoveEvent'

export default class Game {
  updateEvent = new UpdateEvent()
  _startUpdateTrigger() {
    let frameNumber = 0
    let updateTrigger = () => {
      this.updateEvent.call(frameNumber)
      this.handleKeyPresses()
      frameNumber++
      requestAnimationFrame(updateTrigger)
    }
    updateTrigger()
  }

  clickEvent = new ClickEvent()
  _startClickTrigger() {
    this._canvas.onclick = (event) => {
      this.clickEvent.call(event.x, event.y)
    }
  }

  controllerMoveEvent = new ControllerMoveEvent()
  isButtonPressed = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
  }
  handleKeyPresses() {
    let deltaX = 0,
      deltaY = 0
    if (this.isButtonPressed.KeyA) deltaX = -1
    if (this.isButtonPressed.KeyD) deltaX = 1
    if (this.isButtonPressed.KeyW) deltaY = -1
    if (this.isButtonPressed.KeyS) deltaY = 1
    if (deltaX != 0 || deltaY != 0)
      this.controllerMoveEvent.call(deltaX, deltaY)
  }
  _startControllerMoveTrigger() {
    window.onkeydown = (event) => {
      this.isButtonPressed[event.code] = true
    }
    window.onkeyup = (event) => {
      this.isButtonPressed[event.code] = false
    }
  }

  _canvas
  canvasContext
  canvasHeight
  canvasWidth
  _initializeCanvas(canvasSelector) {
    let canvas = document.querySelector(canvasSelector)
    this._canvas = canvas
    if (canvas) {
      this.canvasContext = canvas.getContext('2d')
      let onResize = () => {
        this.canvasHeight = canvas.parentElement.clientHeight
        this.canvasWidth = canvas.parentElement.clientWidth
        canvas.height = this.canvasHeight
        canvas.width = this.canvasWidth
      }
      window.addEventListener('resize', onResize)
      onResize()
    } else {
      console.error('Incorrect canvas selector')
    }
  }

  assetLoader = new AssetLoader()

  state = {
    game: new GameState(),
    ui: new UIState(),
  }

  constructor(canvasSelector, gameAssets, rootComponentConstructor) {
    globalThis.game = this
    this._initializeCanvas(canvasSelector)
    this.assetLoader.load(gameAssets)
    let rootComponent = new rootComponentConstructor()
    this.updateEvent.subscribe((frameCount) =>
      rootComponent.onUpdate(frameCount)
    )
    this._startUpdateTrigger()
    this._startClickTrigger()
    this._startControllerMoveTrigger()
  }

  static get instance() {
    return globalThis.game
  }
}
