// save phaser game configs/games
import Phaser from 'phaser';

import CloneArmy from '../games/CloneArmy';
import LavaAdventure from '../games/LavaAdventure';
import MakeYourPath from '../games/MakeYourPath';
import TemplateGame from '../games/TemplateGame';


// TODO: add more games...
export const gamesForProject = {
    1 : CloneArmy,
    2 : LavaAdventure,
    3 : MakeYourPath,
    4 : TemplateGame,
    5 : TemplateGame,
    6 : TemplateGame,
    7 : TemplateGame,
    8 : TemplateGame,
    9 : TemplateGame,
}


export const BaseConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 204,
    parent: 'phaser-game-box', // div id
    banner: false,
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
