import React from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Button } from 'primereact/button'
import { BiRun, BiTerminal, BiBookAlt, BiBattery, BiReset, BiVideo } from "react-icons/bi"

import { firstProjectHintCode } from '../config/ProjectDefaultCode'

const PYCodeEditor = () => {

  return (
    <div className="h-full w-full flex">
      <MonacoEditor
        height="358px"
        width="700px"
        defaultLanguage="python"
        defaultValue={firstProjectHintCode}
        loading="Loading Code Editor..."
        options={{
          fontSize: 16,
          minimap: {
            enabled: false
          }
        }}
        onChange={value => false}
      />
      <div className="tools w-5rem border-left-1 border-blue-500 flex flex-column align-items-center">
        {/* run */}
        <Button className="p-button-rounded p-button-danger p-button-icon-only mx-3 mt-3">
          <BiRun size="22" />
        </Button>
        <Button className="p-button-rounded p-button-help p-button-icon-only mx-3 mt-3">
          <BiTerminal size="20" />
        </Button>
        <Button className="p-button-rounded p-button-primary p-button-icon-only mx-3 mt-3">
          <BiBookAlt size="20" />
        </Button>
        <Button className="p-button-rounded p-button-secondary p-button-icon-only mx-3 mt-3">
          <BiBattery size="20" />
        </Button>
        <Button className="p-button-rounded p-button-warning p-button-icon-only mx-3 mt-3">
          <BiReset size="20" />
        </Button>
        <Button className="p-button-rounded p-button-success p-button-icon-only mx-3 mt-3">
          <BiVideo size="20" />
        </Button>
      </div>
    </div>
  )
}

export default PYCodeEditor