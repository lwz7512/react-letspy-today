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

  const projectID = projectStore(state => state.projectID)
  const codeExecResult = projectStore(state => state.codeExecResult)
  const currentTarget = projectsCodeTarget[projectID]

  const [projects, updateProjectStatus] = useLocalStorageState('projects_status', {})

  useEffect(() => {
    if (!gameRef.current) return
    if (isEmptyObj(codeExecResult)) return
    
    const success = checkResultMatchTartet(
      currentTarget.expect, 
      codeExecResult.result
    )
    codeResultCallback(success)

    if (!success) return
    // call game bingo() function if success is true
    const currentScene = gameRef.current.scene.getAt(0)
    currentScene.bingo(codeExecResult.result)
    
  }, [codeExecResult, currentTarget, codeResultCallback])

  useEffect(() => {
    const currentGame = gamesForProject[projectID]
    const withParentAndScene = {
      ...PlatformerConfig,
      scene: [currentGame, Congratulations, GameFailed]
    }
    const game = new Phaser.Game(withParentAndScene)
    // TODO: to save my record if logged in ...
    const gamePassHandler = () => {
      // console.log(`>>> Project: ${projectID} completed!`)
      updateProjectStatus({...projects, [projectID]:'done'})
    }
    game.events.addListener('gamePass', gamePassHandler)
    gameRef.current = game // cache game for later check

    return () => {
      game.events.removeListener('gamePass')
      game.destroy(true)
    }
  // eslint-disable-next-line
  }, [projectID, ])

  return (
    <div id="phaser-game-box" />
  )
}

export default PhaserGameBox