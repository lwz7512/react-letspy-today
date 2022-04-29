import Phaser from 'phaser';


class PassLiveBridge extends Phaser.Scene {

  constructor(){
    super('PassLiveBridge');
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

  init(){
    // in case of failure, need reset these values
    this.failed = false
    this.pickups = []
  }

  preload(){
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/tilesheet_complete_32.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/passLiveBridge.json');
    this.load.spritesheet(
      'aliens',
      'assets/sprites/aliens_green.png',
      {frameWidth: 64, frameHeight: 96}
    );
  }
  
  create(){
    this.add.image(0, 0, 'sky').setOrigin(0);
    
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('platform', 'tiles');
    
    this._createPlayerAnimation();
    this._createPlayer();

    this.lockerLayer = map.createLayer('layer_lock', tiles, -40, -20)
    this.lockerLayer.setCollision(51)

    this.exitLayer = map.createLayer('layer_exit', tiles, -40, -20)
    this.exitLayer.setVisible(false)
    this.exitLayer.setCollision(51)

    this.keyLayer = map.createLayer('layer_key', tiles, -40, -20)
    
    this.layerGroup = this.add.group();
    for (let i=1; i<9; i++) {
      let layer = map.createLayer('layer_'+i, tiles, -40, -20);
      layer.setCollision([118, 119, 52, 53])
      this.layerGroup.add(layer)
    }

    var keys = this.keyLayer.filterTiles(tile => tile.index === 80);
    this.pickups = this.pickups.concat(keys)
    var doors = this.exitLayer.filterTiles(tile => tile.index === 152)
    this.pickups = this.pickups.concat(doors)

    this.physics.add.collider(this.layerGroup, this.player);
    this.physics.add.collider(this.lockerLayer, this.player);
    this.physics.add.collider(this.exitLayer, this.player);

    this.platform = new MovingPlatform(
      this.layerGroup,
      this.tweens,
      this.player
    )

    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(50, 50, 'aliens');
    this.player.setBounce(0.2);
    this.player.setScale(0.5, 0.5);
    this.player.setCollideWorldBounds(false);
    this.player.setDepth(1)
    this.player.play('idle')
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
      frames: this.anims.generateFrameNames('aliens', { frames: [0, 0, 0, 6, 6, 6] }),
      frameRate: 2, 
      repeat: -1
    });

    this.anims.create({
      key: 'walk', 
      frames: [ {key: 'aliens', frame: 3}, {key: 'aliens', frame: 4}, ],
      frameRate: 2, 
      repeat: -1
    });

    this.anims.create({
      key: 'swim', 
      frames: [ {key: 'aliens', frame: 9}, {key: 'aliens', frame: 10}, ],
      frameRate: 2, 
      repeat: -1
    });

    this.anims.create({
      key: 'jump', 
      frames: [ { key: 'aliens', frame: 8 } ],
      frameRate: 2, 
    });

    this.anims.create({
      key: 'fall', 
      frames: [ { key: 'aliens', frame: 7 } ],
      frameRate: 2, 
    });

  }

  /**
   * touch enough to consider a real hit
   * @param {Sprite} player 
   * @param {Tile} tile 
   * @param {Number} distance 
   * @returns true or false
   */
   _closeEnough(player, tile, distance, tileWidth = 32) {
    var tileCenterX = tile.x * tileWidth + tileWidth/2 + this.layerHoriOffset
    var playerCenterX = player.body.center.x
    var horiDifference = Math.round(Math.abs(tileCenterX - playerCenterX))
    return distance > horiDifference
  }

  _manualControl() {

    if (this.cursors.left.isDown) { // walk left: ;
      this.player.setVelocityX(-90);
      return this.player.play('walk', true);
    }
    if (this.cursors.right.isDown) { // walk right
      this.player.setVelocityX(90);
      return this.player.play('walk', true);
    }
    if (this.cursors.up.isDown && this.player.body.blocked.down){
      this.player.play('jump');
      return this.player.setVelocityY(-180);
    }

    this.player.setVelocityX(0);
    this.player.play('idle', true);

    // check player falling down here!
    if (this.player.y > 300) {
      this.failed = true
    }
  }

  _hitPickups(player, tile){
    var hit = this._closeEnough(player, tile, 4)
    if (!hit) return

    if (tile.index === 80 && this.keyLayer) {
      this.keyLayer.removeFromDisplayList()
      this.keyLayer = null
      this.exitLayer.setVisible(true)
      this.hitKey = true
    }
    // hit the door
    if (tile.index === 152 && this.hitKey) {
      this.hitExit = true
    }

  }

  _successHandler(){
    this.onGameSuccess()
    this.scene.start(
      'congratulations', 
      { msg: 'You completed the [Pass live bridge] project!'}
    )
  }

  _gameFailed() {
    setTimeout(() => {
      this.scene.start(
        'gamefailed', 
        { scene: 'PassLiveBridge'}
      )
    }, 200)
  }

  _hitRightBoundaryCheck() {
    if(this.player.x < 580) return

    this.player.setVelocityX(0)
    this.player.setX(578)
  }


  update() {
    if (this.failed || this.succeed) return

    this.platform.update()
    this._hitRightBoundaryCheck()
    this._manualControl()

    this.physics.world.overlapTiles(
      this.player, this.pickups, this._hitPickups, null, this
    );

    if (this.failed) {
      return this._gameFailed()
    }

    if (this.hitExit && this.complete){
      this._successHandler()
    }
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(_, success) {
    if (!success) return

    this._createGuideText('Bingo!')
    this.platform.stop()
    this.complete = true

    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }


}

class MovingPlatform {

  constructor(stoneGroup, tweens, player){
    this.stoneLayers = stoneGroup.getChildren()
    this.tweens = tweens
    this.player = player

    this.frameCounter = 0
    this.startMoveTime = 100
    this.endMoveTime = 300
  }

  update(){
    this.frameCounter += 1

    if (this.frameCounter === this.startMoveTime) {
      this.start()
    }
    // if (this.frameCounter === this.endMoveTime) {
    //   this.stop()
    // }
  }

  start(){
    this.stoneLayers.forEach((layer) => {
      var y = -100 * Math.random() * 3 + 100
      var tween = {
        targets: layer,
        y,
        duration: 2000,
        delay: Math.random() * 500,
        ease: 'Sine.easeInOut',
        yoyo: true,
        loop: -1
      }
      this.tweens.add(tween)
    })
  }

  stop(){
    this.tweens.shutdown()
    this.stoneLayers.forEach(layer => layer.setY(-20))
    this.player.setY(50)
  }

}

export default PassLiveBridge