import React, { useEffect, useRef } from 'react'
import Phaser from 'phaser';
import projectStore from '../state/ProjectState'

import { PlatformerConfig, gamesForProject } from '../config/phaser';
import Congratulations from '../games/Congratulations';

import { checkResultMatchTartet } from '../helper/ProjectHelper';
import { isEmptyObj } from '../utils/StrUtil'
import { projectsCodeTarget } from '../config/ProjectDefaultCode';

const PhaserGameBox = ({ codeResultCallback }) => {

  const gameRef = useRef(null)
  const projectID = projectStore(state => state.projectID)
  const codeExecResult = projectStore(state => state.codeExecResult)
  const currentTarget = projectsCodeTarget[projectID]

  useEffect(() => {
    if (isEmptyObj(codeExecResult)) return

    const success = checkResultMatchTartet(
      currentTarget.expect, 
      codeExecResult.result
    )

    codeResultCallback(success)

    if (!success) return
    
    // call game bingo() function if success is true
    const currentScene = gameRef.current.scene.getAt(0)
    currentScene.bingo()
    
  }, [codeExecResult, currentTarget, codeResultCallback])


  useEffect(() => {
    // NOTE: parent to find dom element must be here
    const currentGame = gamesForProject[projectID]
    const safeScene = currentGame ? currentGame : gamesForProject['1']
    const withParentAndScene = {
      ...PlatformerConfig,
      scene: [safeScene, Congratulations, ]
    }

    const game = new Phaser.Game(withParentAndScene);
    gameRef.current = game // cache game for later check

    return () => {
      game.destroy(true)
    }

  }, [projectID, ])

  return (
    <div id="phaser-game-box" />
  )
}

export default PhaserGameBox