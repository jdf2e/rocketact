---
id: adding-stylesheets
title: Adding Stylesheets
---

We use [Webpack](https://webpack.js.org/) for bundling all assets used in the project. You can tell Webpack to compile a specific CSS file by importing that CSS file in your React component.

__`Button.tsx`__

```jsx
import React from 'react';
import './Button.css'

export default class Button extends React.Component {
  render <div className="button" />
}
```

__`Button.css`__

```css
.button {
  padding: 20px;
}
```

## Want to use Sass?

No problem! The project has Sass preprocessor configured out of the box. All you need is to rename `Button.css` to `Button.scss` and update the `import` statement in you React component.