import Component from '../core/Component'
import View from '../core/View'
import GameFieldComponent from './GameField'
import MenuComponent from './Menu'

class RootView extends View {
  render(component, frameCount) {
    super.render(component, frameCount)
  }
}

export default class RootComponent extends Component {
  view = new RootView()
  menu = new MenuComponent()
  gameField = new GameFieldComponent()

  get children() {
    let result = []
    if (this.globalState.ui.openedScreen == 'menu') result.push(this.menu)
    if (this.globalState.ui.openedScreen == 'game') result.push(this.gameField)
    return result
  }

  constructor() {
    super()
  }
}
