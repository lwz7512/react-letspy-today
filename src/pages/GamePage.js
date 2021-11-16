import React, { useEffect } from 'react';
import Phaser from 'phaser';

import { PlatformerConfig } from '../config/phaser';
// import CollectStarsPlatformer from '../games/CollectStarsPlatformer';
// import ParticlesGame from '../games/ParticlesGame';
// import MultiTileset from '../games/MultiTileset';
import MakeYourPath from '../games/MakeYourPath';


const GamePage = () => {

  useEffect(() => {
    const withParentAndScene = {
      ...PlatformerConfig,
      scene: [MakeYourPath]
    }

    const game = new Phaser.Game(withParentAndScene);

    return () => {
      game.destroy(true)
    }
  })

  return (
      <div className="grid">
          <div className="col-6">
              <div id="phaser-game-box"/>
          </div>
      </div>
  );
}

export default GamePage