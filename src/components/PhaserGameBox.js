import React, { useEffect } from 'react'
import Phaser from 'phaser';
import { PlatformerConfig, } from '../config/phaser';
import projectStore from '../state/ProjectState'

// import BouncingGame from "../games/BouncingGame";
import MakeYourPath from '../games/MakeYourPath';

const PhaserGameBox = () => {

  const projectID = projectStore(state => state.projectID)

  // NOTE: scene must coexist with game in same place!
  const gamesForProject = {
    // 1 : new BouncingGame('assets/sprites/phaser3-logo-small.png'),
    1 : MakeYourPath,
  }

  useEffect(() => {
    // NOTE: parent to find dom element must be here
    const currentGame = gamesForProject[projectID]
    const safeScene = currentGame ? currentGame : gamesForProject['1']
    const withParentAndScene = {
      ...PlatformerConfig,
      scene: [safeScene, ]
    }

    const game = new Phaser.Game(withParentAndScene);

    return () => {
      game.destroy(true)
    }

  })

  return (
    <div id="phaser-game-box" />
  )
}

export default PhaserGameBox