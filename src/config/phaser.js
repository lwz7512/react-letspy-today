// save phaser game configs/games
import Phaser from 'phaser';

// import TemplateGame from '../games/TemplateGame';
import CloneArmy from '../games/CloneArmy';
import LavaAdventure from '../games/LavaAdventure';
import MakeYourPath from '../games/MakeYourPath';
import GuessMyName from '../games/GuessMyName'
import SphinxRiddle from '../games/SphinxRiddle'
import WhichWayToGo from '../games/WhichWayToGo'
import FlyThemUp from '../games/FlyThemUp'
import PassLiveBridge from '../games/PassLiveBridge'
import FixTheClock from '../games/FixTheClock'


export const gamesForProject = {
    1 : CloneArmy,
    2 : LavaAdventure,
    3 : MakeYourPath,
    4 : GuessMyName,
    5 : SphinxRiddle,
    6 : WhichWayToGo,
    7 : FlyThemUp,
    8 : PassLiveBridge,
    9 : FixTheClock,
}


export const BaseConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 234,
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
