import { getPath } from './utils'

export class MutableState {
  handler = {
    get: (target, prop) => {
      const value = target.values[prop]
      const path = getPath(target.parent, prop)

      if (typeof value === 'object' && value !== null) {
        return this.makeProxiedState(value, path)
      }

      return value
    },
    set: (target, prop, value) => {
      const path = getPath(target.parent, prop)
      target.values[prop] = value
      this.mutationTracker.mutate(path)
      return true
    },
  }

  constructor(initialValues, mutationTracker) {
    this.mutationTracker = mutationTracker

    this.state = this.makeProxiedState(initialValues)
  }

  makeProxiedState(values, parent = null) {
    return new Proxy(
      { values, parent },
      this.handler,
    )
  }
}
