import React, { useEffect } from 'react';
import './App.css';
import {Grow, Grid} from "@material-ui/core";
import Form from "./components/Form/Form.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

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
            {/*
			<Jumbotron>
				<h1>Hello, world!</h1>
				<p>
					This is a simple hero unit, a simple jumbotron-style component for calling
					extra attention to featured content or information.
				</p>
				<img src={memories} alt="memories" height="600" />
				<p>
					<Button variant="primary">Learn more</Button>
				</p>
			</Jumbotron>
			*/}
			<Form/>
            <Grow in>
                <div className="container">
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={10}>
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
