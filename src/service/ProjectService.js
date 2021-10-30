import axios from 'axios'

const API_ROOT_PATH = '/api'

export const getProjects = () =>
  axios.get('assets/demo/data/projects.json')
    .then(res => res.data.data);

export const getGameCodeRunningResult = gameSnippet => 
  axios.post(`${API_ROOT_PATH}/run`, gameSnippet)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });