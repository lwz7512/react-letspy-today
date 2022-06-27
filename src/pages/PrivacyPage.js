import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { getPrivacyContent } from '../service/ProjectService'

const PrivacyPage = () => {
  const [content, setContent] = useState('loading...')

  useEffect(() => {
    getPrivacyContent().then((resp) => setContent(resp))
  }, [])

  return (
    <div className="md-wrapper p-5 mb-5 text-900 bg-white text-lg line-height-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default PrivacyPage
