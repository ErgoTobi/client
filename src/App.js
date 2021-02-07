import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import {fetchMock} from "./api/mocks/apiMock";
import LanguageContext from "./context/LanguageContext";


const App = () => {
    // t (translate) equals currentLangData --> fetch lang data from backend
    const { lang, currentLangData} = useContext(LanguageContext);
    const [state, setState] = useState([]);
    useEffect(() => {
        fetchMock(lang)
            .then(setState)
    }, [lang]);

    return (
        <BrowserRouter>
            <div className="container" >
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;

/*


*/