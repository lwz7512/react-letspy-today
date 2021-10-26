import React from 'react'

import PYCodeEditor from '../components/PYCodeEditor';
import ProjectTips from '../components/ProjectTips';
import MiniGamePanel from '../components/MiniGamePanel';


const ProjectCodeMode = () => {

  return (
    <>
      <ProjectTips />
      <div className="content-area blue-round-panel light">
        <PYCodeEditor />
      </div>
      <div className="result-area border-solid h-12rem blue-round-panel p-0">
        <MiniGamePanel />
      </div>
    </>
  )
}

export default ProjectCodeMode