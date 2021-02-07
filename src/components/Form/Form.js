import React, {useState, useEffect, useContext} from "react";
import 'react-vertical-timeline-component/style.min.css';
import ImageUploader from 'react-images-upload';
import useStyles from "../Posts/styles";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../actions/posts";
import {Box, Button, Paper, TextField, Typography, Grid} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Resizer from 'react-image-file-resizer';
import LayoutToggle from "../Posts/Post/LayoutToggle";
import LanguageContext from "../../context/LanguageContext";

const Form = ({currentId, setCurrentId, toggleLayout, setToggleLayout}) => {
    const defaultData = {headline: '', tagline: '', description: '', endDate: null, startDate: new Date(), image: ''}
    const [postData, setPostData] = useState(defaultData);
    const [imageUploadData, setImageUploadData] = useState({selectedFiles: []});
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const { currentLangData: t } = useContext(LanguageContext);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const imgExtension = ['.jpg', '.gif', '.png'];

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent browser from refreshing

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData(defaultData);
        setImageUploadData({selectedFiles: []});
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    {t.form.signtocreate}
                </Typography>
            </Paper>
        )
    }

    const resizeFileToBase64 = (file) => new Promise(resolve => {
        Resizer.imageFileResizer(file, 1000, 1000, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            }, 'base64');
    });

    const setAsyncFileState = (files) => new Promise(resolve => {
        setImageUploadData({selectedFiles: files});
        resolve(files[0]);
    });

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h5"><Box fontStyle="oblique">{currentId ? `${t.form.edit}` : `${t.form.create}`} {t.form.memoires}</Box></Typography>
                <TextField name="headline" variant="outlined" label={t.form.headline} fullWidth value={postData.headline}
                           onChange={(e) => setPostData({...postData, headline: e.target.value})} required/>
                <TextField name="tagline" variant="outlined" label={t.form.tagline} fullWidth value={postData.tagline}
                           onChange={(e) => setPostData({...postData, tagline: e.target.value})}/>
                <TextField name="description" variant="outlined" label={t.form.description} fullWidth
                           value={postData.description}
                           onChange={(e) => setPostData({...postData, description: e.target.value})}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker name="startDate" margin="normal" label={t.form.startdate} format="dd/MM/yyyy"
                                            value={postData.startDate}
                                            onChange={(e) => {
                                                setPostData({...postData, startDate: e})
                                            }}
                                            KeyboardButtonProps={{'aria-label': 'change date',}}
                                            InputLabelProps={{shrink: true,}} required/>
                        <KeyboardDatePicker name="endDate" margin="normal" label={t.form.enddate} format="dd/MM/yyyy"
                                            value={postData.endDate}
                                            onChange={(e) => {
                                                setPostData({...postData, endDate: e})
                                            }}
                                            KeyboardButtonProps={{'aria-label': 'change date',}}
                                            InputLabelProps={{shrink: true,}}/>
                    </Grid>
                </MuiPickersUtilsProvider>

                {/*
                <TextField name="tag" variant="outlined" label="Tags" fullWidth value={postData.tag}
                           onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                 */}
                <ImageUploader name="image" id="imageUploader" withIcon={true} buttonText={t.form.chooseimage}
                               imgExtension={imgExtension} maxFileSize={10485760}
                               label={`Max file size: 10mb; Accepted: ${imgExtension}`} singleImage={true}
                               withPreview={imageUploadData.selectedFiles.length ? true : false}
                               onChange={(files) => setAsyncFileState(files).then((file) => resizeFileToBase64(file).then(result => {
                                   setPostData({...postData, image: result})
                               }))}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit"
                        fullWidth>{t.form.submit}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>{t.form.clear}</Button>
            </form>
            <br/>
            <LayoutToggle toggleLayout={toggleLayout} setToggleLayout={setToggleLayout}/>
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



