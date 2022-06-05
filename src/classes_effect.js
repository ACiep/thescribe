import { Effect } from './effect'

export class ClassesEffect extends Effect {
  constructor($node, state, handler) {
    super($node, state, handler)
  }

  applyEffect() {
    const classes = this.handler(this.state)
    for (let [name, value] of Object.entries(classes)) {
      if (value) {
        this.$node.classList.add(name)
      } else {
        this.$node.classList.remove(name)
      }
    }
  }
}
