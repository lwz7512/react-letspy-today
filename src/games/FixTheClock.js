import Phaser from 'phaser';

class FixTheClock extends Phaser.Scene {

  constructor(){
    super('FixTheClock');
    // got the missing part of game from pthon code
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // expose bingo function
    this.bingo = this.bingo.bind(this)
    this.layerHoriOffset = -40
  }

  preload(){
    this.load.image('background', 'assets/backgrounds/backgroundDesert.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/building_spritesheet.png');
    this.load.image('hunchback', 'assets/sprites/hunchback_man_64.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/fixTheClock.json');
    this.load.spritesheet(
      'player',
      'assets/sprites/female_tilesheet.png',
      { frameWidth: 80, frameHeight: 110}
    );
  }
    
  create(){
    var sky = this.add.image(0, 0, 'background');
    sky.setOrigin(0, 0.4);
    sky.setScale(0.6, 0.6);

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('platform', 'tiles');

    this.ground = map.createLayer('background', tiles, -40, -20);
    this.ground.setCollision(58);
    this.ground.setScale(0.6, 0.6);

    this.decorations = map.createLayer('decorations', tiles, -40, -20);
    this.decorations.setScale(0.6, 0.6);

    this._createAnimation();
    this._createPlayer();
    this._createHunchbackMan();

    this.physics.add.collider(this.ground, this.player);
    this.physics.add.collider(this.ground, this.lord);

    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(320, 100, 'player');
    this.player.setBounce(0.2);
    this.player.setScale(0.4, 0.4);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
    // this.player.play('blueIdle')
  }

  _createHunchbackMan() {
    this.lord = this.physics.add.sprite(570, 100, 'hunchback');
    this.lord.setScale(0.6, 0.6);
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
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

  update(){

    this._manualControl()

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
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default FixTheClock