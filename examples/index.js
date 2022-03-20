import { Component } from '../src/component.js'

new Component(
  'counter',
  {
    state: { count: 0 },

    targets: {
      count: {
        text: state => `The count is ${state.count}`,
        attribute: state => ({
          className: state.count === 0 && 'zero',
          style: {
            color: state.count <= 0 ? 'red' : 'blue',
          },
        }),
      },
    },

    factors: {
      inc: {
        click: (_e, state) => state.count += 1,
      },
      dec: {
        click: (_e, state) => state.count -= 1,
      },
      reset: {
        click: (_e, state) => state.count = 0,
      },
    },
  },
)
