import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser';
import useLocalStorageState from 'use-local-storage-state'
import projectStore from '../state/ProjectState'

import { PlatformerConfig, gamesForProject } from '../config/phaser';
import Congratulations from '../games/Congratulations';
import GameFailed from '../games/GameFailed';

import { checkResultMatchTartet } from '../helper/ProjectHelper';
import { isEmptyObj } from '../utils/StrUtil'
import { projectsCodeTarget } from '../config/ProjectDefaultCode';

const PhaserGameBox = ({ codeResultCallback }) => {

  const gameRef = useRef(null)
  const audioRef = useRef(null)

  const projectID = projectStore(state => state.projectID)
  const codeExecResult = projectStore(state => state.codeExecResult)
  const currentTarget = projectsCodeTarget[projectID]
  const [projects, updateProjectStatus] = useLocalStorageState('projects_status', {})


  useEffect(() => {
    audioRef.current = new Audio('assets/audio/match5.mp3');
  }, [])

  useEffect(() => {
    if (!gameRef.current) return
    if (isEmptyObj(codeExecResult)) return
    
    const success = checkResultMatchTartet(
      currentTarget.expect, 
      codeExecResult.result
    )
    codeResultCallback(success)
    // allowing reach to bingo without success
    const currentScene = gameRef.current.scene.getAt(0)
    currentScene.bingo(codeExecResult.result, success)

    if (success) {
      audioRef.current.play()
    }
    
  }, [codeExecResult, currentTarget, codeResultCallback])


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

    // TODO: to save my record if logged in ...
    // use callback hook to reuse the gamePassHandler function
    const gamePassHandler = () => {
      updateProjectStatus({...projects, [projectID]:'done'})
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