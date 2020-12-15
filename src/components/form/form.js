import React, {useState} from "react";

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {FaHeart} from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';
import moment from 'moment';

import stockpot from './../../images/memories.jpg';
import {grey} from "@material-ui/core/colors";

/* contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} */

const testData = [
    {
        headline: "Uber",
        tagline: "LA",
        description: "I am very big",
        startDate: new Date(),
        endDate: new Date(),
        image: stockpot

    }
]

const ImagePicker = ({onChoose}) => {
    return (
        <>
            <ImageUploader withIcon={true} buttonText="Choose new Image"
                           onChange={onChoose}
                           imgExtension={['.jpg', '.gif', '.png', '.gif']}
                           maxFileSize={5242880} singleImage={true} withPreview={true}/>
        </>
    );
}

const CalendarPicker = ({parentCallbackStartDate, parentCallbackEndDate, startDate, endDate}) => {
    return (
        <>
            <DatePicker selected={startDate}
                        onChange={parentCallbackStartDate}
                        placeholder="Insert new Start Date" required/>
            <DatePicker selected={endDate}
                        onChange={parentCallbackEndDate}
                        placeholder="Insert new End Date" required/>
        </>
    );
}

class Content extends React.Component {
    state = {
        headline: '',
        tagline: '',
        description: '',
        endDate: new Date(),
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
            endDate: new Date(),
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
                <input type="text" value={this.state.headline}
                       onChange={event => this.setState({headline: event.target.value})}
                       placeholder="Insert new Headline" required/>
                <input type="text" value={this.state.tagline}
                       onChange={event => this.setState({tagline: event.target.value})}
                       placeholder="Insert new Tagline" />
                <input type="text" value={this.state.description}
                       onChange={event => this.setState({description: event.target.value})}
                       placeholder="Insert new Description" />
                <CalendarPicker parentCallbackStartDate={this.callbackStartDate}
                                parentCallbackEndDate={this.callbackEndDate} startDate={this.state.startDate}
                                endDate={this.state.endDate}/>
                <ImagePicker onChoose={this.onChooseImage}/>
                <button>Add Memory</button>
                <p>Last Input: {this.state.lastInput}</p>
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
                date={month[memory.startDate.getUTCMonth()] + " " + memory.startDate.getUTCFullYear() + " - " + month[memory.endDate.getUTCMonth()] + " " + memory.endDate.getUTCFullYear()}
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">{memory.headline}</h3>
                <h4 className="vertical-timeline-element-subtitle">{memory.tagline}</h4>
                <br/>
                <img src={memory.image} alt="memories" height="170"/>
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
                className="vertical-timeline-element--work"
                contentArrowStyle={{borderRight: '7px solid  rgb(33, 150, 243)'}}
                date="2012 - present"
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Creative Director</h3>
                <h4 className="vertical-timeline-element-subtitle">eee</h4>
                <br/>
                <img src={stockpot} alt="memories" height="170"/>
                <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2010 - 2011"
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Art Director</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2008 - 2010"
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                <p>
                    User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2006 - 2008"
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Web Designer</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="April 2013"
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
                className="vertical-timeline-element--education"
                date="November 2012"
                iconStyle={{background: 'rgb(233, 30, 99)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                <p>
                    Creative Direction, User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2002 - 2006"
                iconStyle={{background: 'rgb(233, 30, 99)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media
                    Visual Imaging</h3>
                <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                <p>
                    Creative Direction, Visual Design
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
            memories: testData
        };
        console.log(this.state.memories.image)
    }

    // Works the same with babel, not yet part of the official syntax
    // state = {
    //     memories: testData,
    // };

    addNewMemory = (memoryData) => {
        console.log(memoryData);
        // To update state of react component
        this.setState(prevState => ({
            memories: [...prevState.memories, memoryData], // equivalent of concat operation -> spread operator syntax
        }));
        console.log(this.state.memories.image)
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
