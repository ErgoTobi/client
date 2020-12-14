import React, {useState} from "react";

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {FaHeart} from 'react-icons/fa';

import {FormControl, InputLabel, Input, FormHelperText, TextField} from "@material-ui/core";

import memories from './../../images/memories.jpg';

/* contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} */

const testData = [
    {position: "Uber", location: "LA", img: memories, text: "I am very big"},
    {position: "DJ", location: "Munich", img: memories, text: "I am very small"},
    {position: "IT Architect", location: "Berlin", img: memories, text: "I am very smart"}
]


class Content extends React.Component {
    state = { memory: '' };
    // memoryInput = React.createRef(); // 1) Functions as a ID
    handleSubmit = (event) => {
        event.preventDefault(); // Without this line, page is going to refresh
        /*
        console.log(
            this.memoryInput.current.value // 1) read from DOM element
        )*/
        // 2) Controlled components
        console.log(this.state.memory);

        this.props.onSubmit({ position: this.state.memory, location: "test", img: memories, text: "hiho" });

        this.setState({ memory: '' }); // Reset Input
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* 1) <input type="text" placeholder="Enter new memory" ref={this.memoryInput} required/>*/}
                <input type="text" value={this.state.memory}
                       onChange={event => this.setState({ memory: event.target.value })}
                       placeholder="Insert new Memory" required/>
                <pre>
                    <button>Add Memory</button>
                </pre>
                <p>Last Input: {}</p>
            </form>
        );
    }
    // list.map((ele) => <p>{ele}</p>)
    // list.slice(-1)[0]
}

class TiliElement extends React.Component {
    render() {
        const memory = this.props;
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2010 - 2011"
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<FaHeart/>}
            >
                <h3 className="vertical-timeline-element-title">{memory.position}</h3>
                <h4 className="vertical-timeline-element-subtitle">{memory.location}</h4>
                <br/>
                <img src={memory.img} alt="memories" height="170"/>
                <p>{memory.text}</p>
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
                <img src={memories} alt="memories" height="170"/>
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
            memories: testData,
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
            memories: [...prevState.memories, memoryData], // equivalent of concat operation -> spread operator syntax
        }));
    };

    render() {
        return (
            <>
                <Content onSubmit={this.addNewMemory}/>
                <Timeline memories={this.state.memories}/>
            </>
        );
    }
}
