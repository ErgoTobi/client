import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({
   posts: posts, // oder jsut posts because key and value are the same
});