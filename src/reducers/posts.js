import {CREATE, FETCH_ALL, UPDATE, DELETE} from "../constants/actionTypes";

const posts = (posts = [], action) => {
  switch(action.type) {
      case DELETE:
          return posts.filter((post) => post._id !== action.payload);
      case UPDATE:
          return posts.map((post) => post._id === action.payload._id ? action.payload : post);
      case FETCH_ALL:
          return action.payload.map(post => ({ ...post, startDate: new Date(post.startDate), endDate: post.endDate !== null ? new Date(post.endDate) : post.endDate  }));
      case CREATE:
          return [ ...posts, action.payload ];
      default:
          return posts;
  }
};

export default posts;