import Phaser from 'phaser';

class Action {

  constructor(player, step, updateCallback=null) {
    this.player = player
    this.step = step
    this.frameCounter = 0
    this.frameTotal = 40
    this._parse(step)
    this.onUpdate = updateCallback
  }

  _parse(step) {
    this.name = Object.keys(step)[0]
    this.length = step[this.name]
    if (this.length) {
      this.frameTotal *= this.length
    } else {
      this.frameTotal = 12 // for pivot
    }
  }

  toString() {
    return '>>> action: ' + this.name
  }

  _goRight() {
    this.player.setVelocityX(90);
    this.player.play('right', true);
  }

  _goJump() {
    this.player.play('jump');
    this.player.setVelocityX(100);
    this.player.setVelocityY(-140);
  }

  _goPivot() {
    this.player.setVelocityX(0);
    this.player.play('pivot', true);
    this.player.setScale(0.6, 0.6)
  }

  _goTransport() {
    this.player.play('turn');
    this.player.setScale(0.4, 0.4)
    this.player.x += 1
  }

  _goIdle() {
    this.player.setVelocityX(0);
    this.player.play('turn');
  }

  update() {
    if (this.frameCounter > this.frameTotal) return
    
    const actionToFunction = {
      walk : this._goRight.bind(this),
      jump : this._goJump.bind(this),
      pivot: this._goPivot.bind(this),
      transport: this._goTransport.bind(this),
      idle: this._goIdle.bind(this),
    }
    // safety check
    if (!actionToFunction[this.name]) return
    
    // execute the action
    actionToFunction[this.name]()

    if (this.onUpdate) this.onUpdate()

    this.frameCounter += 1
  }

  isEnd() {
    return this.frameCounter >= this.frameTotal
  }

}


class ActionManager {

  constructor(
    actions = [], 
    context = { player: null, dockerLayer: null, pivotLayer: null }, 
    exitCallback = null
  ) {
    this.actions = actions
    this.state = {}
    this.moveCounter = 0
    this.context = context
    this.onExit = exitCallback
  }

  update(state = {pivotHit: false, exitHit: false}) {
    this.state = state
    // game complete!
    if (!this.actions.length) return

    this.moveCounter += 1 // lazy action execution counter
    // waiting for bingo calling repetition until last update
    if (this.moveCounter < 24) return

    const action = this.actions[0]
    // action running...
    action.update()

    if (!action.isEnd()) return // still need update current action

    // remove first action after it completion
    this.actions.shift()

    // pivot action, and hit the pivot trigger
    if (action.name === 'pivot' && this.state.pivotHit) {
      this.context.dockerLayer.setVisible(false)
      this.context.pivotLayer.setVisible(true)
      // insert next action: transport
      this.actions.unshift(new Action(
        this.context.player, 
        {transport: 2}, // move steps
        () => this.context.pivotLayer.x += 1
      ))
    }

    // reach the exit trigger
    if (action.name === 'jump' && this.state.exitHit) {
      this.actions.unshift(new Action(
        this.context.player,
        {walk: 0},
      ))
      this.actions.unshift(new Action(
        this.context.player,
        {idle: 1},
      ))
    }

    // end of all actions
    if (this.actions.length === 0 && this.state.exitHit) {
      if (this.onExit) this.onExit()
    }

  }

  isEnd() {
    return this.actions.length === 0
  }

}


class LavaAdventure extends Phaser.Scene {
  constructor(){
    super('LavaAdventure');
    // got the missing part of game from pthon code
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // tile layers
    this.background = null
    this.docker = null
    // motion counter
    this.moveCounter = 0
    // failed after player y > 180
    this.failed = false
    // actions to go
    this.actions = []
    // hit the pivot
    this.pivotHolded = false
    // hit the exit
    this.exitHitted = false
    // manager
    this.actionManager = null
  }

  init() {
    this.failed = false
  }

  preload(){
    this.load.image('sky', 'assets/skies/sunset.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/kenney_redux_64x64.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/lavaAdventure.json')
    this.load.spritesheet(
      'player', 
      'assets/sprites/player_tilesheet.png', 
      { frameWidth: 80, frameHeight: 110 }
    );
    
    this.load.audio('lose', 'assets/audio/arcade_resources_sounds_lose4.mp3');
  }
  
  create(){
    this.add.image(300, 102, 'sky')

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('adventure', 'tiles');

    this.background = map.createLayer('background', tiles, -40, -40);
    this.background.setCollision([2, 13,]) // 2: wall, 13: grass block, 96: exit
    this.exits = this.background.filterTiles(tile => tile.index === 96)
    
    this.docker = map.createLayer('docker', tiles, -40, -40)
    this.docker.setCollision([42, 54]) // road tiles
    this.pickups = this.docker.filterTiles(tile => tile.index === 190);

    this.pivoted = map.createLayer('pivoted', tiles, -40, -40)
    this.pivoted.setVisible(false) // hide first
    this.pivoted.setCollision([42, 54]) // road tiles

    this._createPlayer()
    this._createPlayerAnimation()

    // set layer collision
    this.physics.add.collider(this.background, this.player);
    this.physics.add.collider(this.docker, this.player);
    this.physics.add.collider(this.pivoted, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);
    this.loseSound = this.sound.add('lose')
  }

  _createPlayer() {
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

    this.anims.create({
      key: 'hold',
      frames: [ { key: 'player', frame: 11 } ],
      frameRate: 6
    });

    this.anims.create({
      key: 'pivot',
      frames: this.anims.generateFrameNumbers('player', { start: 13, end: 14 }),
      frameRate: 6,
      repeat: 1
    });

    this.anims.create({
      key: 'fall',
      frames: [ { key: 'player', frame: 4 } ],
      frameRate: 6
    });

  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(50, 20, message, { fill: '#ffff00', fontSize: 18 });
  }

  _goIdle() {
    this.player.setVelocityX(0);
    this.player.play('turn');
  }

  _goDrop() {
    this.player.play('fall');

    if (this.loseSound.isPlaying) return
    this.loseSound.play()
  }

  _gameFailed() {
    this.failed = true
    setTimeout(() => {
      this.scene.start(
        'gamefailed', 
        { scene: 'LavaAdventure'}
      )
    }, 200)
  }

  _hitPivot() {
    this.pivotHolded = true
  }

  _hitExit() {
    this.exitHitted = true
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
      return this.player.setVelocityY(-160);
    }
    this.player.setVelocityX(0);
    this.player.play('turn');

    if (this.exitHitted) {
      this._successHandler()
    }
  }

  /**
   * check collision before mannual and auto mode
   */
  _collisionCheck() {
    this.physics.world.overlapTiles(this.player, this.pickups, this._hitPivot, null, this);
    this.physics.world.overlapTiles(this.player, this.exits, this._hitExit, null, this);
  }

  /**
   * **********  GAME UPDATE CALLBACK  *************
   * @returns 
   */
  update(){
    if (this.failed || this.succeed) return

    if (this.player.y > 180) {
      return this._gameFailed()
    }

    if (this.player.y > 76) {
      return this._goDrop()
    }

    this._collisionCheck()

    // manual mode
    if (!this.actionManager || this.actionManager.isEnd()) {
      return this._manualControl()
    }

    // auto mode
    const state = {
      pivotHit: this.pivotHolded, 
      exitHit: this.exitHitted
    }
    this.actionManager.update(state)
  }

  _goStart() {
    // back to start
    this.player.setPosition(20, 60)
    this.pivotHolded = false
    this.docker.setVisible(true)
    this.pivoted.setVisible(false)
    this.pivoted.x = -40
    this._goIdle()
  }

  _successHandler() {
    this.succeed = true
    this.onGameSuccess()
    this.scene.start(
      'congratulations', 
      { msg: 'You completed the [Lava Adventure] project!'}
    )
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(steps = [], success) {
    // reset counter
    this.moveCounter = 0

    this._goStart()

    const actions = steps.map(
      step => new Action(this.player, step)
    )

    this.actionManager = new ActionManager(
      actions,
      {
        player: this.player,
        dockerLayer: this.docker,
        pivotLayer: this.pivoted,
      },
      this._successHandler.bind(this)
    )

    if (success) {
      this._createGuideText('Bingo! Move player with SPACE KEY to exit!')
    }

    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default LavaAdventure