import React, { useRef, useState, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Button } from 'primereact/button'
import {
  BiTerminal, BiBookAlt, BiReset, BiHelpCircle, BiWindowClose, BiCodeAlt, 
} from 'react-icons/bi'
import Typist from 'react-typist'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { EditorMode } from '../config/constants'
import projectStore from '../state/ProjectState'
import { projectsBoilerplateCode, } from '../config/ProjectDefaultCode'
import { codeEditorOptions } from '../config/project'


/**
 * Python mini playground for each project
 */
const PYCodeEditor = ({ onCodeCopy }) => {

  const editorRef = useRef(null);
  const [mode, setMode] = useState(EditorMode.EDIT)

  const projectID = projectStore(state => state.projectID)
  const projectContent = projectStore(state => state.projectReference)

  const codeValueChanged = projectStore(state => state.codeValueChanged)
  const toggleTipsPanel = projectStore(state => state.toggleTipsPanel)
  const projects = projectStore(state => state.projects)
  const [ { typist } ] = projects.filter(
    project => project.id === Number(projectID)
  )

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

  const typeDoneHandler = () => {
    // console.log('type animation done! to replay...')
  }

  const switchToTypistAndCopy = () => {
    setMode(EditorMode.LIVE)
    const lines = typist.map(
      line => line ? line : "\n"
    ).map(
      line => line.replaceAll(/\.\./g, "  ")
    )
    // copy to clipboard
    navigator.clipboard.writeText(lines.join(''));

    if (onCodeCopy) onCodeCopy('Copied into clicpboard!')
  }


  useEffect(() => {
    if (mode !== EditorMode.REFE) return

    const selector = '.reference-panel p > a'
    const links = document.querySelectorAll(selector)
    links.forEach(
      node => node.setAttribute('target', '_blank')
    )

  }, [mode])

  return (
    <div className="code-editor h-full w-full flex justify-content-between">
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
          <Typist
            className="typist-header"
            avgTypingDelay={90}
            cursor={{
              blink: true,
              element: '|',
            }}
            onTypingDone={typeDoneHandler}
            >
              {typist.map((line, index) => (line? 
                (<span className="typist-line" key={index}> {line} </span>) :
                (<br key={index}/>)
              ))
              }
          </Typist>
        </div>
      )}
      {mode === EditorMode.REFE && (
        <div className="reference-panel w-full p-4 bg-blue-50">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            children={projectContent}
          />
        </div>
      )}
      {mode === EditorMode.HELP && (
        <div className="help-panel w-full p-3 bg-indigo-50">
          <h4>Email Me: lwz7512@gmail.com</h4>
          <h4>FollowMe: 
            <a href="https://twitter.com/lwz75121" target="_blank" rel="noreferrer">@lwz75121</a>
          </h4>
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
            <BiCodeAlt size="22" />
        </Button>
        {/* reset */}
        <Button 
            className="p-button-warning p-button-rounded p-button-icon-only mx-2 mt-3"
            tooltip="Reset Code to Initial"
            onClick={resetEditorCode}
            >
            <BiReset size="20" />
          </Button>
        {/* live */}
        <Button 
          className={`p-button-help ${btnCmnstl} ${mode===EditorMode.LIVE?'selected':''}`}
          tooltip="Tips"
          onClick={switchToTypistAndCopy}
          >
          <BiTerminal size="20" />
        </Button>
        {/* text reference */}
        <Button 
          className={`p-button-primary ${btnCmnstl} ${mode===EditorMode.REFE?'selected':''}`}
          tooltip="Guide and Reference"
          onClick={switchEditorMode(EditorMode.REFE)}
          >
          <BiBookAlt size="20" />
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