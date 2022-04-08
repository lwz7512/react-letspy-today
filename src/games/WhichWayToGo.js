import Phaser from 'phaser';


class CellStep {
  constructor(player, tile){
    this.player = player
    this.tile = tile
    this.speed = 60 // do not change this value!
    this.toTheEnd = false
  }

  update() {
    if (this.toTheEnd) return

    let threshold = 1
    let layerXOffset = -10
    let layerYOffset = 26
    let xDiff = this.tile.x * 64 + layerXOffset - this.player.x
    let yDiff = this.tile.y * 64 + layerYOffset - this.player.y
    // stop
    let maxDiff = Math.max(Math.abs(xDiff), Math.abs(yDiff))
    if (maxDiff === threshold) {
      console.log('>>> one step is end!');
      this.toTheEnd = true
      return this.player.setVelocity(0, 0)
    }

    if (xDiff > threshold) {
      return this._goRight()
    }
    if (yDiff > threshold) {
      return this._goDown()
    }
    if (yDiff < -threshold) {
      return this._goTop()
    }
  }

  _goRight() {
    this.player.setVelocityX(this.speed);
  }

  _goTop() {
    this.player.setVelocityY(-this.speed);
  }

  _goDown() {
    this.player.setVelocityY(this.speed);
  }

  isEnd() {
    return this.toTheEnd
  }
} 


class GridWalker {
  constructor(player, tiles, cellFinishCallback, exitCallback){
    this.steps = tiles.map(
      tile => new CellStep(player, tile)
    );
    this.moveCounter = 0;
    this.onCellChange = cellFinishCallback;
    this.onExit = exitCallback;
  }

  update(){
    // game complete!
    if (!this.steps.length) return

    this.moveCounter += 1 // lazy action execution counter
    // waiting for bingo calling repetition until last update
    if (this.moveCounter < 24) return
    
    // get recent step to update
    const headStep = this.steps[0]
    headStep.update()

    if (!headStep.isEnd()) return // still need update current action

    // remove first step after it completion
    this.steps.shift()
    this.onCellChange(headStep.tile)

    if (!this.steps.length) {
      this.onExit()
    }
  }
}

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
    this.layerHoriOffset = -40
    // path tiles player can walk
    this.paths = {
      1 : [{x: 1, y: 2}, {x: 1, y: 3}, ],
      2 : [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}],
      3 : [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 3}, {x: 6, y: 3}],
      4 : [
        {x: 1, y: 2}, {x: 1, y: 1, rm: true}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, 
        {x: 5, y: 1}, {x: 6, y: 1}, {x: 6, y: 0, rm: true}, {x: 7, y: 0}, {x: 8, y: 0}, {x: 9, y: 0}
      ],
      5 : [
        {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, 
        {x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}, {x: 8, y: 1}
      ],
      6 : [
        {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, 
        {x: 5, y: 1}, {x: 6, y: 1}, {x: 6, y: 2}, {x: 7, y: 2}
      ],
    }
    // walking player
    this.walker = null
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

    this._createAnimation()
    this._createPlayer()
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ff0000' });
  }

  _createAnimation() {
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
    this.player = this.physics.add.sprite(20, 154, 'player', 57);
    this.player.setBounce(0.2);
    this.player.setScale(0.25, 0.25);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
    this.player.body.setAllowGravity(false)
    this.player.play('idle', true)
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

  _successHandler() {
    this.succeed = true
    this.onGameSuccess()
    this.scene.start(
      'congratulations', 
      { msg: 'You completed the [Which Way to Go] project!'}
    )
  }

  _onCellChange(tile) {
    if (!tile.rm) return
    this.tools.removeTileAt(tile.x, tile.y)
  }

  update(){
    if (!this.walker || this.succeed) return

    // walker by path tiles
    this.walker.update()
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(path, success) {
    if (!success) return false

    this.walker = new GridWalker(
      this.player, 
      this.paths[path.id],
      this._onCellChange.bind(this),
      this._successHandler.bind(this)
    )
    this._createGuideText('Bingo!')

    return true
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default WhichWayToGo