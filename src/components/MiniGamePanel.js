import React from 'react'

import projectStore from '../state/ProjectState'

const MiniGamePanel = () => {

  const switchMode = projectStore(state => state.switchMode)

  return (
    <div className="flex-space-between full-height">
      {/* mini adventure game */}
      <div className="left-part">

      </div>
      <div className="right-part center-child bg-gray-800">
        <button 
          type="button" 
          className="go-btn" 
          onClick={switchMode}>
          <span className="pb-0 pl-0">
            <i className="pi pi-angle-double-left"></i>
          </span>
          <span className="ml-0">Back</span>
        </button>
      </div>
    </div>
  )
}

export default MiniGamePanel