import { cleanChildren } from './dom'
import { Effect } from './effect'

export class TextEffect extends Effect {
  constructor($self, $node, state, handler) {
    super($self, $node, state, handler)
  }

  applyEffect() {
    cleanChildren(this.$node)
    const text = this.handler(this.state, this.$self)
    if (text === undefined || text === null) {
      return
    }
    this.$node.appendChild(document.createTextNode(text))
  }
}
