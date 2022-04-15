import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import metadataParser from 'markdown-yaml-metadata-parser'
import CheatsheetViewer from '../components/CheatsheetViewer'
import { getCheatsheetContent } from '../service/ProjectService'

const CheatSheetPage = () => {
  /**
   * available file name:
   * 
   * python_beginner_cheatsheet
   * phaserjs_beginner_cheatsheet
   * python_knowledge_tree_path
   * python_100_curated_examples
   * letspy_games_create_n_explain
   */
  const { name } = useParams()
  const [cheatsheet, setCheatsheet] = useState('loading...')
  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    if (!name) return

    getCheatsheetContent(name).then(resp => {
      const result = metadataParser(resp)
      setCheatsheet(result.content)
      setMetadata(result.metadata)
    }).then(() => {
      setTimeout(() => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'})
      }, 100) // lazy scroll top
    })

  }, [name])


  return (
    <CheatsheetViewer 
      content={cheatsheet}
      metadata={metadata}
    />
  )
}

export default CheatSheetPage