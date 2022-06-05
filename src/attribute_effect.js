import { Effect } from './effect'

export class AttributeEffect extends Effect {
  constructor($node, state, handler) {
    super($node, state, handler)
  }

  applyEffect() {
    const attributes = this.handler(this.state)
    for (let [name, value] of Object.entries(attributes)) {
      if (value === null || value === undefined || value === false) {
        this.$node.removeAttribute(name)
      } else if (typeof value === 'object') {
        for (const [name2, value2] of Object.entries(value)) {
          this.$node[name][name2] = value2
        }
      } else {
        this.$node.setAttribute(name, value)
      }
    }
  }
}
