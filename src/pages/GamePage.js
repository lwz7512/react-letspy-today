import React, { useEffect } from 'react';
import Phaser from 'phaser';

import { PlatformerConfig } from '../config/phaser';
// import CollectStarsPlatformer from '../games/CollectStarsPlatformer';
import ParticlesGame from '../games/ParticlesGame';


const GamePage = () => {

  useEffect(() => {
    const withParentAndScene = {
      ...PlatformerConfig,
      parent: document.querySelector('.phaser-game-box'),
      // scene: new CollectStarsPlatformer()
      scene: new ParticlesGame()
    }

    const game = new Phaser.Game(withParentAndScene);

    return () => {
      game.destroy(true)
    }
  })

  return (
      <div className="grid">
          <div className="col-6">
              <div className="phaser-game-box"/>
          </div>
      </div>
  );
}

export default GamePage