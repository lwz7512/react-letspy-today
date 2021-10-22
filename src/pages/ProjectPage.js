import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { Button } from 'primereact/button';
import ReactPlayer from 'react-player'
import ProjectIntro from '../components/ProjectIntro';
import MissionPanel from '../components/MissionPanel';

const ProjectPage = () => {

  const { pid } = useParams();
  // console.log(pid)
  // const params = new URLSearchParams(location.search);
  // console.log(params.get('pid'))
  const [displayEditor, setDisplayEditor] = useState(false)

  const goCodingEditorHandler = () => {
    setDisplayEditor(true)
  }

  return (
    <div className="project">
      {/* project intro area */}
      <ProjectIntro />
      {/* project video/script area */}
      <div className={
        `content-area border-solid blue-round-panel ${displayEditor?'light':'dark'}`
      }>
        { !displayEditor && (
          <ReactPlayer
            url='https://www.youtube.com/watch?v=oUFJJNQGwhk'
            controls="true"
          />
        )}
        { displayEditor && (
          <p>this is monaco editor...</p>
        )}
      </div>
      {/* project mission area */}
      <div className="result-area border-solid h-12rem blue-round-panel p-0">
        <MissionPanel 
          goCodingEditorHandler={goCodingEditorHandler}
         />
      </div>
    </div>
  )
}

export default ProjectPage