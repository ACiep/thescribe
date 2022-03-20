export class MutationTracker {
  constructor() {
    this.mutatedValues = new Set() 
    this.effects = []
  }

  addEffect(effect) {
    this.effects.push(effect)
  }

  mutate(path) {
    this.mutatedValues.add(path)
    this.notify()
  }

  notify() {
    for (const mutatedValue of this.mutatedValues) {
      for (const effect of this.effects) {
        effect.notify(mutatedValue)
      }
    }
    this.mutatedValues.clear()
  }
}
