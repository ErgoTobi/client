import React, { useState, useEffect } from 'react';
import { Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [toggleLayout, setToggleLayout] = useState('left');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
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
    );
};

export default Home;