import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post.js';
import useStyles from './styles.js';

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import {createPost} from "../../actions/posts";

const Posts = () => {
    // const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        headline: '',
        tagline: '',
        description: '',
        endDate: new Date(),
        startDate: new Date(),
        image: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent browser from refreshing

        dispatch(createPost(postData));
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField name="headline" variant="outlined" label="Headline" fullWidth value={postData.headline} onChange={(e) => setPostData({ ...postData, headline: e.target.value })}/>
                <TextField name="tagline" variant="outlined" label="Tagline" fullWidth value={postData.tagline} onChange={(e) => setPostData({ ...postData, tagline: e.target.value })}/>
                <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, image: base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>

        </Paper>
    );
}

export default Posts;