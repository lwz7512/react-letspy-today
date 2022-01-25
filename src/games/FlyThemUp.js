import Phaser from 'phaser';

class FlyThemUp extends Phaser.Scene {

  constructor(){
    super('FlyThemUp');
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
    this.load.image('sky', 'assets/skies/toxic.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/tilesheet_complete.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/flyThemUp.json');
    this.load.spritesheet(
      'soldiers', 
      'assets/sprites/soldiers.png', 
      { frameWidth:32, frameHeight:38 }
    );
    this.load.spritesheet(
      'battery', 
      'assets/sprites/battery.png', 
      { frameWidth:48, frameHeight:48 }
    );
    this.load.atlas(
      'elves', 
      'assets/animations/elves-craft-pixel.png', 
      'assets/animations/elves-craft-pixel.json'
    );
  }
  
  create(){
    this.add.image(0, 0, 'sky').setOrigin(0);

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('platform', 'tiles');

    this.ground = map.createLayer('ground', tiles, -10, -20);
    this.ground.setCollision([2, 50, 51])

    this._createBatteries();
    this._createAnimation();
    this._createPlayer();
    this._createSoldiers();

    this.physics.add.collider(this.ground, this.player);
  }

  _createBatteries() {
    for (let i=2; i<=4; i++) {
      let btr = this.add.sprite(36+i*12, 20, 'battery', i)
      btr.setScale(0.4, 0.4)
    }
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(50, 0, 'elves');
    this.player.setBounce(0.2);
    this.player.setScale(0.4, 0.4);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
    this.player.play('blueIdle')
  }

  _createSoldiers() {
    this.soldiers = this.add.group([], {runChildUpdate: true});
    var soldiersTotal = 12;
    for (let i=0; i<soldiersTotal; i++) {
      let soldier = this.physics.add.sprite(144+24*i, 22, 'soldiers', 0)
      soldier.setBounce(0.2);
      soldier.play('soldierIdle')
      soldier.setCollideWorldBounds(true);

      this.soldiers.add(soldier);
      this.physics.add.collider(this.ground, soldier);
    }
  }

  _createAnimation() {
    this.anims.create({
      key: 'greenIdle', 
      frames: this.anims.generateFrameNames('elves', { prefix: 'green_idle_', start: 0, end: 4 }), 
      frameRate: 10, 
      repeat: -1
    });
    
    this.anims.create({
      key: 'blueIdle', 
      frames: this.anims.generateFrameNames('elves', { prefix: 'blue_idle_', start: 0, end: 4 }), 
      frameRate: 10, 
      repeat: -1
    });

    this.anims.create({
      key: 'greenAttack', 
      frames: this.anims.generateFrameNames('elves', { prefix: 'green_attack_', start: 0, end: 5 }), 
      frameRate: 10
    });

    this.anims.create({
      key: 'blueAttack', 
      frames: this.anims.generateFrameNames('elves', { prefix: 'blue_attack_', start: 0, end: 4 }), 
      frameRate: 10
    });

    this.anims.create({
      key: 'greenDead', 
      frames: this.anims.generateFrameNames('elves', { prefix: 'green_die_', start: 0, end: 4 }), 
      frameRate: 6
    });

    this.anims.create({
      key: 'blueDead', 
      frames: this.anims.generateFrameNames('elves', { prefix: 'blue_die_', start: 0, end: 4 }), 
      frameRate: 6
    });

    this.anims.create({
      key: 'soldierIdle', 
      frames: this.anims.generateFrameNames('soldiers', { start: 2, end: 3 }), 
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: 'soldierFly', 
      frames: this.anims.generateFrameNames('soldiers', { start: 5, end: 9 }), 
      frameRate: 6,
      repeat: -1
    });
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
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

export default FlyThemUp