import { effectFactory } from './effect_factory'
import { Factor } from './factor'
import { MutationTracker } from './mutation_tracker'
import { MutableState } from './state'
import { Target } from './target'

export function defineComponent(config) {
  return $node => {
    return new Component($node, config)
  };
}

class Component {
  constructor($self, config) {
    this.$self = $self
    this.mutationTracker = new MutationTracker()
    const state = typeof config.state === 'function' ? config.state($self) : { ...config.state }
    this.mutableState = new MutableState(
      state,
      this.mutationTracker,
    )
    this.targets = []
    this.factors = []

    this.init(config)
  }

  init(config) {
    this.loadTargets(config)
    this.loadFactors(config)
  }

  loadTargets(config) {
    for (const [name, opts] of Object.entries(config.targets)) {
      const selector = `[data-target=${name}]`
      const $node = this.$self.querySelector(selector)

      for (const [effectType, handler] of Object.entries(opts)) {
        const effect = effectFactory(
          effectType, this.$self, $node, this.mutableState.state, handler,
        )
        this.mutationTracker.addEffect(effect)
        const target = new Target(this.$self, $node, effect)
        this.targets.push(target)
      }
    }
  }

  loadFactors(config) {
    for (const [name, events] of Object.entries(config.factors)) {
      const selector = `[data-factor=${name}]`
      const $node = this.$self.querySelector(selector)
      const factor = new Factor(this.$self, $node, this.mutableState.state, events)
      this.factors.push(factor)
    }
  }
}
