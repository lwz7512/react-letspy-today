import React from 'react';
// import { useParams } from 'react-router-dom';

import ProjectDemoMode from '../components/ProjectDemoMode';
import ProjectCodeMode from '../components/ProjectCodeMode';

import projectStore from '../state/ProjectState'

const ProjectPage = () => {

  // const { pid } = useParams();
  // console.log(pid)
  // const params = new URLSearchParams(location.search);
  // console.log(params.get('pid'))
  
  const introMode = projectStore(state => state.introMode)

  console.log(introMode)

  return (
    <div className="project">
      { !introMode && (
        <ProjectDemoMode />
      )}
      { introMode && (
        <ProjectCodeMode />
      )}
    </div>
  )
}

export default ProjectPage