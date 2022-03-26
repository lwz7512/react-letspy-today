import React from 'react'

import ReactPlayer from 'react-player'
import ProjectIntro from './ProjectIntro';
import MissionPanel from './MissionPanel';

const ProjectDemoMode = () => {
  // TODO: get video address...

  return (
    <>
      <ProjectIntro />
      <div className="content-area blue-round-panel dark">
        <ReactPlayer
            url="assets/video/logo_reveal_640x360.mp4"
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