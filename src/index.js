import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import "./index.css"
import reducers from './reducers';
import App from './App';
import Footer from './components/Footer/Footer';
import {LangProvider} from "./context/LanguageContext";

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <LangProvider>
        <Provider store={store}>
            <App/>
            <br/>
            <Footer/>
        </Provider>
    </LangProvider>,
    document.getElementById('root')
);
