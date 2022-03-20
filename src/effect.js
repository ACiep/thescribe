import { getPath } from './utils'

export class Effect {
  proxyHandler = {
    get: (target, prop) => {
      const value = target.values[prop]
      const path = getPath(target.parent, prop)

      if (typeof value === 'object' && value !== null) {
        return this.makeProxiedState(value, path)
      }

      this.observedValues.add(path)
      return value
    },
  }

  constructor($node, state, handler) {
    this.$node = $node
    this.observedValues = new Set()
    this.state = this.makeProxiedState(state)

    this.handler = handler.bind(this)

    this.run()
  }

  makeProxiedState(values, parent = null) {
    return new Proxy(
      { values, parent },
      this.proxyHandler,
    )
  }

  notify(prop) {
    if (this.observedValues.has(prop)) {
      this.run()
    }
  }

  run() {
    this.observedValues.clear()
    this.applyEffect()
  }
}
