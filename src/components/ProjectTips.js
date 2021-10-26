import React, { useRef, useState } from 'react'
import {Steps} from 'primereact/steps';
import { Toast } from 'primereact/toast';


const ProjectTips = () => {

  const toastRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
      {
        label: 'Start',
        command: (event) => {
          toastRef.current.show({ severity: 'info', detail: 'First Step', summary: event.item.label, life:1000 });
        }
      },
      {
        label: 'Walk',
        command: (event) => {
          toastRef.current.show({ severity: 'info', detail: 'Seat Selection', summary: event.item.label, life:1000 });
        }
      },
      {
        label: 'Jump',
        command: (event) => {
          toastRef.current.show({ severity: 'info', detail: 'Pay with CC', summary: event.item.label, life:1000 });
        }
      },
      {
        label: 'Pivot',
        command: (event) => {
          toastRef.current.show({ severity: 'info', detail: 'Almost done', summary: event.item.label, life:1000 });
        }
      },
      {
        label: 'Pass',
        command: (event) => {
          toastRef.current.show({ severity: 'info', detail: 'Last Step', summary: event.item.label, life:1000 });
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