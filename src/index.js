import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Header from "./Header";
import Footer from "./Footer";

ReactDOM.render(
    [
        <Header/>,
        <App/>,
        <br/>,
        <Footer/>
    ],
    document.getElementById('root')
);
