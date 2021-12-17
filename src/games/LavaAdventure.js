import Phaser from 'phaser';

class LavaAdventure extends Phaser.Scene {
  constructor(){
    super('LavaAdventure');
    // got the missing part of game from pthon code
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // expose bingo function
    this.bingo = this.bingo.bind(this)
    // tile layers
    this.background = null
    this.docker = null
    // motion counter
    this.moveCounter = 0
    // failed after player y > 180
    this.failed = false
    // steps to go
    this.steps = []
    // actions
    this.actionWalk = [
      10, 20, 30, 40, 50, 90, 100, 110, 120, 130, 170, 180, 190, 200, 
      610, 620, 630, 640, 650, 660, 670, 680, 
    ]
    this.actionJump = [60, 70, 80, 140, 150, 160, ]
    this.actionGrow = [220, ]
    this.actionHold = [230, 240, 250, ]
    this.actionPivot= [260, 270, ]
    this.actionTrans= [
      280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 
      430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570,
      580, 590,
    ]
    this.actionReach= [600, ]
    this.actionExit = [700, ]
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
    
    this.docker = map.createLayer('docker', tiles, -40, -40)
    this.docker.setCollision([42, 54, 178]) // 178: pivot

    this.pivoted = map.createLayer('pivoted', tiles, -40, -40)
    this.pivoted.setVisible(false)
    this.pivoted.setCollision([42, 54]) // 166: pivoted

    this.reached = map.createLayer('reached', tiles, -40, -40)
    this.reached.setVisible(false)
    this.reached.setCollision([42, 54])

    this._createPlayer()
    this._createPlayerAnimation()
    this._creatActionsMap()

    // set layer collision
    this.physics.add.collider(this.background, this.player);
    this.physics.add.collider(this.docker, this.player);
    this.physics.add.collider(this.pivoted, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);

    // this.input.keyboard.on('keydown-SPACE', function() {
    //   this.complete = true
    // }, this);

    this.loseSound = this.sound.add('lose')
  }

  _creatActionsMap() {
    // make a frame:action map
    this.completePassActions = {}
    this.actionWalk.forEach(frame => this.completePassActions[frame] = 'w')
    this.actionJump.forEach(frame => this.completePassActions[frame] = 'j')
    this.actionGrow.forEach(frame => this.completePassActions[frame] = 'g')
    this.actionHold.forEach(frame => this.completePassActions[frame] = 'h')
    this.actionPivot.forEach(frame => this.completePassActions[frame] = 'p')
    this.actionTrans.forEach(frame => this.completePassActions[frame] = 't')
    this.actionReach.forEach(frame => this.completePassActions[frame] = 'r')
    this.actionExit.forEach(frame => this.completePassActions[frame] = 'e')
  }

  _checkIn(frame) {
    const actionAbbr = this.completePassActions[frame]
    if (!actionAbbr) return this._goIdle.bind(this)
    
    const actionToFunction = {
      w : this._goRight.bind(this),
      j : this._goJump.bind(this),
      g : this._goBigger.bind(this),
      h : this._goHold.bind(this),
      p : this._goPivot.bind(this),
      t : this._goTransport.bind(this),
      r : this._goReached.bind(this),
      e : this._goExit.bind(this),
    }
    return actionToFunction[actionAbbr]
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(0, 0, 'player', 0);
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
      frames: [ { key: 'player', frame: 14 } ],
      frameRate: 6
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
    this.guideTxt = this.add.text(250, 20, message, { fill: '#ffff00', fontSize: 18 });
  }

  _goRight() {
    this.player.setVelocityX(92);
    this.player.anims.play('right', true);
  }

  _goJump() {
    this.player.anims.play('jump');
    this.player.setVelocityY(-160);
  }

  _goIdle() {
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
  }

  _goHold() {
    this.player.setVelocityX(0);
    this.player.anims.play('hold');
  }

  _goBigger() {
    this.player.setScale(0.8, 0.8)
    this.player.y -= 30
  }

  _goPivot() {
    this.player.anims.play('pivot');
    this.player.setScale(0.4, 0.4)
    this.docker.setVisible(false)
    this.pivoted.setVisible(true)
  }

  _goTransport() {
    this.player.anims.play('turn');
    this.player.x += 4
    this.pivoted.x += 4
  }

  _goReached() {
    this.pivoted.setVisible(false)
    this.reached.setVisible(true)
  }

  _goExit() {
    this.succeed = true
    // lazy change scene to congratulation!
    setTimeout(() => {
      this.onGameSuccess()
      this.scene.start(
        'congratulations', 
        { msg: 'You completed the [Lava Adventure] project!'}
      )
    }, 300)
  }

  _goDrop() {
    this.player.anims.play('fall');

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

  _manualControl() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      return this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) { // walk right
      this.player.setVelocityX(80);
      return this.player.anims.play('right', true);
    }
    if (this.cursors.up.isDown){
      this.player.anims.play('jump');
      return this.player.setVelocityY(-160);
    }
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
  }

  update(){
    if (this.failed || this.succeed) return

    if (this.player.y > 180) {
      return this._gameFailed()
    }

    if (this.player.y > 76) {
      return this._goDrop()
    }

    if (!this.complete) {
      return this._manualControl()
    }

    this.moveCounter += 1

    if (this.moveCounter % 10 !== 0) return

    // Successful action
    this._checkIn(this.moveCounter)()

  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(_, success) {
    if (this.complete) return

    if (!success) return // success is a must

    this._createGuideText('Bingo!')

    this.complete = true
    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }


}

export default LavaAdventure