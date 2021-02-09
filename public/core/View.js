import Game from './Game'
export default class View {
  get canvasContext() {
    return Game.instance.canvasContext
  }
  get canvasHeight() {
    return Game.instance.canvasHeight
  }
  get canvasWidth() {
    return Game.instance.canvasWidth
  }

  _canRender = false
  get canRender() {
    if (!this._canRender) {
      this._canRender = Game.instance.assetLoader.isLoaded(
        this.requiredAssetPacks
      )
    }
    return this._canRender
  }

  get assets() {
    return Game.instance.assetLoader.getPacks(this.requiredAssetPacks)
  }

  requiredAssetPacks = []

  render(component, frameCount) {
    if (component.children)
      for (const child of component.children) {
        child.onUpdate(frameCount)
      }
  }
}
