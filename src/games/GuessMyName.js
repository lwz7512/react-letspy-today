import Phaser from 'phaser';

// GAME 4:
class GuessMyName extends Phaser.Scene {

  constructor(){
    super('GuessMyName');
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
    this.load.image('sky', '/assets/skies/sky2.png');
    this.load.image('tiles', '/assets/tilemaps/tiles/platformPack_tilesheet.png');
    this.load.image('letters', '/assets/tilemaps/tiles/yellow_spritesheet_512.png');
    this.load.tilemapTiledJSON('map', '/assets/tilemaps/maps/guessMyName.json')
    // player sprite sheet
    this.load.spritesheet(
      'player', 
      '/assets/sprites/platformerPack_character.png', 
      { frameWidth: 96, frameHeight: 96 }
    );
  }
    
  create(){
    this.add.image(300, 102, 'sky')

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('platform', 'tiles');
    var tiles2 = map.addTilesetImage('letters512', 'letters')

    this.background = map.createLayer('background', tiles, this.layerHoriOffset, 0);
    this.background.setCollision([18, 60])

    this.lockerLayer = map.createLayer('lock', tiles, this.layerHoriOffset, 0);
    this.keyLayer = map.createLayer('key', tiles, this.layerHoriOffset, 0);
    this.lettersLayer = map.createLayer('letters', tiles2, this.layerHoriOffset, 0);
    this.caillouLayer = map.createLayer('caillou', tiles2, this.layerHoriOffset, 0);
    this.caillouLayer.setVisible(false)

    this.ladderLayer = map.createLayer('ladder', tiles, this.layerHoriOffset, 0);
    this.ladderLayer.setVisible(false)
    
    this._collisionTiles(this.background, this.ladderLayer, this.keyLayer)
    this._createPlayerAnimation()
    this._createPlayer()

    this.collider = this.physics.add.collider(this.background, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);

    this._createGuideText('Move the robot by pressing RIGHT KEY!')
  }

  _collisionTiles(bgLayer, ladderLayer, keyLayer) {
    if (this.pickups.length) return
    // get door
    var doors = bgLayer.filterTiles(tile => tile.index === 76)
    this.pickups = this.pickups.concat(doors)
    // get ladder
    var ladders = ladderLayer.filterTiles(tile => tile.index === 58)
    this.pickups = this.pickups.concat(ladders)
    // get keys
    var keys = keyLayer.filterTiles(tile => tile.index === 65)
    this.pickups = this.pickups.concat(keys)
  }

  _createPlayer() {
    // y position below 30 to invoke jump!
    this.player = this.physics.add.sprite(100, 30, 'player', 0);
    this.player.setBounce(0.2);
    this.player.setScale(0.6, 0.6);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
    this.player.play('jump')
  }

  _createPlayerAnimation() {
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 6
    });

    this.anims.create({
        key: 'jump',
        frames: [ { key: 'player', frame: 1 } ],
        frameRate: 6
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 2 }),
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
      key: 'climb',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
      frameRate: 6
    });

  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  _manualControl() {
    if (this.cursors.left.isDown) {
      // FIXME: prevent player falling down to the ground from 2nd floor
      if (this.player.y < 40 && this.player.x < 300) {
        return this.player.setVelocityX(0);
      }
      this.player.setVelocityX(-160);
      return this.player.play('left', true);
    } else if (this.cursors.right.isDown) { // walk right
      this.player.setVelocityX(90);
      return this.player.play('right', true);
    }

    // to the end of ladder, jump to the ground
    if (this.hitLadder && this.player.y < 40) {
      this.player.setVelocityY(0)
      this.player.setPosition(320, 0)
      this.background.setCollision(60, true) // enable landing to the 2nd floor ground!
      return
    }

    // climbing the ladder...
    if (this.cursors.up.isDown && this.hitLadder) {
      this.player.setVelocityY(-90);
      return this.player.play('climb', true);
    }
    
    // hold the ladder...
    if (this.hitLadder) {
      this.player.setVelocityX(0)
      return this.player.play('climb');
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

  _hitTile(player, tile) {
    if (!this._closeEnough(player, tile, 20)) return

    if (tile.index === 65) {// hit the key, unlock the proceeding items
      this.hitKey = true
      this.lockerLayer.setVisible(false)
      this.ladderLayer.setVisible(true)
      this.keyLayer.setVisible(false)
    }
    if (tile.index === 76) {// hit the door
      this.succeed = true // end of  game!
    }

    if (!this.hitKey) return // pickup key first!
    if (tile.index === 58) {// after picked key to allow hit ladder
      this.hitLadder = true
    }
  }

  update() {
    if (this.succeed) return

    // 1. reset hit flag
    this.hitLadder = false

    // 2. detect hit the key, and show the ladder...
    this.physics.world.overlapTiles(this.player, this.pickups, this._hitTile, null, this);

    // 3. check hit flag, and set anction
    this._manualControl()

    // 4. hit the exit
    if (this.succeed) {
      this.scene.start(
        'congratulations', 
        { msg: 'You completed the [Guess My Name] chapter!' }
      );
      this.onGameSuccess()
    }
  }

  /**
   * exposure to outside of game
   * @returns nothing
   */
  bingo(answer, success) {
    if (answer !== 'CA') return

    this._createGuideText('Bingo! Walk right to pickup the key using RIGHT KEY!')
    this.background.setCollision(60, false) // remove the block collision
    this.caillouLayer.setVisible(true)

    this.complete = true
    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default GuessMyName