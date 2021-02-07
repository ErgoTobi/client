import React, { useState, useLayoutEffect } from 'react';
import {languageData, availableLanguages} from "./languageData.js";

const LanguageContext = React.createContext({
    lang: '',
    currentLangData: {},
    switchLang: () => {},
});

export default LanguageContext;

export function LangProvider (props) {

    const [lang, setLang] = useState(window.localStorage.getItem('appUILang') || window.navigator.language);


    useLayoutEffect(() => {
        const selectedLang = window.localStorage.getItem('appUILang');

        if (selectedLang) {
            setLang(selectedLang);
        } else {
            setLang(availableLanguages[0].code)
            window.localStorage.setItem('appUILang', availableLanguages[0].code);
        }
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

