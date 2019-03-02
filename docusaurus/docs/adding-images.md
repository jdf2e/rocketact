---
id: adding-images
title: Adding Images
---

## Reference Images in Components

In components, you can `import` images just like importing another JavaScript module. Once imported, you can use the imported value as the `src` prop of an image.

Here is an example:

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import logo from './rocketact.png';

ReactDOM.render(
  <div className="App">
    <header className="App-header">
      <img src={logo} />
    </header>
  </div>,
  document.getElementById('app')
);
```

By referencing images this way, Webpack will include the image in the final bundles and will handle `publicPath` and hashes properly.

## Reference Images in CSS

Nothing special here, just reference the image through relative paths and Webpack will replace theme with final paths.

```css
.logo {
  background: url(./rocketact.png);
}
```

## Reference Images in HTML

TODO