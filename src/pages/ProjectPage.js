import React from 'react';
import { useLocation } from 'react-router-dom';

import ProjectDemoMode from '../components/ProjectDemoMode';
import ProjectCodeMode from '../components/ProjectCodeMode';

import projectStore from '../state/ProjectState'

const ProjectPage = () => {

  const location = useLocation()
  // const { pid } = useParams();
  const params = new URLSearchParams(location.search);
  const codemode = params.get('codemode')
  const introMode = codemode === 'true' ? 
    false : projectStore(state => state.introMode)

  return (
    <div className="project">
      { introMode && (
        <ProjectDemoMode />
      )}
      { !introMode && (
        <ProjectCodeMode />
      )}
    </div>
  )
}

export default ProjectPage