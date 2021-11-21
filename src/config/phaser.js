// save phaser game configs/games
import Phaser from 'phaser';

import MakeYourPath from '../games/MakeYourPath';

// TODO: add more games...
export const gamesForProject = {
    1 : MakeYourPath,
}


export const BaseConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 204,
    parent: 'phaser-game-box', // div id
};

export const LargerBase = {
    ...BaseConfig,
    width: 800,
    height: 600,
}

export const GravityConfig = {
    ...LargerBase,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            enableSleep: false,
            debug: true
        }
    },
}

export const PlatformerConfig = {
    ...BaseConfig,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};
