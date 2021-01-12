import { makeStyles } from '@material-ui/core';

export default makeStyles ((theme) => ({
    // Run css with that class only if mobile is equal or smaller than sm
    [theme.breakpoints.down('sm')]: {
        mainContainer : {
            flexDirection: "column-reverse"
        }
    }

}));