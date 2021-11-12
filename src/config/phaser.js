// save phaser game configs/games
import Phaser from 'phaser';

export const BaseConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 204,
};

export const PlatformerConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};
