import {CREATE, FETCH_ALL, UPDATE, DELETE} from "../constants/actionTypes";
import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => { // Redux thunk with two arrow functions
    try {
        const {data} = await api.fetchPosts();
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data})
    } catch (e) {
        console.log(e);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        console.log(data);
        dispatch({type: CREATE, payload: data});
    } catch (e) {
        console.log(e);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post); // const response as destructuring the response to immediately get the data: const { data }
        console.log(data);
        dispatch({type: UPDATE, payload: data})
    } catch (e) {
        console.log(e);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    } catch (e) {
        console.log(e);
    }
}