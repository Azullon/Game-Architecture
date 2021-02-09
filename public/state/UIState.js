export default class UIState {
  openedScreen = 'menu'

  openScreen(screenName) {
    this.openedScreen = screenName
  }
}
