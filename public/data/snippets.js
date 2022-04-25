/**
 * this file is just for edit use
 */

import Phaser from 'phaser';

export const BaseConfig = {
  type: Phaser.AUTO,
  width: 600,
  height: 237,
  parent: 'phaser-game-box',
  banner: false,
};


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

const withParentAndScene = {
  ...PlatformerConfig,
  scene: [currentGame, Congratulations, GameFailed]
}
const game = new Phaser.Game(withParentAndScene)


class TemplateGame extends Phaser.Scene {
  constructor(){
    super('TemplateGame');
  }
  preload(){
    // loading image assets...
  }
  create(){
    // create game sprites
  }
  update(){
    // rendering changes loop
  }
}

class DummyPhaserGameScene extends Phaser.Scene {
  /**
  * create/update a text on screen
  *
  * @param {string} message text display
  * @param {int} x horizontal position
  * @param {int} y vertical position
  */
  _createGuideText(message, x=10, y=10) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    const params = [
      x, y, message, { fill: '#ffff00' }
    ]
    this.guideTxt = this.add.text(...params);
  }

  preload(){
    // load bullet image
    this.load.image('bullet', 'assets/sprites/bullet5.png');
    // define solder sprite
    const soldierInfo = [
      'soldier', 
      'assets/sprites/solider_yellow.png', 
      { frameWidth: 48, frameHeight: 48}
    ]
    // load soldier sprite
    this.load.spritesheet(...soldierInfo);
    // load fire sound
    this.load.audio('fire', 'assets/audio/blaster.mp3');
  }

  preload(){
    const explosion = [
      'boom', 'assets/sprites/explosion.png', 
      { frameWidth: 64, frameHeight: 64, endFrame: 23 }
    ]
    this.load.spritesheet();
  }

  create(){
    const explode = {
      key: 'explode', frames: 'boom',
      frameRate: 36, hideOnComplete: true
    };
    this.anims.create(explode);
  }

  create(){
    // enable mouse click
    this.input.on('pointerdown', function() {
      // do something while click on game stage
    })
    // enable keyboard operation
    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);
  }

  create(){
    const groupMeta = [[], {runChildUpdate: true}]
    this.enemies = this.add.group(...groupMeta);
    this.playerLasers = this.add.group(...groupMeta);
    // collision detection
    this.physics.add.collider(
      this.enemies, this.playerLasers, 
      function(enemy, bullet){
        // explosion sound play
        // destroy enemy, bullet
      }, null, this
    )
  }


  update(){
    if (this.cursors.left.isDown) {
      // player walk left
      return
    } else if (this.cursors.right.isDown) {
      // player walk right
      return
    } else if (this.cursors.up.isDown){
      // player jump
      return
    }
  }

  _createTextBouncing() {
    this.tweens.add({
      targets: this.guideTxt,
      y: 30,
      duration: 500,
      repeat: 4,
      paused: false,
      yoyo: true
    });
  }

  create(){
    this.time.addEvent({
      delay: 200,
      callback() {
        // do something...
      },
      callbackScope: this,
      loop: false,
    })
  }

  preload(){
    const tilesSrc = [
      'tiles', 'assets/tilemaps/tiles/kenney_redux_64x64.png'
    ]
    const mapSrc = [
      'map', 'assets/tilemaps/maps/lavaAdventure.json'
    ]
    this.load.image(...tilesSrc);
    this.load.tilemapTiledJSON(...mapSrc);
  }
  create(){
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('adventure', 'tiles');
    this.background = map.createLayer('background', tiles, 0, 0);
  }


  preload(){
    this.load.spritesheet(
      'player', 
      'assets/sprites/player_tilesheet.png', 
      { frameWidth: 80, frameHeight: 110 }
    );
  }
  _createPlayer(){
    this.player = this.physics.add.sprite(20, 0, 'player', 0);
    this.player.setBounce(0.2);
    this.player.setScale(0.4, 0.4);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
  }

  _createPlayerAnimation() {
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 6
    });
    const goLeft = ['player', { start: 10, end: 9 }]
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers(...goLeft),
        frameRate: 6,
        repeat: -1
    });
    const goRight = ['player', { start: 9, end: 10 }]
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers(...goRight),
        frameRate: 6,
        repeat: -1
    });
  }

  create(){
    // 2: wall, 13: grass block, 96: exit
    this.background.setCollision([2, 13,])
    const doorFilter = tile => tile.index === 96
    this.exits = this.background.filterTiles(doorFilter)
  }
  _hitExitCheck(){
    const overlapParams = [
      this.player, this.exits, this._hitExit, null, this
    ]
    this.physics.world.overlapTiles(overlapParams);
  }

  /**
   * touch enough to consider a real hit
   * @param {Sprite} player 
   * @param {Tile} tile 
   * @param {Number} distance 
   * @returns true or false
   */
  _closeEnough(player, tile, distance, tileWidth = 32) {
    var tx = tile.x * tileWidth + tileWidth/2
    var px = player.body.center.x
    var horiDifference = Math.round(Math.abs(tx - px))
    return distance > horiDifference
  }

}
