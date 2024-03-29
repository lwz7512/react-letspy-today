import React from 'react'
import { Link } from 'react-router-dom'

const ProjectIntro = ({project}) => {

  return (
    <div className="intro-area border-solid h-10rem blue-round-panel pb-0">
      {/* title row */}
      <div className="flex justify-content-between">
        <h3 className="text-900">
          <Link to="/">
            <span className="px-1">🏠</span>
          </Link>
          <span className="pl-2">
            {project.title}
          </span>
          </h3>
        <h3>
          { Array(project.level).fill(0).map(
            (_, i) => (
              <span className="px-1" key={i}>
                ⭐
              </span>
            )
          )}
        </h3>
      </div>
      {/* body row */}
      <div className="flex justify-content-between">
        <div className="left-part flex-1">
          <p className="description text-xl text-700">
            {project.description}
          </p>
          <p className="pb-0 tags">
            {project.tags.map(
              (tag, i) => (
                <span className={`action-fun text-sm var-${i}`} key={tag}>
                  {tag}
                </span>
              )
            )}
          </p>
        </div>
        <div className="right-part">
          <img src={`/${project.player}`} width="50" alt="alien" />
        </div>
      </div>
    </div>
  )
}

export default ProjectIntro