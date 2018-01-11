import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import ShortenerRoot from './Root.jsx';


ReactDOM.render(
    <BrowserRouter>
        <ShortenerRoot/>
    </BrowserRouter>,
    document.getElementById('react-root'),
);
