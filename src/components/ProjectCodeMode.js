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
  const isSucceed = projectStore(state => state.isSucceed)
  const tipsPanelExpanded = projectStore(state => state.tipsPanelExpanded)

  const currentTarget = projectsCodeTarget[projectID]

  const copyCodeHandler = message => {
    const notification = {
      severity: 'success', summary: 'Got it:', detail: message
    }
    // popup toast message
    toastRef.current.show(notification);
  }

  const codeAlertHander = message => {
    const notification = {
      severity: 'warn', 
      summary: 'Alert!', // title
      detail: message, 
      life: 2000
    }
    toastRef.current.show(notification);
  }

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
    // console.warn(codeExecError)
    const notification = {
      severity: 'warn', 
      summary: 'Try again!', // title
      detail: 'something wrong...', 
      life: 2000
    }
    toastRef.current.show(notification);
  }, [codeExecError])


  useEffect(() => {
    if (!isSucceed) return

    const successMessage = generateSuccessMessage(currentTarget)
    const notification = { severity: 'success', summary: 'You Won!', detail: successMessage }
    // popup toast message
    toastRef.current.show(notification);

  }, [isSucceed, currentTarget])

  useEffect(() => {
    return reset // clear current project state after view destory
  }, [reset])


  return (
    <>
      <Toast ref={toastRef} />
      {tipsPanelExpanded && (
        <ProjectTips />
      )}
      <div className="content-area blue-round-panel light">
        <PYCodeEditor onCodeCopy={copyCodeHandler} />
      </div>
      <div className="result-area border-solid blue-round-panel p-0">
        <MiniGamePanel onCodeAlert={codeAlertHander} />
      </div>
    </>
  )
}

export default ProjectCodeMode