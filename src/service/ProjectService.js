import axios from 'axios'
// import axios from "./axios";

const API_ROOT_PATH = '/api/v1'
const GITHUB_REPO_GAMES_PATH =
  'https://raw.githubusercontent.com/lwz7512/react-letspy-today/master/src/games'

export const MDFILES = {
  privacy: '/privacypolicy_en.md',
  terms: '/serviceterms_en.md',
  why: '/google_signin_reason.md',
  credits: '/assets_credits.md',
}

// GET all projects info
export const getProjects = () =>
  axios.get('/data/projects.json').then((res) => res.data.data)

// from local project static file
export const getProjectContent = async (id) => {
  const r = Math.random().toFixed(6)
  return axios.get(`/guides/${id}.md?r=${r}`).then((res) => res.data)
}

export const getCheatsheetContent = (name) =>
  axios.get(`/cheatsheets/${name}.md`).then((res) => res.data)

export const getDisclosureContent = (id) =>
  axios.get(`/games/${id}.md`).then((res) => res.data)

// GET website related official doc
export const getMDContent = (mdFileURL) =>
  axios.get(mdFileURL).then((res) => res.data)

// GET remote js source code from github
export const getRemoteSourceCode = (file) =>
  axios.get(`${GITHUB_REPO_GAMES_PATH}/${file}`).then((res) => res.data)

// **************** IMPORTANT API FOR THIS RPJECT *********
/**
 * Python code input for game
 *
 * @param {*} gameSnippet python code snippet
 * @returns result
 */
export const getGameCodeRunningResult = (gameSnippet) =>
  axios
    .post(`${API_ROOT_PATH}/run`, gameSnippet)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
// **************** END OF CODE RUNNING *******************

/**
 * Save logged in user info
 * givenName, email, picture, loginDate
 *
 * @param {*} userObj logged in user info
 * @returns
 */
export const postUserInfo = (userObj) =>
  axios
    .post(`${API_ROOT_PATH}/signin`, userObj)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
      return error
    })

/**
 * Save contact info to backend
 * name: '', email: '', subject: '', message: ''
 *
 * @param {*} messageObj contact info
 * @returns
 */
export const postContactMessage = (messageObj) =>
  axios
    .post(`${API_ROOT_PATH}/contact`, messageObj)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
      return error
    })
