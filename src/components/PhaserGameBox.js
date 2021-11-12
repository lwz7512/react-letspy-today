import React, { useEffect } from 'react'
import Phaser from 'phaser';
import {
  BaseConfig,
} from '../config/phaser';
import projectStore from '../state/ProjectState'

import BouncingGame from "../games/BouncingGame";

const PhaserGameBox = () => {

  const projectID = projectStore(state => state.projectID)

  // NOTE: scene must coexist with game in same place!
  const gamesForProject = {
    1 : new BouncingGame('assets/sprites/phaser3-logo-small.png'),
  }

  useEffect(() => {
    // NOTE: parent to find dom element must be here
    const withParentAndScene = {
      ...BaseConfig,
      parent: document.querySelector('.phaser-game-container'),
      scene: gamesForProject[projectID]
    }

    const game = new Phaser.Game(withParentAndScene);

    return () => {
      game.destroy(true)
    }

  })

  return (
    <div className="phaser-game-container" />
  )
}

export default PhaserGameBox