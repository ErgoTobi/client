import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({
   posts: posts, // oder just posts because key and value are the same
});