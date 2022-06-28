import React from 'react'

import { Button } from 'primereact/button'
import { BiRun } from 'react-icons/bi'
import { FiThumbsUp } from 'react-icons/fi'
import { DotLoader } from 'react-spinners'

import { dotLoaderStyle } from '../config/project'
import projectStore from '../state/ProjectState'

import PhaserGameBox from './PhaserGameBox'


const MiniGamePanel = ({ onCodeAlert }) => {

  const switchMode = projectStore(state => state.switchMode)
  const runningMode = projectStore(state => state.runningMode)
  const startRunning = projectStore(state => state.startRunning)
  const isSucceed = projectStore(state => state.isSucceed)
  const gameSucceed = projectStore(state => state.gameSucceed)
  const codeValue = projectStore(state => state.codeValue)

  const buttonIcon = !runningMode && (
    isSucceed ? <FiThumbsUp size="52" /> : <BiRun size="54" />
  )

  const codeResultHandler = result => gameSucceed(result)

  const checkCodeAndRun = () => {
    if (codeValue.length > 512) {
      const message = 'Code length beyond the limit!'
      return onCodeAlert(message)
    }
    startRunning()
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
        <PhaserGameBox 
          codeResultCallback={codeResultHandler}
        />
      </div>
      <div className="right-part center-child bg-blue-500 border-left-3 border-blue-500">
        <button 
          type="button" 
          className="go-btn"
          disabled={runningMode}
          onClick={checkCodeAndRun}>
          {buttonIcon}
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