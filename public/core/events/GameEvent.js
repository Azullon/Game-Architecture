export default class GameEvent {
  listeners = new Set()
  subscribe(callback) {
    this.listeners.add(callback)
  }
  unsubscribe(callback) {
    this.listeners.delete(callback)
  }
  call(...args) {
    for (const listener of this.listeners) {
      listener(...args)
    }
  }
  /**
   *
   * @param {GameEvent} motherEvent
   * @param {Function} pipeFunction
   */
  constructor(motherEvent, pipeFunction) {
    if (motherEvent instanceof GameEvent) {
      motherEvent.subscribe(pipeFunction)
    }
  }
}
