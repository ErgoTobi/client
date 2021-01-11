import React, {useState} from "react";

import 'react-vertical-timeline-component/style.min.css';
import ImageUploader from 'react-images-upload';
import useStyles from "../Posts/styles";
import FileBase from 'react-file-base64';
import {useDispatch} from "react-redux";
import {createPost} from "../../actions/posts";
import {Box, Button, Paper, TextField, Typography} from "@material-ui/core";

import Resizer from 'react-image-file-resizer';

/* contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} */


const Form = () => {
    // const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    const dispatch = useDispatch();

    const imgExtension = ['.jpg', '.gif', '.png'];
    const fileUploaderLabel = `Max file size: 10mb; 
    Accepted: ${imgExtension}`;

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

    const resizeFileToBase64 = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 500, 500, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            }, 'base64' );
    });

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h5" ><Box fontStyle="oblique">Creating a Memory</Box></Typography>
                <TextField name="headline" variant="outlined" label="Headline" fullWidth value={postData.headline}
                           onChange={(e) => setPostData({ ...postData, headline: e.target.value })} required/>
                <TextField name="tagline" variant="outlined" label="Tagline" fullWidth value={postData.tagline}
                           onChange={(e) => setPostData({ ...postData, tagline: e.target.value })}/>
                <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description}
                           onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
                <TextField name="startDate" variant="outlined" label="Start Date" type="date" InputLabelProps={{shrink: true,}} defaultValue={postData.startDate.toISOString().substring(0, 10)}
                           onChange={(e) => setPostData({ ...postData, startDate: new Date(e.target.value) })} required/>
                <TextField name="endDate" variant="outlined" label="End Date" type="date" InputLabelProps={{shrink: true,}} defaultValue={postData.endDate.toISOString().substring(0, 10)}
                           onChange={(e) => setPostData({ ...postData, endDate: new Date(e.target.value) })}/>
                {/*<div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, image: base64})} />
                </div>*/}
                <ImageUploader name="image" withIcon={true} buttonText="Choose new Image" imgExtension={imgExtension} maxFileSize={10485760} label={fileUploaderLabel} singleImage={true} withPreview={true}
                               onChange={(file) => file.length ? resizeFileToBase64(file[0]).then(result => setPostData({ ...postData, image: result })) : console.log("Files are empty...")} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>

        </Paper>
    );
}

export default Form;













/*

export class Content extends React.Component {
    state = {
        headline: '',
        tagline: '',
        description: '',
        endDate: '',
        startDate: new Date(),
        image: null,
        lastInput: ''
    };
    // memoryInput = React.createRef(); // 1) Functions as a ID
    handleSubmit = (event) => {
        event.preventDefault(); // Without this line, page is going to refresh

        console.log(
            this.memoryInput.current.value // 1) read from DOM element
        )

        // 2) Controlled components
        // console.log(this.state.memory);

        this.props.onSubmit({
            headline: this.state.headline,
            tagline: this.state.tagline,
            description: this.state.description,
            endDate: this.state.endDate,
            startDate: this.state.startDate,
            image: this.state.image
        });
        this.setState({
            lastInput: this.state.headline,
            headline: '',
            tagline: '',
            description: '',
            endDate: '',
            startDate: new Date(),
            image: null
        }); // Reset Input
    };

    callbackStartDate = (date) => this.setState({startDate: date});
    callbackEndDate = (date) => this.setState({endDate: date});
    onChooseImage = (event) => {
        console.log(event[0])
        this.setState({image: URL.createObjectURL(event[0])});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {// 1) <input type="description" placeholder="Enter new memory" ref={this.memoryInput} required/>}
                <span>Text Input: </span>
                <input type="text" value={this.state.headline}
                       onChange={event => this.setState({headline: event.target.value})}
                       placeholder="Insert new Headline" required/>
                <input type="text" value={this.state.tagline}
                       onChange={event => this.setState({tagline: event.target.value})}
                       placeholder="Insert new Tagline" />
                <input type="text" value={this.state.description}
                       onChange={event => this.setState({description: event.target.value})}
                       placeholder="Insert new Description" />
                <p>Last Headline: {this.state.lastInput}</p>
                <div>Date Input: </div>
                <CalendarPicker parentCallbackStartDate={this.callbackStartDate}
                                parentCallbackEndDate={this.callbackEndDate} startDate={this.state.startDate}
                                endDate={this.state.endDate}/>
                <ImagePicker onChoose={this.onChooseImage}/>
                <button>Add Memory</button>

            </form>
        );
    }

    // list.map((ele) => <p>{ele}</p>)
    // list.slice(-1)[0]
}

*/



