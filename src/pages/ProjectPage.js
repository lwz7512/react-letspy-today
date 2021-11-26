import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
 
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
  const projects = projectStore(state => state.projects)


  useEffect(() => {
    setProjectID(pid)
    setProjectName(projectsCodeTarget[pid]?.projName)
  })

  useEffect(() =>{
    addEffect('.layout-topbar', '-translate-y-100')
    addEffect('.layout-main-container', 'pt-2')
  }, [])


  if (!projects.length) {
    return (
      <div className="flex justify-content-center">
        <ProgressSpinner style={{width: '50px', height: '50px'}}/>
      </div>
    )
  }

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