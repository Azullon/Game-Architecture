import GameEvent from './GameEvent'

export default class AssetPackLoadedEvent extends GameEvent {
  call(pack, packName, loadTime) {
    super.call(pack, packName, loadTime)
  }
  constructor() {
    super()
  }
}
