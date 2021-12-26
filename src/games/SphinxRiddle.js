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
    this.sphinx = this.add.image(450, 100, 'sphinx');

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('platform', 'tiles');
    this.floor = map.createLayer('background', tiles, -40, 0);
    this.floor.setCollision(4)
    this.boxes = map.createLayer('boxes', tiles, -40, 0);
  
    this._createPlayer()
    this._createPlayerAnimation()

    this.physics.add.collider(this.floor, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  _createPlayer() {
    // TODO: player.x = 250, in the middle of brick....
    this.player = this.physics.add.sprite(100, 60, 'player', 0);
    this.player.setBounce(0.2);
    this.player.setScale(0.6, 0.6);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
  }

  _createPlayerAnimation() {
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
  

}

export default SphinxRiddle