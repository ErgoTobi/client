import React, {memo, useState} from "react";

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {FaHeart} from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';

import stockVietnam from '../../images/vietnam.jpg';
import wildschonau from '../../images/wildschonau.jpg';
import taiwan from '../../images/taiwan.jpg';
import alishan from '../../images/alishan.jpg';

/* contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} */

const ImagePicker = ({onChoose}) =>
    <ImageUploader withIcon={true} buttonText="Choose new Image"
                   onChange={onChoose}
                   imgExtension={['.jpg', '.gif', '.png', '.gif']}
                   maxFileSize={5242880} singleImage={true} withPreview={false}/>;


const CalendarPicker = ({parentCallbackStartDate, parentCallbackEndDate, startDate, endDate}) => {
    return (
        <>
            <div>
                <DatePicker selected={startDate}
                            onChange={parentCallbackStartDate}
                            dateFormat="dd/MM/yyyy"
                            required/>
            </div>
            <div>
                <DatePicker selected={endDate}
                            onChange={parentCallbackEndDate}
                            dateFormat="dd/MM/yyyy"/>
            </div>
        </>
    );
}

class Content extends React.Component {
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
        /*
        console.log(
            this.memoryInput.current.value // 1) read from DOM element
        )
        */
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
                {/* 1) <input type="description" placeholder="Enter new memory" ref={this.memoryInput} required/>*/}
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

class TiliElement extends React.Component {
    render() {
        const memory = this.props;
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
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={memory.endDate ? month[memory.startDate.getUTCMonth()] + " " + memory.startDate.getUTCFullYear() + " - " + month[memory.endDate.getUTCMonth()] + " " + memory.endDate.getUTCFullYear() : month[memory.startDate.getUTCMonth()] + " " + memory.startDate.getUTCFullYear()}
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">{memory.headline}</h3>
                <h4 className="vertical-timeline-element-subtitle">{memory.tagline}</h4>
                <br/>
                {memory.image ? <img src={memory.image} alt="memories" width="100%"/> : <span/>}
                <p>{memory.description}</p>
            </VerticalTimelineElement>
        );
    }
}

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

export default class Form extends React.Component {
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

    render() {
        return (
            <>
                <Content onSubmit={this.addNewMemory}/>
                <br/>
                <Timeline memories={this.state.memories}/>
            </>
        );
    }
}

// array wird noch nicht automatishc upgedatet

const testData = [
    {
        headline: "Vietman",
        tagline: "Trying to get a China Visa",
        description: "There was only little time getting my access rights for the Kung Fu school in China. A layover of a couple of hours stood between me and my holistic travel plan! What a time to be alive! xD ",
        startDate: new Date("5/2/2018"),
        endDate: new Date("6/3/2018"),
        image: stockVietnam
    },
    {
        headline: "Wildschönau",
        tagline: "Fyling ever higher",
        description: "A chilled summer of enjoying the nature. Some colleagues of mine were introduced to paragliding. This meant the beginning of the 'peachy paragliders'!",
        startDate: new Date("4/2/2019"),
        endDate: new Date("9/3/2019"),
        image: wildschonau
    },
    {
        headline: "Taiwan - Taipei",
        tagline: "Saying Goodbye",
        description: "Unbelievable!? I have waited till the very end to visit the capital of Taiwan - Taipei. Also I drank my beloved Bubble Tea for the last time... ",
        startDate: new Date("8/2/2018"),
        endDate: null,
        image: taiwan
    },
    {
        headline: "Taiwan - Alishan",
        tagline: "Stand up early to see the sun rising they said... it's gonna be fun they said...",
        description: "There are just these times when it feels a little to early in the morning. On our way at 4pm...",
        startDate: new Date("3/2/2018"),
        endDate: null,
        image: alishan
    }
]