import React from 'react'

const ProjectIntro = () => {

  return (
    <div className="intro-area border-double h-10rem blue-round-panel pb-0">
      {/* title row */}
      <div className="flex justify-content-between">
        <h3 className="text-900">Lets Jump!</h3>
        <h3>
          <span className="px-1">⭐</span>
        </h3>
      </div>
      {/* body row */}
      <div className="flex justify-content-between">
        <div className="left-part flex-1">
          <p className="description text-xl text-600">
            The goal in this mission is learning how to organize different actions to get through the lava valley.
          </p>
          <p className="pb-0 tags">
            <span className="tag text-sm">Easy</span>
            <span className="tag text-sm">Adventure</span>
            <span className="tag text-sm">Function</span>
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