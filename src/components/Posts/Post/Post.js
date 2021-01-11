import React from "react";
import {VerticalTimelineElement} from "react-vertical-timeline-component";
import {FaHeart} from "react-icons/fa";
import moment from "moment";

const Post = ({ post }) => {
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
            icon={<FaHeart/>}
        >
            <h3 className="vertical-timeline-element-title">{post.headline}</h3>
            <h4 className="vertical-timeline-element-subtitle">{post.tagline}</h4>
            <br/>
            {post.image ? <img src={`${post.image}`} alt="memories" width="100%"/> : <span/>}
            <p>{post.description}</p>
            <p>{moment(post.createdAt).fromNow()}</p>
        </VerticalTimelineElement>
    );
}

export default Post;


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