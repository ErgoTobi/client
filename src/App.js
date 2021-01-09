import React, { useEffect } from 'react';
import './App.css';
import {Grow, Grid} from "@material-ui/core";
import Form from "./components/Form/Form.js";

import { useDispatch } from 'react-redux';
import { getPosts } from "./actions/posts.js";
import Posts from './components/Posts/Posts.js'

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="container">
			<Form/>
            <Grow in>
                <div className="container">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={10}>
                            <br/>
                            <Posts/>
                        </Grid>
                        <Grid item xs={12} sm={2}>

                        </Grid>
                    </Grid>
                </div>
            </Grow>
        </div>
    )
}


export default App;
