import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { MDFILES, getMDContent } from '../service/ProjectService'

const GeneralMDPage = () => {

  const { name } = useParams()
  const [content, setContent] = useState('loading...')

  useEffect(() => {
    const fileUrl = MDFILES[name]
    if (!fileUrl) return
    getMDContent(fileUrl).then((resp) => setContent(resp))
  }, [name])

  return (
    <div className="md-doc-wrapper p-5 mb-5 text-900 bg-white text-lg line-height-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default GeneralMDPage
