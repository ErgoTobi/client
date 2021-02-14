import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer/Footer";


const App = () => {
    // Declare a new state variable with the "useState" Hook
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 620;

    React.useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
           the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));
        /* passing an empty array as the dependencies of the effect will cause this
           effect to only run when the component mounts, and not each time it updates.
           We only want the listener to be added once */
    }, []);

    const isMobile = () => width < breakpoint;


    return (
        <BrowserRouter>
            <div className="container" >
                <Header isMobile={isMobile}/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
                <br/>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App;

/*
    // t (translate) equals currentLangData --> fetch lang data from backend
    const { lang, currentLangData} = useContext(LanguageContext);
    const [state, setState] = useState([]);
    useEffect(() => {
        fetchMock(lang)
            .then(setState)
    }, [lang]);

*/