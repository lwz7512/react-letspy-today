import Phaser from 'phaser';

class WhichWayToGo extends Phaser.Scene {

  constructor(){
    super('WhichWayToGo');
    // got the missing part of game from pthon code
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // expose bingo function
    this.bingo = this.bingo.bind(this)
  }

  preload(){
    this.load.image('ground', 'assets/tilemaps/tiles/terrainTiles_default.png');
    this.load.image('platform', 'assets/tilemaps/tiles/platformPack_tilesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/whichWaytogo.json');
    // player sprite sheet
    this.load.spritesheet(
      'player', 
      'assets/sprites/spritesheet_enemies.png', 
      { frameWidth: 128, frameHeight: 130 }
    );
  }
    
  create(){
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('terrain', 'ground');
    this.floor = map.createLayer('background', tiles, -40, 0);

    var tiles2 = map.addTilesetImage('tools', 'platform');
    this.tools = map.createLayer('tools', tiles2, -40, 0)

    this._createPlayer()
    this._createPlayerAnimation()
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  _createPlayerAnimation() {
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', { frames: [41, 49, 57 ] }),
        frameRate: 3,
        repeat: -1
    });

    this.anims.create({
        key: 'move',
        frames: this.anims.generateFrameNumbers('player', { start: 41, end: 57 }),
        frameRate: 2,
        repeat: -1
    });

  }

  _createPlayer() {
    // TODO: player.x = 250, in the middle of brick....
    this.player = this.physics.add.sprite(20, 154, 'player', 57);
    this.player.setBounce(0.2);
    this.player.setScale(0.3, 0.3);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
  }


  update(){
    this.player.body.setVelocityY(-5) // static yaxis stay
    this.player.play('idle', true)
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(bridge) {
    this._createGuideText('Bingo!')
    this.complete = true
    return this.complete
  }
  

}

export default WhichWayToGo