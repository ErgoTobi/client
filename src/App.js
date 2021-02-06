import React, {useEffect, useContext, useState} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import LangContext from './context/LangContext.js';
import { fetchMock } from './api/mocks/apiMock.js';


const App = () => {
    const [state, setState] = useState([]);

    const { lang, currentLangData } = useContext(LangContext);
    useEffect(() => {
        fetchMock(lang)
            .then(setState)
    }, [lang]);

    return (
        <BrowserRouter>
            <div className="container" >
                <Header />
                <h1>{currentLangData.app.h1}</h1>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;
