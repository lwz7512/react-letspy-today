import React from 'react'

import ReactPlayer from 'react-player'
import ProjectIntro from './ProjectIntro';
import MissionPanel from './MissionPanel';
import projectStore from '../state/ProjectState'

const ProjectDemoMode = () => {
  const project = projectStore(state => state.project)

  return (
    <>
      <ProjectIntro project={project} />
      <div className="content-area blue-round-panel dark pt-4">
        <ReactPlayer
          url={project.video}
          controls={true}
          config={{
            attributes: {
              poster: "/assets/video/letspy-today.png"
            }
          }}
        />
      </div>
      <div className="result-area border-solid h-12rem blue-round-panel p-0">
        <MissionPanel />
      </div>
    </>
  )
}

export default ProjectDemoMode