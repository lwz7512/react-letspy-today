import React from 'react'

import projectStore from '../state/ProjectState'


const ProjectIntro = () => {

  const projectID = projectStore(state => state.projectID)
  const projects = projectStore(state => state.projects)
  const [ tip ] = projects.filter(project => project.id === Number(projectID))


  return (
    <div className="intro-area border-double h-10rem blue-round-panel pb-0">
      {/* title row */}
      <div className="flex justify-content-between">
        <h3 className="text-900">{tip.title}</h3>
        <h3>
          <span className="px-1">⭐</span>
        </h3>
      </div>
      {/* body row */}
      <div className="flex justify-content-between">
        <div className="left-part flex-1">
          <p className="description text-xl text-700">
            {tip.description}
          </p>
          <p className="pb-0 tags">
            {tip.tags.map(
              tag => (
                <span className="tag text-sm" key={tag}>
                  {tag}
                </span>
              )
            )}
          </p>
        </div>
        <div className="right-part pr-4 pt-4 ">
          <img src="assets/layout/images/alienBlue_sm.png" width="50" alt="alien" />
        </div>
      </div>
    </div>
  )
}

export default ProjectIntro