import axios from 'axios'
// import axios from "./axios";

const API_ROOT_PATH = '/api/v1'
const GITHUB_REPO_GAMES_PATH = 'https://raw.githubusercontent.com/lwz7512/react-letspy-today/master/src/games'

// from backend
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

// from local project static file
export const getProjectContent = id => 
  axios.get(`guides/${id}.md`).then(res => res.data);

export const getCheatsheetContent = name => 
  axios.get(`cheatsheets/${name}.md`).then(res => res.data);

export const getDisclosureContent = id =>
  axios.get(`games/${id}.md`).then(res => res.data);

// get remote js source code from github
export const getRemoteSourceCode = file =>
  axios.get(`${GITHUB_REPO_GAMES_PATH}/${file}`).then(res => res.data);