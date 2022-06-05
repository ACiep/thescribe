export class Factor {
  constructor($self, $node, state, events) {
    this.$self = $self;
    this.$node = $node
    this.state = state

    this.connect(events)
  }

  connect(events) {
    for (const [eventType, handler] of Object.entries(events)) {
      this.$node.addEventListener(eventType, e => {
        handler(e, this.state, this.$self)
      })
    }
  }
}
