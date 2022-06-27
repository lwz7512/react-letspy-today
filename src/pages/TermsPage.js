import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { getTermsContent } from '../service/ProjectService'

const TermsPage = () => {
  const [content, setContent] = useState('loading...')

  useEffect(() => {
    getTermsContent().then((resp) => setContent(resp))
  }, [])

  return (
    <div className="md-wrapper p-5 mb-5 text-900 bg-white text-lg line-height-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default TermsPage
