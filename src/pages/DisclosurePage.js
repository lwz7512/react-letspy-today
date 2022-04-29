import { useState, useEffect, useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import MonacoEditor from '@monaco-editor/react'

import { games, gameDevWorkflow } from '../config/constants'
import { codeEditorOptions } from '../config/project'
import Spinner from '../components/Spinner'
import {
  getDisclosureContent, getRemoteSourceCode
} from '../service/ProjectService'

/**
 * All the games authoring process from zero to complete.
 * 
 * Sketch:
 * ---------------------
 *     Hero
 * ---------------------
 *     Title
 * ---------------------
 *     Tools & workflow
 * ---------------------
 *   shoot  |    shoot
 * ---------------------
 *   shoot  |    shoot
 * ---------------------
 *   shoot  |    shoot
 * ---------------------
 */

const DisclosurePage = () => {

  const [selectedGame, setSelectedGame] = useState(null)
  const [gameMode, setGameMode] = useState('doc') // or `code`
  const [gameDisclosure, setGameDisclosure] = useState('')
  const [gameSourceCode, setGameSourceCode] = useState('')

  const gameFilter = game => selectedGame ? selectedGame.id !== game.id : false
  const removeInfinity = game => game.id !== Infinity
  const thumbnails = games.filter(gameFilter).filter(removeInfinity)
  const gameSelectHandler = game => () => setSelectedGame(game)


  useEffect(() => {
    if (!selectedGame) return

    // reset before request
    setGameDisclosure('')
    setGameSourceCode('')

    // loading md content
    getDisclosureContent(selectedGame.id).then(
      content => setTimeout(()=>setGameDisclosure(content), 500)
    )
    // loading source code
    getRemoteSourceCode(selectedGame.code).then(
      content => setTimeout(()=>setGameSourceCode(content), 500)
    )
  }, [selectedGame])


  useLayoutEffect(() => {
    if (!gameDisclosure || !gameSourceCode) return
    // scroll gallery up
    document.querySelector('.gallery').scrollIntoView({
      behavior: 'smooth'
    })
  }, [gameDisclosure, gameSourceCode])


  return (
    <div className="disclosure-page">
      {/* hero */}
      <img 
        className="hero-image" 
        src="assets/backgrounds/sparkling_md.png" 
        alt="hero" 
      />
      {/* title */}
      <h1 className="mb-5">Games Authoring Disclosure</h1>
      {/* tools & workflow */}
      <div className="description-area flex flex-wrap">
        <div className="section flex-1">
          <h3 className="text-center">Development Tools</h3>
          <ul className="tools pr-6">
            <li>
              <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="pr-2">
                VS Code
              </a> 
              for javascript editor
            </li>
            <li>Chrome Browser as game runtime</li>
            <li>
              <a href="https://www.mapeditor.org/" target="_blank" rel="noreferrer" className="pr-2">
                Tiled
              </a> 
              as game tilemap editor
            </li>
            <li>
              <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer" className="pr-2">
                NodeJS
              </a> 
              as game build tool
            </li>
          </ul>
        </div>
        <div className="section flex-1 border-left">
          <h3 className="text-center">Creation Workflow</h3>
          <ul className="workflow pl-6 pr-5 md:pl-7">
            {gameDevWorkflow.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* two column games gallery */}
      <div className="gallery mt-6 mb-0 flex flex-wrap">
        {/* default gallary */}
        {games.map((game) => (
          <div
            key={game.alt}
            className={`game-shot ${selectedGame?'hidden':''}`} 
          >
            {
              game.src ? (
                <img 
                  src={game.src} 
                  alt={game.alt}
                  className="interactive"
                  onClick={gameSelectHandler(game)}
                />
              ) : (
                <div className="placeholder">
                  {game.alt}
                </div>
              )
            }
          </div>
        ))}
        {/* selected game & other mini thumbnails */}
        { selectedGame && (
          <>
            <div className="game-shot relative">
              <img 
                src={selectedGame.src} 
                alt={selectedGame.alt} 
                className="fade-in"
              />
              <h3 className="mt-0 px-3 absolute bottome-left">
                {selectedGame.alt}
              </h3>
            </div>
            <div className="game-shot">
              { thumbnails.map((nail, i) => (
                <img 
                  key={i}
                  className="thumbnail interactive" 
                  src={nail.src}
                  alt={nail.alt}
                  onClick={gameSelectHandler(nail)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* selected game doc & source code */}
      {/* doc & code tab gameMode */}
      { selectedGame && (
        <div className="flex flex-wrap w-12">
          <h3 
            className={`tab ${gameMode==='doc'?'selected':''}`}
            onClick={() => setGameMode('doc')}
          >
            Game Logic Explanation
          </h3>
          <h3 
            className={`tab ${gameMode==='code'?'selected':''}`}
            onClick={() => setGameMode('code')}
          >
            Game Source Code
          </h3>
        </div>
      )}
      {/* switchable content for document or game code */}
      {selectedGame && (
        <div className="flex flex-wrap w-12 mb-5">
          {/* doc content */}
          { gameMode === 'doc' && (
            <div className="flex-1 p-3 bg-white">
              { gameDisclosure ? (
                <ReactMarkdown>
                  {gameDisclosure}
                </ReactMarkdown>
              ) : (
                <Spinner/>
              )}
            </div>
          )}
          {/* code content */}
          { gameMode === 'code' && (
            <div className="flex-1 p-3">
              { gameSourceCode ? (
                <MonacoEditor
                  height="480px"
                  width="800px"
                  defaultLanguage="javascript"
                  defaultValue={gameSourceCode}
                  loading="Loading Code Editor..."
                  options={codeEditorOptions}
                />
              ) : (
                <Spinner/>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


export default DisclosurePage