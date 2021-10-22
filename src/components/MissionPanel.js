import React from 'react'

const MissionPanel = ({goCodingEditorHandler}) => {


  return (
    <div className="flex-space-between full-height">
      <div className="left-part">
          <h3 className="text-900">
            Mission:
          </h3>
          <p className="text-xl text-600">
            Ola is being trapped in the lava valley, help him by assigning couple of actions to escape this dangerous place. These actions are:
          </p>
          <div className="bottom-row">
            <p className="actions">
              <span className="action-fun orange">walk(1)</span>
              <span className="action-fun pink">jump(1)</span>
              <span className="action-fun green">pivot()</span>
            </p>
          </div>
        </div>
        <div className="right-part center-child bg-gray-800">
            <button 
              type="button" 
              className="go-btn" 
              onClick={goCodingEditorHandler}>
              <span className="ml-0">Go</span>
              <span className="pb-0">
                <i className="pi pi-angle-double-right"></i>
              </span>
            </button>
        </div>
    </div>
  )
}

export default MissionPanel