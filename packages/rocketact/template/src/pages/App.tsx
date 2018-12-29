import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './app.scss';

ReactDOM.render(
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to Rocketact</h1>
    </header>
  </div>,
  document.getElementById('app') as HTMLElement
);

if (module.hot) {
  module.hot.accept();
}
