import React, { useEffect, useRef } from 'react'

import { Toast } from 'primereact/toast';
import PYCodeEditor from '../components/PYCodeEditor';
import ProjectTips from '../components/ProjectTips';
import MiniGamePanel from '../components/MiniGamePanel';
import projectStore from '../state/ProjectState'
import { isEmptyObj } from '../utils/StrUtil'
import { projectsCodeTarget } from '../config/ProjectDefaultCode';
import {
  checkResultMatchTarget, 
  generateFailureMessage, 
  generateSuccessMessage,
} from '../helper/ProjectHelper';


const ProjectCodeMode = () => {

  const toastRef = useRef(null)
  const isRunning = projectStore(state => state.isRunning)
  const runningMode = projectStore(state => state.runningMode)
  const execute = projectStore(state => state.execute)
  const codeExecResult = projectStore(state => state.codeExecResult)
  const codeExecError = projectStore(state => state.codeExecError)
  const projectID = projectStore(state => state.projectID)
  const reset = projectStore(state => state.reset)
  const currentTarget = projectsCodeTarget[projectID]


  useEffect(() => {
    if (!isRunning) return
  
    const mockRunningHandlelr = async () => {
      // not allowed to invoke execute on running
      if (runningMode) return
      await execute(currentTarget)
    }
  
    mockRunningHandlelr()
  })

  useEffect(() => {
    if (isEmptyObj(codeExecResult)) return
    const success = checkResultMatchTarget(
      currentTarget.expect, 
      codeExecResult.result
    )
    const hasError = !codeExecResult.success
    const severity = success ? 'success' : (hasError ? 'error' : 'warn')
    const summary = success ? 'Success!' : 'Failed!' // title
    const successMessage = generateSuccessMessage(currentTarget)
    const failureMessage = generateFailureMessage(currentTarget, codeExecResult)
    const detail = success ? successMessage : failureMessage
    const notification = { severity, summary, detail }
    // popup toast message
    toastRef.current.show(notification);

  }, [codeExecResult, currentTarget])

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

  useEffect(() => {
    return reset // clear current project state after view destory
  }, [reset])


  return (
    <>
      <Toast ref={toastRef} />
      <ProjectTips />
      <div className="content-area blue-round-panel light">
        <PYCodeEditor />
      </div>
      <div className="result-area border-solid h-15rem blue-round-panel p-0">
        <MiniGamePanel />
      </div>
    </>
  )
}

export default ProjectCodeMode