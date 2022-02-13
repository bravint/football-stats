import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './styles/reset.css';

import { App } from './App';

ReactDOM.render(
    <HashRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </HashRouter>,
    document.getElementById('root')
);
