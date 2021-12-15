import Phaser from 'phaser';

class LavaAdventure extends Phaser.Scene {
  constructor(){
    super('LavaAdventure');
    // build the missing part of game
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

    // actions
    this.actionWalk = [10, 20, 30, 40, 50, 90, 100, 110, 120, 130, 170, 180, 190, 200, 210]
    this.actionJump = [60, 70, 80, 140, 150, 160, ]
    this.actionGrow = [220, ]
  }

  preload(){
    this.load.image('sky', 'assets/skies/sunset.png');
    this.load.image('tiles', 'assets/tilemaps/tiles/kenney_redux_64x64.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/lavaAdventure.json')
    this.load.spritesheet('player', 'assets/sprites/player_tilesheet.png', { frameWidth: 80, frameHeight: 110 });
  }
  
  create(){
    this.add.image(300, 102, 'sky')

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('adventure', 'tiles');

    this.background = map.createLayer('background', tiles, -40, -40);
    this.background.setCollision([2, 13, 96]) // 2: wall, 13: grass block, 96: exit
    
    this.docker = map.createLayer('docker', tiles, -40, -40)
    this.docker.setCollision([42, 54, 178]) // 178: pivot

    this.pivoted = map.createLayer('pivoted', tiles, -40, -40)
    this.pivoted.setVisible(false)
    this.pivoted.setCollision([42, 54, 166]) // 166: pivoted

    this._createPlayer()
    this._createPlayerAnimation()

    // set layer collision
    this.physics.add.collider(this.background, this.player);
    this.physics.add.collider(this.docker, this.player);
    this.physics.add.collider(this.pivoted, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.removeCapture(32) // disable space key presss, conflict with monaco editor

    this.input.keyboard.on('keydown-SPACE', function() {
      this.complete = true
    }, this)
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(0, 0, 'player', 0);
    this.player.setBounce(0.2);
    this.player.setScale(0.4, 0.4)
    this.player.setCollideWorldBounds(true);
    // this.player.setDepth(1) // put front
  }

  _createPlayerAnimation() {
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 6
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 10, end: 11 }),
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

  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  _goRight() {
    this.player.setVelocityX(90);
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

  update(){
    if (!this.complete) return

    this.moveCounter += 1

    if (this.moveCounter % 10 !== 0) return

    // console.log(this.moveCounter)

    if (this.actionWalk.includes(this.moveCounter)) {
      return this._goRight()
    }

    if (this.actionJump.includes(this.moveCounter)) {
      return this._goJump()
    }

    if (this.actionGrow.includes(this.moveCounter)) {
      return this._goBigger()
    }

    this._goHold()


    // if (this.cursors.left.isDown) {
    //   this.player.setVelocityX(-160);
    //   this.player.anims.play('left', true);
    // } else if (this.cursors.right.isDown) { // walk right
    //   this.player.setVelocityX(80);
    //   this.player.anims.play('right', true);
    // } else if(!this.cursors.up.isDown) {
    //   this.player.setVelocityX(0);
    //   this.player.anims.play('turn');
    // }

    // if (this.cursors.up.isDown && this.player.body.blocked.down){
    //   this.player.anims.play('jump');
    //   this.player.setVelocityY(-160);
    // }
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

export default LavaAdventure