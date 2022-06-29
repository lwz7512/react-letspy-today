import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser';
import useLocalStorageState from 'use-local-storage-state'
import projectStore from '../state/ProjectState'

import { PlatformerConfig, gamesForProject } from '../config/phaser';
import Congratulations from '../games/Congratulations';
import GameFailed from '../games/GameFailed';

import { checkResultMatchTarget } from '../helper/ProjectHelper';
import { isEmptyObj } from '../utils/StrUtil'
import { projectsCodeTarget } from '../config/ProjectDefaultCode';

const PhaserGameBox = ({ codeResultCallback }) => {

  const gameRef = useRef(null)
  const audioSuccessRef = useRef(null)
  const audioFailureRef = useRef(null)

  const projectID = projectStore(state => state.projectID)
  const codeExecResult = projectStore(state => state.codeExecResult)
  const currentTarget = projectsCodeTarget[projectID]
  const [projects, updateProjectStatus] = useLocalStorageState('projects_status', {})

  console.log(codeExecResult)

  useEffect(() => {
    audioSuccessRef.current = new Audio('/assets/audio/p-ping.mp3');
    audioFailureRef.current = new Audio('/assets/audio/error_006.ogg');
  }, [])

  useEffect(() => {
    if (!gameRef.current) return
    if (isEmptyObj(codeExecResult)) return
    
    const success = checkResultMatchTarget(
      currentTarget.expect, 
      codeExecResult.result
    )
    console.log(success)
    // allowing reach to bingo without success
    const currentScene = gameRef.current.scene.getAt(0)
    currentScene.bingo(codeExecResult.result, success)
    
    const music = success ? audioSuccessRef : audioFailureRef
    setTimeout(() => music.current.play(), 300)
    
  }, [codeExecResult, currentTarget])


  useEffect(() => {
    const currentGame = gamesForProject[projectID]
    const withParentAndScene = {
      ...PlatformerConfig,
      scene: [currentGame, Congratulations, GameFailed]
    }
    const game = new Phaser.Game(withParentAndScene)
    gameRef.current = game // cache game for later check

    return () => {
      game.destroy(true)
    }
  }, [projectID])


  useEffect(() => {
    if (!gameRef.current) return

    // use callback hook to reuse the gamePassHandler function
    const gamePassHandler = () => {
      updateProjectStatus({...projects, [projectID]:'done'})
      codeResultCallback(true)
    }
    const { events } = gameRef.current
    events.addListener('gamePass', gamePassHandler)

    return () => {
      events.removeListener('gamePass')
    }
  })

  return (
    <div id="phaser-game-box" />
  )
}

export default PhaserGameBox