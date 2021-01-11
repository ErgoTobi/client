import React from "react";
import {VerticalTimelineElement} from "react-vertical-timeline-component";
import {FaHeart} from "react-icons/fa";
import moment from "moment";
import useStyles from "./styles.js";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const Post = ({ post, setCurrentId }) => {
    const formatDate = () => {
        try {
            return post.endDate
                ? month[post.startDate.getUTCMonth()] + " " + post.startDate.getFullYear() + " - " + month[post.endDate.getUTCMonth()] + " " + post.endDate.getFullYear()
                : month[post.startDate.getUTCMonth()] + " " + post.startDate.getFullYear();
        } catch (e) {
            console.log(e);
            return "";
        }
    }

    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={formatDate()}
            iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
            icon={<FaHeart/>}>
           <Layout1 post={post} setCurrentId={setCurrentId} />
        </VerticalTimelineElement>
    );
}

export default Post;

const Layout1 = ({ post, setCurrentId }) => {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.card}>
                {post.image ? <CardMedia className={classes.media} image={post.image} title={post.headline} /> : <span/>}
                <div className={classes.overlay}>
                    <Typography variant="h4"><Box color={post.image ? "white" : "black"}>{post.headline}</Box></Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small"
                            onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default"/>
                    </Button>
                </div>
                <div className={classes.details}>
                    {/*<Typography variant="body2" color="textSecondary">{post.tag.map((tag) => `#${tag}`)}</Typography>*/}
                </div>
                <Typography className={classes.title} variant="h5">{post.tagline}</Typography>
                <CardContent>
                    <Typography variant="body1" gutterBottom>{post.description}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Typography className={classes.textVertical} variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
                    <Button size="small" color="primary" onClick={() => {}}>
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

const Layout2 = ({ post }) => {
    return (
        <>
            <h3 className="vertical-timeline-element-title">{post.headline}</h3>
            <h4 className="vertical-timeline-element-subtitle">{post.tagline}</h4>
            <br/>
            {post.image ? <img src={`${post.image}`} alt="memories" width="100%"/> : <span/>}
            <p>{post.description}</p>
        </>
    )
}


let month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";