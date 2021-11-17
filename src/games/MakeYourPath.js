import Phaser from 'phaser';

class MakeYourPath extends Phaser.Scene {
  
  constructor(){
    super('MakeYourPath');
    this.blankRows = [
      [ 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, ], // - row blank
      [ 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, ], // - row blank
      [ 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 151, ], // - row blank, last tile is Door
    ]
    this.level0 = [
      ...this.blankRows,
      [ 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12,  ], // - ** path row **
      [ 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, ], // - row blank
      [ 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, ], // - row lava
    ]
    this.level1 = [
      ...this.blankRows,
      [ 107, 122, 107, 122, 107, 122, 107, 122, 107, 122, 107, 122, 107, 122, 107, 122, 107, 122, 107, ], // - ** path row **
    ]
    this.pickups = []
    // build the missing part of game
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // debug flag
    this.debug = false
  }

  preload() {
    this.load.image('tileskenney', 'assets/tilemaps/tiles/kenney_redux_64x64.png');
    this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  _createGroundLayer(tilesArray) {
    // When loading from an array, make sure to specify the tileWidth and tileHeight
    var map = this.make.tilemap({ data: tilesArray, tileWidth: 64, tileHeight: 64 });
    var tiles = map.addTilesetImage('tileskenney');
    var groundLayer = map.createLayer(0, tiles, 0, 12);
    groundLayer.setScale(0.5, 0.5);
    groundLayer.setCollision([12, 122]) // 12, 122 is the tile id of path row

    // get exit tile
    if (this.pickups.length === 0) {
      this.pickups = map.filterTiles(tile => tile.index === 151);
    }

    return groundLayer
  }

  _createPlayerAnimation() {
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

  }

  _createPlayer() {
    this.player = this.physics.add.sprite(0, 0, 'dude');
    this.player.setBounce(0.2);
    this.player.setScale(0.8, 0.8)
    this.player.setCollideWorldBounds(true);
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  create() {
    // create first layer of ground first
    var groundLayer = this._createGroundLayer(this.level0)
    // then, create player
    this._createPlayer()
    this._createPlayerAnimation();
    this._createGuideText('Watch out!')

    // set layer collision
    this.physics.add.collider(groundLayer, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    if (!this.debug) return
    // FIXME: ...just for test
    var bridgeLayer = this._createGroundLayer(this.level1)
    this.physics.add.collider(bridgeLayer, this.player);
  }

  update() {

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) { // walk right
        this.player.setVelocityX(80);
        this.player.anims.play('right', true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down){
        this.player.setVelocityY(-150);
    }

    // check collision
    this.physics.world.overlapTiles(this.player, this.pickups, this._hitExit, null, this);
  }

  _hitExit() {
    if (this.succeed) return

    // TODO: ...change scene to congratulation!
    // var congratulations = this.scene.get('congratulations')
    this.scene.start('congratulations', { msg: 'You completed the Make Your Path chapter!' })

    this.succeed = true
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo() {
    if (this.complete) return

    var bridgeLayer = this._createGroundLayer(this.level1, this.player)
    this.physics.add.collider(bridgeLayer, this.player);
    this._createGuideText('Walk player toward Exit using right arrow key!')
    
    this.complete = true
  }

}

export default MakeYourPath