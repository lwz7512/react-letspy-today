import axios from 'axios'

export const getProjects = () =>
  axios.get('assets/demo/data/projects.json')
    .then(res => res.data.data);

