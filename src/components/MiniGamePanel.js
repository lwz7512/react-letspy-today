import React from 'react'

import { BiRun } from "react-icons/bi"
import projectStore from '../state/ProjectState'

const MiniGamePanel = () => {

  const switchMode = projectStore(state => state.switchMode)

  return (
    <div className="flex-space-between full-height">
      {/* mini adventure game */}
      <div className="left-part bg-white">

      </div>
      <div className="right-part center-child bg-blue-500">
        <button 
          type="button" 
          className="go-btn" 
          onClick={switchMode}>
          <BiRun size="48" />
        </button>
      </div>
    </div>
  )
}

export default MiniGamePanel