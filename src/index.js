import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/App.css';

const container = document.getElementById('root');
if (!container) {
    throw new Error("No element with id 'root' found");
}
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
