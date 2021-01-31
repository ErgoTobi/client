import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// const url = 'http://localhost:5000/posts';
// const url = 'https://mern-starter-memoires.herokuapp.com/posts';

export const fetchPosts = () => API.get('/posts', {
    transformResponse: [function (data) {
        let resp;
        try {
            resp = JSON.parse(data);
        } catch (e) {
            throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(e)}`)
        }
        return resp;
    }]
}).then((response) => {
        return response;
    }
);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (form) => API.post('/user/signin', form);
export const signUp = (form) => API.post('/user/signup', form);


/*
(async () => {
  axios.interceptors.request.use(
    function (req) {
      req.time = { startTime: new Date() };
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function (res) {
      res.config.time.endTime = new Date();
      res.duration =
        res.config.time.endTime - res.config.time.startTime;
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axios
    .get("http://localhost:3000")
    .then((res) => {
      console.log(res.duration)
    })
    .catch((err) => {
      console.log(err);
    });
})();
*/