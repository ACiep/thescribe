import * as Thescribe from '../../dist/thescribe'

const counterComponent = Thescribe.defineComponent({
  state: { count: 0 },

  targets: {
    count: {
      text: state => `The count is ${state.count}`,
      attribute: state => ({
        title: state.count === 0 ? 'nothing' : 'something',
        dataset: {
          foo: state.count > 0 ? 'bar' : 'baz',
        },
      }),
      classes: state => ({
        green: state.count >= 10,
        red: state.count < 10,
        black: state.count < 0,
        big: true,
        small: false,
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
})

const app = new Thescribe.Application(document.getElementById('app'))

app.registerComponent('counter', counterComponent)
