import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserPage from './components/userPage.js';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/login" component={App} />
                <Route path="/users" component={UserPage} />
            </div>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
