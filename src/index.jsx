import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/reset.css';

import { App } from './App';

ReactDOM.render(
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || '/'}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
