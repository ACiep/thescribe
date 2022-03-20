export class Factor {
  constructor($node, state, events) {
    this.$node = $node
    this.state = state

    this.connect(events)
  }

  connect(events) {
    for (const [eventType, handler] of Object.entries(events)) {
      this.$node.addEventListener(eventType, e => {
        handler(e, this.state)
      })
    }
  }
}
