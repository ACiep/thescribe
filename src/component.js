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
  constructor($root, config) {
    this.$root = $root
    this.mutationTracker = new MutationTracker()
    this.mutableState = new MutableState(
      { ...config.state },
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
      const $node = this.$root.querySelector(selector)

      for (const [effectType, handler] of Object.entries(opts)) {
        const effect = effectFactory(effectType, $node, this.mutableState.state, handler)
        this.mutationTracker.addEffect(effect)
        const target = new Target($node, effect)
        this.targets.push(target)
      }
    }
  }

  loadFactors(config) {
    for (const [name, events] of Object.entries(config.factors)) {
      const selector = `[data-factor=${name}]`
      const $node = this.$root.querySelector(selector)
      const factor = new Factor($node, this.mutableState.state, events)
      this.factors.push(factor)
    }
  }
}
