import React, { useRef, useState } from 'react'
import {Steps} from 'primereact/steps';
import { Toast } from 'primereact/toast';
import projectStore from '../state/ProjectState'

const ProjectTips = () => {

  const toastRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0);
  const projectID = projectStore(state => state.projectID)
  const projects = projectStore(state => state.projects)
  const [ projectInfo ] = projects.filter(project => project.id === Number(projectID))


  const items = [
      {
        label: 'Mission',
        command: (event) => {
          toastRef.current.show({
            sticky: true,
            severity: 'info',
            summary: 'Mission Brief',
            detail: projectInfo.mission,
          });
        }
      },
      {
        label: 'Tips',
        command: (event) => {
          toastRef.current.show({
            severity: 'info', 
            summary: 'Tips', 
            detail: projectInfo.tips, 
            life: 3000 
          });
        }
      },
      {
        label: 'Coding',
        command: (event) => {
          toastRef.current.show({
            severity: 'info', 
            summary: 'Coding task', 
            detail: projectInfo.coding, 
            life: 3000 
          });
        }
      },
      {
        label: 'Proceed',
        command: (event) => {
          toastRef.current.show({
            severity: 'info', 
            summary: 'Last step', 
            detail: projectInfo.walk, 
            life: 3000 
          });
        }
      },
      {
        label: 'Pass',
        command: (event) => {
          toastRef.current.show({
            severity: 'info', 
            summary: 'Congratulations', 
            detail: projectInfo.pass, 
            life: 3000 
          });
        }
      }
  ];

  return (
    <div className="intro-area border-double h-10rem blue-round-panel pb-0">
      <Toast ref={toastRef} />
      {/* title row */}
      <div className="flex justify-content-between">
        <h3 className="text-900">Instructions</h3>
        <h3>
          <span className="px-1">🙋</span>
        </h3>
      </div>
      {/* body row */}
      <div className="flex justify-content-between">
        <Steps model={items} 
          className="w-full mt-4"
          activeIndex={activeIndex} 
          onSelect={(e) => setActiveIndex(e.index)} 
          readOnly={false}
          />
      </div>
    </div>
  )
}

export default ProjectTips