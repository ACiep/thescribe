import { cleanChildren } from './dom'
import { Effect } from './effect'

export class TextEffect extends Effect {
  constructor($node, state, handler) {
    super($node, state, handler)
  }

  applyEffect() {
    cleanChildren(this.$node)
    const text = this.handler(this.state)
    if (text === undefined || text === null) {
      return
    }
    const $textNode = document.createTextNode(text)
    this.$node.appendChild($textNode)
  }
}
