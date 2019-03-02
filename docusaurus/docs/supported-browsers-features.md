---
id: supported-browsers-features
title: Supported Browsers and Features
---

## Supported Browsers

The project is configured to support all modern browsers and IE >= 9 by default.

## Supported Language Features

In this project, you can use all the latest JavaScript syntaxs which has been included in the [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) standard.

Besides that, the project also supports:

### Dynamic Import

[Dynamic import](https://github.com/tc39/proposal-dynamic-import) is a stage 3 proposal which gives you the ability to dynamicly import an ES module at runtime.

_Learn more about [different proposal stages](https://tc39.github.io/process-document/)._

Here is an example:

`add.js`:

```js
export default (v) => v + 1;
```

`Counter.jsx`:

```jsx
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    import('./add').then(add => this.setState({ count: add(this.state.count) });)
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.count}
          <button onClick={this.onClick}>+</button>
        </h1>
      </div>
    );
  }
}
```

[Check ths doc](https://reactjs.org/docs/code-splitting.html#reactlazy) on how to leverage `React.lazy` API and dynamic import to do code splitting.

### Class Fields

[Class fields](https://github.com/tc39/proposal-class-fields) is a stage 3 proposal which enables you to write property values outside of the constructor in classes.

For example, we have `Counter` class:

```jsx
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({count: this.state.count + 1})
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.count}
          <button onClick={this.onClick}>+</button>
        </h1>
      </div>
    );
  }
}
```

With class fields syntax, we can do this:

```jsx
class Counter extends React.Component {
  state = {
    count: 0
  }

  onClick = () => {
    this.setState({count: this.state.count + 1})
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.count}
          <button onClick={this.onClick}>+</button>
        </h1>
      </div>
    );
  }
}
```

_Learn more about [different proposal stages](https://tc39.github.io/process-document/)._


### JSX and TypeScript

We highly recommend you start using [TypeScript](https://www.typescriptlang.org/) if you havn't. 

### Runtime Polyfills

We have `rocketact-plugin-polyfill` installed as dev dependency be default. This will ensure the following features are present:

- `Promise`
- `Object.assign`
- `Symbol`
- `Array.from`
- `Map/Set`
- `window.requestAnimationFrame`

If you still want use any other ES6+ features that need **runtime support**, make sure include the corresponding polyfills manually.