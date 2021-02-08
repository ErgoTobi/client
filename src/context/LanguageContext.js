import React, { useState, useLayoutEffect } from 'react';
import {languageData, languages} from "./languageData.js";

const LanguageContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => {},
});

export default LanguageContext;

export function LangProvider (props) {

    const assignLang = () => {
        if(languages.includes(window.localStorage.getItem('appUILang')))
            return window.localStorage.getItem('appUILang');
        else if (languages.includes(window.navigator.language))
            return window.navigator.language;
        else
            return languages[0];
    }

    const [lang, setLang] = useState(assignLang());

    useLayoutEffect(() => {
        const selectedLang = window.localStorage.getItem('appUILang');
        setLang(languages.includes(selectedLang)
            ? selectedLang
            : languages[0]);
    }, [lang])

    const switchLang = (ln) => {
        setLang(ln);
        window.localStorage.setItem('appUILang', ln);
    };



    return (
        <LanguageContext.Provider value={{
            lang,
            switchLang,
            currentLangData: languageData[lang]
        }}>
            {props.children}
        </LanguageContext.Provider>
    );
};

