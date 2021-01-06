import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => { // Redux thunk with two arrow functions
    try {
        const { data } = await api.fetchPosts();

        console.log(data);

        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        console.log(data);

        dispatch({ type: 'CREATE', payload: data })
    } catch (e) {
        console.log(e.message);
    }
}