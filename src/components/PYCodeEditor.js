import React, { useRef, useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Button } from 'primereact/button'
import {
  BiRun, BiTerminal, BiBookAlt, BiKey, BiReset, BiHelpCircle, BiWindowClose,
} from 'react-icons/bi'

import { EditorMode } from '../config/constants'
import projectStore from '../state/ProjectState'
import { projectsBoilerplateCode, } from '../config/ProjectDefaultCode'
import { codeEditorOptions } from '../config/project'


/**
 * Python mini playground for each project
 */
const PYCodeEditor = () => {

  const editorRef = useRef(null);
  const [mode, setMode] = useState(EditorMode.EDIT)

  const projectID = projectStore(state => state.projectID)
  const codeValueChanged = projectStore(state => state.codeValueChanged)
  const toggleTipsPanel = projectStore(state => state.toggleTipsPanel)

  const currentProjectCode = projectsBoilerplateCode[projectID]
  const btnCmnstl = 'p-button-rounded p-button-icon-only mx-2 mt-3'

  const handleEditorDidMount = (editor, _) => {
    editorRef.current = editor;
    codeValueChanged(editor.getValue())
  }

  const switchEditorMode = mode => () => {
    setMode(mode)
  }

  const switchInstructionPanel = () => {
    toggleTipsPanel()
  }

  const resetEditorCode = () => {
    editorRef.current.setValue(currentProjectCode)
  }

  return (
    <div className="h-full w-full flex justify-content-between">
      {mode === EditorMode.EDIT && (
        <MonacoEditor
          height="420px"
          width="710px"
          defaultLanguage="python"
          defaultValue={currentProjectCode}
          loading="Loading Code Editor..."
          options={codeEditorOptions}
          onMount={handleEditorDidMount}
          onChange={value => codeValueChanged(value)}
        />
      )}
      {mode === EditorMode.LIVE && (
        <div className="terminal-panel w-full">
          <p>Terminal Panel</p>
        </div>
      )}
      {mode === EditorMode.REFE && (
        <div className="reference-panel w-full">
          <p>Reference Panel</p>
        </div>
      )}
      {mode === EditorMode.TIPS && (
        <div className="tips-panel w-full">
          <p>Tips Panel</p>
        </div>
      )}
      {mode === EditorMode.HELP && (
        <div className="help-panel w-full">
          <p>Help Panel</p>
        </div>
      )}
      {/* tools */}
      <div className="tools border-left-1 border-blue-500 flex flex-column align-items-center">
        {/* edit */}
        <Button
          className={`p-button-danger ${btnCmnstl} ${mode===EditorMode.EDIT?'selected':''}`}
          tooltip="Edit Code"
          onClick={switchEditorMode(EditorMode.EDIT)}
          >
            <BiRun size="22" />
        </Button>
        {/* reset */}
        {mode === EditorMode.EDIT && (
          <Button 
            className={`p-button-warning ${btnCmnstl} ${mode===EditorMode.RESET?'selected':''}`}
            tooltip="Reset Code to Initial"
            onClick={resetEditorCode}
            >
            <BiReset size="20" />
          </Button>
        )}
        {/* live */}
        <Button 
          className={`p-button-help ${btnCmnstl} ${mode===EditorMode.LIVE?'selected':''}`}
          tooltip="Live Coding Demo"
          onClick={switchEditorMode(EditorMode.LIVE)}
          >
          <BiTerminal size="20" />
        </Button>
        {/* subtitle */}
        <Button 
          className={`p-button-primary ${btnCmnstl} ${mode===EditorMode.REFE?'selected':''}`}
          tooltip="Subtitle &#38; Reference"
          onClick={switchEditorMode(EditorMode.REFE)}
          >
          <BiBookAlt size="20" />
        </Button>
        {/* tips */}
        <Button 
          className={`p-button-secondary ${btnCmnstl} ${mode===EditorMode.TIPS?'selected':''}`}
          tooltip="Tips"
          onClick={switchEditorMode(EditorMode.TIPS)}
          >
          <BiKey size="20" />
        </Button>
        {/* help */}
        <Button 
          className={`p-button-success ${btnCmnstl} ${mode===EditorMode.HELP?'selected':''}`}
          tooltip="Help Me"
          onClick={switchEditorMode(EditorMode.HELP)}
          >
          <BiHelpCircle size="20" />
        </Button>
        {/* close */}
        <Button 
          className={`p-button-info ${btnCmnstl} ${mode===EditorMode.HIDE?'selected':''}`}
          tooltip="Close Instructions"
          onClick={switchInstructionPanel}
          >
          <BiWindowClose size="20" />
        </Button>
      </div>
    </div>
  )
}

export default PYCodeEditor