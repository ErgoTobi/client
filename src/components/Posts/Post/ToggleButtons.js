import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import ViewWeek from "@material-ui/icons/ViewWeek";
import Dashboard from "@material-ui/icons/Dashboard";
import React from "react";

const ToggleButtons = ({ toggleLayout, setToggleLayout }) => {

    const handleToggleLayout = (event, newAlignment) => {
        setToggleLayout(newAlignment);
    };

    return (
        <ToggleButtonGroup
            value={toggleLayout}
            exclusive
            onChange={handleToggleLayout}
            aria-label="text alignment">
            <ToggleButton value="left" aria-label="left aligned">
                <ViewAgenda />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
                <ViewWeek />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justified" disabled>
                <Dashboard />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default ToggleButtons;