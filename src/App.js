import React, { useState, useEffect } from 'react';
import './App.css';
import {Grow, Grid} from "@material-ui/core";
import Form from "./components/Form/Form.js";
import { useDispatch } from 'react-redux';
import { getPosts } from "./actions/posts.js";
import Posts from './components/Posts/Posts.js'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [toggleLayout, setToggleLayout] = useState('left');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <div className="container" >
            <Grow in>
                <div className="container">
                    <div align="center">
                        <Form currentId={currentId} setCurrentId={setCurrentId} toggleLayout={toggleLayout} setToggleLayout={setToggleLayout}/>
                    </div>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <br/>
                            <Posts setCurrentId={setCurrentId} toggleLayout={toggleLayout}/>
                        </Grid>
                        {/*<Grid item xs={12} sm={2}></Grid>*/}
                    </Grid>
                </div>
            </Grow>
        </div>
    )
}

export default App;
