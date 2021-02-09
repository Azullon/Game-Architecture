import AssetPackLoadedEvent from './events/AssetPackLoadedEvent'

export default class AssetLoader {
  _loadPack(packName, packInfo) {
    let result = {}
    let startTime = new Date().getTime()
    let totalAssetsCount = Object.keys(packInfo).length
    let loadedAssetsCount = 0

    for (const assetName in packInfo) {
      let asset = document.createElement('img')
      asset.src = packInfo[assetName]
      asset.onload = () => {
        result[assetName] = asset
        loadedAssetsCount++
        if (loadedAssetsCount == totalAssetsCount) {
          this.onPackLoaded.call(
            result,
            packName,
            new Date().getTime() - startTime
          )
        }
      }
    }
  }

  load(packs) {
    for (const packName in packs) {
      this._loadPack(packName, packs[packName])
    }
  }

  onPackLoaded = new AssetPackLoadedEvent()
  _packs = {}
  _onPackLoadedHandler(pack, packName) {
    this._packs[packName] = pack
  }

  isLoaded(packNames) {
    if (typeof packNames == 'string') {
      return Object.keys(this._packs).includes(packNames)
    } else if (Array.isArray(packNames)) {
      for (const name of packNames) {
        if (!this.isLoaded(name)) return false
      }
      return true
    } else {
      console.error('Invalid packNames type')
      return false
    }
  }

  getPacks(packNames) {
    let result = {}
    for (const name of packNames) {
      result[name] = this._packs[name]
    }
    return result
  }

  constructor() {
    this.onPackLoaded.subscribe((...args) => this._onPackLoadedHandler(...args))
  }
}
