import React from 'react'

import projectStore from '../state/ProjectState'
import { projectsTips } from '../config/ProjectDefaultCode';

const MissionPanel = () => {

  const switchMode = projectStore(state => state.switchMode)
  const projectID = projectStore(state => state.projectID)
  const tip = projectsTips[projectID]

  return (
    <div className="flex-space-between full-height">
      <div className="left-part">
        <h3 className="text-900">
          Mission:
        </h3>
        <p className="text-xl text-700">
          {tip.mission}
        </p>
        <div className="bottom-row">
          {/* <p className="actions">
            <span className="action-fun orange">walk(1)</span>
            <span className="action-fun pink">jump(1)</span>
            <span className="action-fun green">pivot()</span>
          </p> */}
        </div>
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