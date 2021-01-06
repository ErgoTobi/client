import React from "react";
import {VerticalTimelineElement} from "react-vertical-timeline-component";
import {FaHeart} from "react-icons/fa";

export class TiliElement extends React.Component {
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