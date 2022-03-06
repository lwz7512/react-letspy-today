import axios from 'axios'
// import axios from "./axios";

const API_ROOT_PATH = '/api/v1'

export const getProjects = () =>
  axios.get('data/projects.json')
    .then(res => res.data.data);

export const getGameCodeRunningResult = gameSnippet => 
  axios.post(`${API_ROOT_PATH}/run`, gameSnippet)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
    return error
  });

export const postContactMessage = messageObj =>
  axios.post(`${API_ROOT_PATH}/contact`, messageObj)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
    return error
  });

export const getProjectContent = id => 
  axios.get(`content/${id}.md`).then(res => res.data)