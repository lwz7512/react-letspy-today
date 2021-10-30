import React from 'react'

import { Button } from 'primereact/button'
import { BiRun } from "react-icons/bi"
import { DotLoader } from 'react-spinners';
import { dotLoaderStyle } from '../config/project'
import projectStore from '../state/ProjectState'

const MiniGamePanel = () => {

  const switchMode = projectStore(state => state.switchMode)
  const runningMode = projectStore(state => state.runningMode)
  const toggleRunning = projectStore(state => state.toggleRunning)

  const mockRunningHandlelr = () => {
    toggleRunning()
    setTimeout(() => toggleRunning(), 3000)
  }

  return (
    <div className="flex full-height">
      {/* back button zone */}
      <div className="w-4rem  bg-blue-500 flex align-items-center justify-content-center border-right-3 border-blue-500">
        <Button 
          icon="pi pi-angle-double-left" 
          className="p-button-rounded p-button-outlined bg-white"
          onClick={switchMode}
          />
      </div>
      {/* mini adventure game */}
      <div className="flex-grow-1 flex bg-white">

      </div>
      <div className="right-part center-child bg-blue-500 border-left-3 border-blue-500">
        <button 
          type="button" 
          className="go-btn"
          disabled={runningMode}
          onClick={mockRunningHandlelr}>
          {!runningMode && (<BiRun size="48" />)}
          <DotLoader 
            css={dotLoaderStyle} 
            color="#fbc02d"
            loading={runningMode}
          />
        </button>
      </div>
    </div>
  )
}

export default MiniGamePanel