import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Button } from 'primereact/button'
import {
  BiRun, BiTerminal, BiBookAlt, BiKey, BiReset, BiHelpCircle
} from "react-icons/bi"

import projectStore from '../state/ProjectState'
import { projectsBoilerplateCode, } from '../config/ProjectDefaultCode'
import { codeEditorOptions } from '../config/project'

const PYCodeEditor = () => {

  const editorRef = useRef(null);

  const runningMode = projectStore(state => state.runningMode)
  const projectID = projectStore(state => state.projectID)
  const codeValueChanged = projectStore(state => state.codeValueChanged)
  const startRunning = projectStore(state => state.startRunning)
  const currentProjectCode = projectsBoilerplateCode[projectID]


  const handleEditorDidMount = (editor, _) => {
    editorRef.current = editor;
    codeValueChanged(editor.getValue())
  }

  return (
    <div className="h-full w-full flex justify-content-between">
      <MonacoEditor
        height="358px"
        width="710px"
        defaultLanguage="python"
        defaultValue={currentProjectCode}
        loading="Loading Code Editor..."
        options={codeEditorOptions}
        onMount={handleEditorDidMount}
        onChange={value => codeValueChanged(value)}
      />
      {/* tools */}
      <div className="tools w-4rem border-left-1 border-blue-500 flex flex-column align-items-center">
        {/* run */}
        <Button
          className="p-button-rounded p-button-danger p-button-icon-only mx-2 mt-3"
          loading={runningMode}
          onClick={startRunning}
          tooltip="Run Code"
          tooltipOptions={{disabled:runningMode}}
          >
          {!runningMode && (<BiRun size="22" />)}
        </Button>
        <Button 
          className="p-button-rounded p-button-help p-button-icon-only mx-3 mt-3"
          tooltip="Live Coding Demo"
          >
          <BiTerminal size="20" />
        </Button>
        <Button 
          className="p-button-rounded p-button-primary p-button-icon-only mx-3 mt-3"
          tooltip="Reference"
          >
          <BiBookAlt size="20" />
        </Button>
        <Button 
          className="p-button-rounded p-button-secondary p-button-icon-only mx-3 mt-3"
          tooltip="Tips"
          >
          <BiKey size="20" />
        </Button>
        <Button 
          className="p-button-rounded p-button-warning p-button-icon-only mx-3 mt-3"
          tooltip="Reset Code to Initial"
          >
          <BiReset size="20" />
        </Button>
        <Button 
          className="p-button-rounded p-button-success p-button-icon-only mx-3 mt-3"
          tooltip="Help Me"
          >
          <BiHelpCircle size="20" />
        </Button>
      </div>
    </div>
  )
}

export default PYCodeEditor