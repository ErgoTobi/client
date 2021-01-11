import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url, { transformResponse: [function (data) {
    let resp;
    try {
        resp = JSON.parse(data);
    } catch (e) {
        throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(e)}`)
    }
    return resp;
    }]}).then((response) => { return response; }

);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);





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