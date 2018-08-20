import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store/index';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.store = Store;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
