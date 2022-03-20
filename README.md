# Thescribe
HTML agnostic, declarive and reactive way to manipulate DOM

## Motivation
Frameworks like React, Angular & Vue are great but are they answer to all the problems? I doubt it. They're good at what they're meant to do - make developing rich, highly reactive web applications easier. But most web applications aren't **highly** reactive and these frameworks come at a cost for all three: users, developers and also business. Most web pages require only certain part of them to be reactive, some just need to validate user inputs and few of them doesn't require it at all. I can't count all the websites made mostly from forms (or even simple blogs) and still built on top of React.

I like to start my projects as "MPA" (Multi-page application as I call it opposed to SPA). It's easier, quicker, doesn't requires much setup and technical decisions so I can focus on business logic and get faster feedback. But as the project grows up I often rewrite it to SPA (Single-page application). I strongly believe it's not because frameworks like React are so great, I rather think it's because tools for such web apps is lacking. Imperative DOM manipulations with jQuery and synchronizing DOM with state can be such a pain. **Thescribe** is an attempt to change it and make developing reactive websites simpler and faster without affecting your whole project structure nor revolutionizing web. Render your HTML on the server, describe which parts of your websites depends on app's state, declare state manipulations and let **Thescribe** take care of the rest.

## Goals
- easy to pick up
- small size
- fast
- easy to integrate with existing libs

## Tutorial
Just a quick showcase of how **Thescribe** works. We'll create a simple counter app

Let's start with HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Counter app</title>
</head>
<body>
  <div>
    <h1></h1>
    <button>Increment</button>
  </div>
</body>
</html>
```

Nothing interesting here yet. Now we need to define three main parts of **Thescribe**: `component`, `target` and `factors`:
```html
<div data-component="counter">
  <h1 data-target="count"></h1>
  <button data-factor="increment">Increment</button>
</div>
```

**Component** is the main block of your application. It holds its state and manages `targets` and `factors`.

**Target** is the part of component which is *reactive*. It'll react to changes of state and automatically update its content and attributes. It's worth noting that Thescribe is smart enough to react to only these parts of state which are necessary to update itself so no matter how big your state is nor how many targets your component has your updates will be fast.

And finally **Factor** is the part which will trigger your state changes. It can be a button with on-click event, an input with on-change or any other element with any event type browsers allow.

So it's finally time to define our component
```javascript
new Component(
  'counter', // name of our component (data-component="counter" in HTML)
  {
    // initial state of our application
    state: {
      counter: 0,
    },

    // definition of our targets
    targets: {
      // name of our target (data-target="count" in HTML)
      count: {
        // it's the content of our target (escaped by default)
        text: state => `The count is ${state.count}`,
        // HTML attributes of our target, as our counter will reach a value of 10 it'll change its color to green
        attribute: state => ({
          style: {
            color: state.count >= 10 && 'green',
          },
        }),
      },
    },

    // definition of our factors
    factors: {
      // name of our factor (data-factor="increment" in HTML)
      increment: {
        click: (event, state) => {
          // we just need to mutate our state and all the targets will be updated automatically
          state.count += 1
        },
      },
    },
  },
)
```

## Project state
- [ ] make it work *(in progress)*
- [ ] make it right
- [ ] make it fast

## Incoming features
- [ ] connect components dynamically on DOM changes
- [ ] lifecycle methods
- [ ] shared state
- [ ] a way to communicate between components
- [ ] state initialization based on DOM
- [ ] scope targets and factors to only one component to make nested components possible
- [ ] performant function to render HTML
