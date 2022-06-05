const mutationObserverConfig = {
  childList: true,
  subtree: true,
}

export class Application {
  constructor($root) {
    this.$root = $root
    this.components = {}

    this.observer = new MutationObserver(mutationList => {
      for (const mutation of mutationList) {
        for (const $addedNode of mutation.addedNodes) {
          const componentName = $addedNode.dataset?.component
          if (componentName) {
            const maybeComponent = this.components[componentName]
            if (maybeComponent) {
              maybeComponent($addedNode)
            }
          }
        }
      }
    })

    this.observer.observe(this.$root, mutationObserverConfig)
  }

  registerComponent(name, createComponent) {
    this.components[name] = createComponent
    const selector = `[data-component=${name}]`
    const $components = this.$root.querySelectorAll(selector)
    for (const $component of $components) {
      createComponent($component)
    }
  }
}
