import { combineReducers } from 'redux';
import posts from './posts';
import auth from "./auth";

export default combineReducers({
   posts: posts, // oder just posts because key and value are the same
   auth,
});