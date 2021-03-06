import React from 'react';
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import {FaHeart} from "react-icons/fa";
import Post from "./Post/Post.js"
import {useSelector} from "react-redux";
// import useStyles from "./styles.js";
import {LinearProgress} from "@material-ui/core";
import moment from "moment";

const Posts = ({setCurrentId , toggleLayout}) => {
    // const classes = useStyles();

    const posts = useSelector((state) => state.posts
        .map(post => ({
            ...post,
            startDate: moment(post.startDate).utc().toDate(),
            endDate: post.endDate !== null ? moment(post.endDate).utc().toDate() : post.endDate
        })) // Same mapping as in reducers to ensure new Dates with UTC encoding else UI breaks
        .sort((a, b) => b.startDate - a.startDate));

    return (
        !posts.length ? <LinearProgress/> : (
            <VerticalTimeline>
                {posts.map((post) => (
                    <Post key={post._id} xs={12} sm={6} post={post} setCurrentId={setCurrentId} toggleLayout={toggleLayout}/>
                ))}
                <VerticalTimelineElement
                    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
                    icon={<FaHeart/>}
                />
            </VerticalTimeline>
        )
    );
}

export default Posts;


/*
function Timeline(props) {
    // without key property for dynamic children elements, the location is internally taken as id which might cause problems when ordering -> to avoid assign a unique key profile.id e.g.
    return (
        <VerticalTimeline>
            {props.memories.map(memory => <TiliElement key={Math.random()} {...memory}/>)}
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                contentArrowStyle={{borderRight: '7px solid  rgb(33, 150, 243)'}}
                date="Apr 2013"
                iconStyle={{background: 'rgb(233, 30, 99)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social
                    Media</h3>
                <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                <p>
                    Strategy, Social Media
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
                icon={<FaHeart/>}
            />
        </VerticalTimeline>
    );
}

    constructor(props) {
        super(props);
        this.state = {
            memories: testData.sort((a,b) => b.startDate - a.startDate) // Sorting initially
        };
    }

    // Works the same with babel, not yet part of the official syntax
    // state = {
    //     memories: testData,
    // };

    addNewMemory = (memoryData) => {
        console.log(memoryData);
        // To update state of react component
        this.setState(prevState => ({
            memories: [...prevState.memories, memoryData].sort((a,b) => b.startDate - a.startDate) // equivalent of concat operation -> spread operator syntax
        }));
    };

const testData = [
    {
        headline: "Vietman",
        tagline: "Trying to get a China Visa",
        description: "There was only little time getting my access rights for the Kung Fu school in China. A layover of a couple of hours stood between me and my holistic travel plan! What a time to be alive! xD ",
        startDate: new Date("5/2/2018"),
        endDate: new Date("6/3/2018"),
        image: ''
    },
    {
        headline: "Wildschönau",
        tagline: "Fyling ever higher",
        description: "A chilled summer of enjoying the nature. Some colleagues of mine were introduced to paragliding. This meant the beginning of the 'peachy paragliders'!",
        startDate: new Date("4/2/2019"),
        endDate: new Date("9/3/2019"),
        image: ''
    },
    {
        headline: "Taiwan - Taipei",
        tagline: "Saying Goodbye",
        description: "Unbelievable!? I have waited till the very end to visit the capital of Taiwan - Taipei. Also I drank my beloved Bubble Tea for the last time... ",
        startDate: new Date("8/2/2018"),
        endDate: null,
        image: ''
    },
    {
        headline: "Taiwan - Alishan",
        tagline: "Stand up early to see the sun rising they said... it's gonna be fun they said...",
        description: "There are just these times when it feels a little to early in the morning. On our way at 4pm...",
        startDate: new Date("3/2/2018"),
        endDate: null,
        image: ''
    }
]
*/