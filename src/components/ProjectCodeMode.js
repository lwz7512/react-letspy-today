import React, { useEffect, useRef } from 'react'

import { Toast } from 'primereact/toast';
import PYCodeEditor from '../components/PYCodeEditor';
import ProjectTips from '../components/ProjectTips';
import MiniGamePanel from '../components/MiniGamePanel';
import projectStore from '../state/ProjectState'
import { isEmptyObj } from '../utils/StrUtil'

const ProjectCodeMode = () => {

  const toastRef = useRef(null)
  const codeExecResult = projectStore(state => state.codeExecResult)
  const codeExecError = projectStore(state => state.codeExecError)

  useEffect(() => {
    if (isEmptyObj(codeExecResult)) return
    console.log(codeExecResult)
    const notification = {
      severity: 'success',
      summary: 'Success!', // title
      detail: 'First Step',
      life: 2000
    }
    toastRef.current.show(notification);
  }, [codeExecResult])

  useEffect(() => {
    if (!codeExecError) return
    console.warn(codeExecError)
    const notification = {
      severity: 'warn', 
      summary: 'Try again!', // title
      detail: 'something wrong...', 
      life: 2000
    }
    toastRef.current.show(notification);
  }, [codeExecError])

  return (
    <>
      <Toast ref={toastRef} />
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