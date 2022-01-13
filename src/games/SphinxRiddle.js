import Phaser from 'phaser';

class SphinxRiddle extends Phaser.Scene {

  constructor(){
    super('SphinxRiddle');
    // got the missing part of game from pthon code
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // expose bingo function
    this.bingo = this.bingo.bind(this)
    this.pickups = []
    this.layerHoriOffset = -40
  }

  preload(){
    this.load.image('egypt', 'assets/skies/pyramid_desert_sm.jpg');
    this.load.image('sphinx', 'assets/sprites/sphinx_sm.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/platformPack_tilesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/sphinxRiddle.json');
    // player sprite sheet
    this.load.spritesheet(
      'player', 
      'assets/sprites/adventurer_tilesheet.png', 
      { frameWidth: 80, frameHeight: 110 }
    );
  }
    
  create(){
    this.egypt = this.add.image(300, 80, 'egypt');
    this.sphinx = this.add.image(500, 100, 'sphinx');

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('platform', 'tiles');
    this.floorLayer = map.createLayer('background', tiles, -40, 0);
    this.floorLayer.setCollision(4)
    this.boxesLayer = map.createLayer('boxes', tiles, -60, 0);
    this.doorLayer = map.createLayer('door', tiles, -40, 0);
    this.doorLayer.setVisible(false);
  
    this._createAnimation()
    this._createPlayer()

    this.physics.add.collider(this.floorLayer, this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);

    // get door
    var doors = this.doorLayer.filterTiles(tile => tile.index === 76)
    this.pickups = this.pickups.concat(doors)

    var popup = this._createDialog.bind(this)
    setTimeout(popup, 1000)
  }

  _createDialog() {
    var dialogX = 140
    var dialogY = 30
    var dialogW = 300
    var dialogH = 100
    var dialogR = 6

    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1);
    graphics.strokeRoundedRect(dialogX, dialogY, dialogW, dialogH, dialogR);
    graphics.fillStyle(0xffff00, 0.6);
    graphics.fillRoundedRect(dialogX, dialogY, dialogW, dialogH, dialogR);
    // What goes on four feet in the morning, two feet at noon, and three feet in the evening? 
    var content = [
        "What goes on four feet in the morning, ",
        "two feet at noon, and three feet in the",
        "evening? Anwser is hidden in the two",
        "boxes, which box hold the right anwser!",
    ];

    this.dialog = this.add.text(
      dialogX+8, 
      dialogY+8, 
      content, 
      { fontFamily: 'Arial', color: '#000000'}
    );
    this.dialog.setLineSpacing(6);
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(100, 60, 'player', 0);
    this.player.setBounce(0.2);
    this.player.setScale(0.5, 0.5);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
  }

  _createAnimation() {
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 6
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 10, end: 9 }),
      frameRate: 6,
      repeat: -1
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 10 }),
      frameRate: 6,
      repeat: -1
  });

  this.anims.create({
    key: 'jump',
    frames: [ { key: 'player', frame: 1 } ],
    frameRate: 6
  });

  }

  _manualControl() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      return this.player.play('left', true);
    } else if (this.cursors.right.isDown) { // walk right
      this.player.setVelocityX(90);
      return this.player.play('right', true);
    }
    if (this.cursors.up.isDown){
        this.player.play('jump');
      if (this.player.body.blocked.down)
        return this.player.setVelocityY(-160);
    }

    var ySpeed = this.player.body.velocity.y
    var isStatic = Math.ceil(Math.abs(ySpeed)) === 1

    this.player.setVelocityX(0);

    if (isStatic) this.player.play('turn');

    // if (this.exitHitted) {
    //   this._successHandler()
    // }
  }

  /**
   * touch enough to consider a real hit
   * @param {Sprite} player 
   * @param {Tile} tile 
   * @param {Number} distance 
   * @returns true or false
   */
   _closeEnough(player, tile, distance) {
    var tileCenterX = tile.x * 64 + 32 + this.layerHoriOffset
    var playerCenterX = player.body.center.x
    var horiDifference = Math.round(Math.abs(tileCenterX - playerCenterX))
    return distance > horiDifference
  }

  _hitTile(player, tile) {
    if (!this.complete) return
    if (!this._closeEnough(player, tile, 10)) return

    this.succeed = true // end of  game!
  }

  update(){
    if (this.succeed) return

    // detect hit the key, and show the ladder...
    this.physics.world.overlapTiles(this.player, this.pickups, this._hitTile, null, this);
    
    this._manualControl()

    if (this.succeed) {
      this.scene.start(
        'congratulations', 
        { msg: 'You completed the [Riddle of Sphinx] chapter!' }
      );
      this.onGameSuccess()
    }
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(_, done) {
    if (!done) return

    this.dialog.setText([
      "Bingo!",
      "press RIGHT ARROW KEY",
      "toward door to complete this game!"
    ])

    this.doorLayer.setVisible(true)
    this.complete = true
    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default SphinxRiddle