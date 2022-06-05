import { Effect } from './effect'

export class ClassesEffect extends Effect {
  constructor($self, $node, state, handler) {
    super($self, $node, state, handler)
  }

  applyEffect() {
    const classes = this.handler(this.state, this.$self)
    for (let [name, value] of Object.entries(classes)) {
      if (value) {
        this.$node.classList.add(name)
      } else {
        this.$node.classList.remove(name)
      }
    }
  }
}
