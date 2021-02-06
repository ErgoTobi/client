import React from "react";
import { connect } from "react-redux";
import {Button} from "@material-ui/core";
import LanguageIcon from '@material-ui/icons/Language';


const languageOptions = [
    { key: "English", text: "English", value: "EN" },
    { key: "German", text: "Deutsch", value: "DE" }
];
const LanguageToggle = props => {
    const handleChange = (event, data) => {
        props.setLanguage(data.value);
    };

    return (
        <Button color="inherit" onChange={handleChange}>
            <LanguageIcon fontSize="medium" />
            {languageOptions[0].value}
        </Button>
    );
};

const mapDispatchToProps = dispatch => ({
    setLanguage: language => dispatch({ type: "SET_LANGUAGE", language })
});

const mapStateToProps = state => {
    return { language: state.language };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle);

/*
        <Dropdown
            button
            className='icon'
            floating
            labeled
            icon='world'
            options={languageOptions}
            search
            text='Select Language'
            onChange={handleChange}
        />
*/