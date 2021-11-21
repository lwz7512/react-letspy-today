import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ProjectDemoMode from '../components/ProjectDemoMode';
import ProjectCodeMode from '../components/ProjectCodeMode';

import projectStore from '../state/ProjectState'
import { projectsCodeTarget } from '../config/ProjectDefaultCode';
import { addEffect, } from '../utils/DomUtil';

const ProjectPage = () => {

  const location = useLocation()
  const { pid } = useParams()
  const setProjectID = projectStore(state => state.setProjectID)
  const setProjectName = projectStore(state => state.setProjectName)

  const params = new URLSearchParams(location.search);
  const codemode = params.get('codemode')
  const introMode = codemode === 'true' ? 
    false : projectStore(state => state.introMode)
  
  useEffect(() => {
    setProjectID(pid)
    setProjectName(projectsCodeTarget[pid]?.projName)
  })

  useEffect(() =>{
    addEffect('.layout-topbar', '-translate-y-100')
    addEffect('.layout-main-container', 'pt-2')
  }, [])

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