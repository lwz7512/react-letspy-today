import React from 'react'

import ReactPlayer from 'react-player'
import ProjectIntro from './ProjectIntro';
import MissionPanel from './MissionPanel';

const ProjectDemoMode = () => {

  return (
    <>
      <ProjectIntro />
      <div className="content-area blue-round-panel dark">
        <ReactPlayer
            url='https://www.youtube.com/watch?v=oUFJJNQGwhk'
            controls={true}
          />
      </div>
      <div className="result-area border-solid h-12rem blue-round-panel p-0">
        <MissionPanel />
      </div>
    </>
  )
}

export default ProjectDemoMode