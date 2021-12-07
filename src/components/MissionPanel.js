import React from 'react'

import projectStore from '../state/ProjectState'

const MissionPanel = () => {

  const switchMode = projectStore(state => state.switchMode)
  const projectID = projectStore(state => state.projectID)
  const projects = projectStore(state => state.projects)
  const [ tip ] = projects.filter(project => project.id === Number(projectID))


  return (
    <div className="flex-space-between full-height">
      <div className="left-part">
        <h3 className="text-900 ">
          <span className="border-bottom-3 ">Mission</span>
        </h3>
        <p className="text-2xl text-700 mt-3">
          {tip.mission}
        </p>
      </div>
      <div className="right-part center-child bg-blue-500">
        <button 
          type="button" 
          className="go-btn" 
          onClick={switchMode}>
          <span className="ml-1">Go</span>
          <span className="pb-0">
            <i className="pi pi-angle-double-right"></i>
          </span>
        </button>
      </div>
    </div>
  )
}

export default MissionPanel