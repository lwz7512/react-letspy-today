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
    this.load.image('clock', 'assets/backgrounds/clock_yellow.png');
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

    this.ground = map.createLayer('background', tiles, -40, -10);
    this.ground.setCollision(58);
    this.ground.setScale(0.6, 0.6);

    this.decorations = map.createLayer('decorations', tiles, -40, -10);
    this.decorations.setScale(0.6, 0.6);

    this.miniClock = map.createLayer('clock', tiles, -40, -10)
    this.miniClock.setScale(0.6, 0.6)
    this.miniClock.setVisible(false)
    this.doorLayer = map.createLayer('door', tiles, -40, -10)
    this.doorLayer.setScale(0.6, 0.6)
    this.doorLayer.setVisible(false)

    this._createAnimation();
    this._createPlayer();
    this._createHunchbackMan();

    this.physics.add.collider(this.ground, this.player);
    this.physics.add.collider(this.ground, this.lord);

    this.cursors = this.input.keyboard.createCursorKeys();
    // // disable space key presss, conflict with monaco editor
    this.input.keyboard.removeCapture(32);

    var helpme = this._createDialog.bind(
      this, 320, 70, 230, 60, 
      [
        "Our church clock not working,",
        "mind to do me a favour? "
      ]
    )
    var response = this._createDialog.bind(this, 400, 130, 80, 30, ["Sure!"] )
    var close = this._closeDialog.bind(this)
    var completeHandler = this._dialogCompleteHandler.bind(this)
    this.dialogs = new DialogManager([
      {action: helpme, delay: 30},
      {action: response, delay: 200},
      {action: close, delay: 300},
    ], completeHandler)

    // create a clock
    this.clock = new RealClock(this, 250, 90)
    this._createGuideText('Walk toward the door keeper using RIGHT KEY!')
  }

  _dialogCompleteHandler() {
    this._createGuideText('')
    this.miniClock.setVisible(false)
    this.clock.popup()
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(320, 100, 'player');
    this.player.setBounce(0.2);
    this.player.setScale(0.4, 0.4);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(1)
  }

  _createHunchbackMan() {
    this.lord = this.physics.add.sprite(570, 100, 'hunchback');
    this.lord.setScale(0.6, 0.6);
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ff0000' });
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
      this.player.play('left', true);
      this.keyPressed = true
      return
    } else if (this.cursors.right.isDown) { // walk right
      this.player.setVelocityX(90);
      this.player.play('right', true);
      this.keyPressed = true
      return
    }

    var ySpeed = this.player.body.velocity.y
    var isStatic = Math.ceil(Math.abs(ySpeed)) === 1
    if (isStatic) this.player.play('turn');

    this.player.setVelocityX(0);
    this.keyPressed = false
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

  _createDialog(x, y, w, h, content) {
    this._closeDialog()

    var dialogX = x // 320
    var dialogY = y // 70
    var dialogW = w // 230
    var dialogH = h // 60
    var dialogR = 6

    if (this.dialogPanel) 
      this.dialogPanel.removeFromDisplayList()
    if (this.dialogTxt) 
      this.dialogTxt.removeFromDisplayList()

    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1);
    graphics.strokeRoundedRect(dialogX, dialogY, dialogW, dialogH, dialogR);
    graphics.fillStyle(0xffff00, 0.8);
    graphics.fillRoundedRect(dialogX, dialogY, dialogW, dialogH, dialogR);
    this.dialogPanel = graphics

    this.dialogTxt = this.add.text(
      dialogX+8, 
      dialogY+8, 
      content, 
      { fontFamily: 'Arial', color: '#000000'}
    );
    this.dialogTxt.setLineSpacing(6);
  }

  _closeDialog() {
    if (this.dialogPanel) 
      this.dialogPanel.removeFromDisplayList()
    if (this.dialogTxt) 
      this.dialogTxt.removeFromDisplayList()
    // this is the end of dialogs
    return true
  }

  _successHandler(){
    this.onGameSuccess()
    this.scene.start(
      'congratulations', 
      { msg: 'You completed the [Fix The Clock] project!'}
    )
  }


  update(){
    if (this.succeed) return
    
    this._manualControl()
    this.dialogs.update()
    this.clock.update()

    if (this.player.x > 500 && !this.complete) {
      this.player.setVelocityX(0);
      this.player.play('turn');
      // step back a little
      if (!this.keyPressed) {
        this.player.setX(500)
        this.dialogs.start()
      }
    }

    if (this.player.x > 520 && this.complete) {
      this.succeed = true
      this.player.setVelocityX(0)
      this.player.play('turn')
      this.player.setX(520)
      this._successHandler()
    }

  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(_, success) {
    if (!success) return

    this._createGuideText('Bingo! Enter the door to complete this game!')
    this.complete = true
    this.lord.setVisible(false)
    this.doorLayer.setVisible(true)

    // run clock
    this.clock.start()
    
    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}


class RealClock {

  constructor(scene, centerX, centerY) {
    this.scene = scene
    this.centerX = centerX
    this.centerY = centerY
    this.started = false
    this.frameCounter = 0
    this.visible = false
  }

  start(){
    if (!this.visible) return
    // if anwser right open this flag
    this.started = true
  }

  popup(){
    this.visible = true
    this.addBackgroundImage(this.scene, this.centerX)
    this.drawClock()
  }

  update(){
    if (!this.started) return

    this.frameCounter += 1
    if (this.frameCounter % 60 === 0) {
      this.drawClock()
    }
  }

  drawClock(){
    if (this.context) {
      this.context.clear()
    }
    this.context = this.scene.add.graphics()
    this.context.translateCanvas(this.centerX+90, this.centerY)
    var theDate = new Date();
    this.drawHourHand(theDate);
    this.drawMinuteHand(theDate);
    this.drawSecondHand(theDate);
  }
  
  addBackgroundImage(scene, centerX){
    if (this.clockFace) {
      this.clockFace.removeFromDisplayList()
    }
    this.clockFace = scene.add.image(0, 0, 'clock');
    this.clockFace.setOrigin(0, 0);
    this.clockFace.setScale(0.4, 0.4);
    this.clockFace.setX(centerX)
  }

  degreesToRadians(degrees) {
    return (Math.PI / 180) * degrees
  }

  drawHand(size, thickness = 4){
    this.context.beginPath()
    this.context.moveTo(0, 0)
    this.context.lineTo(-thickness, -10)
    this.context.lineTo(0, -size/2)
    this.context.lineTo(thickness, -10)
    this.context.lineTo(0, 0)
    this.context.fillPath()
    this.context.strokePath()
  }

  drawHourHand(theDate){
    var hours = theDate.getHours() + theDate.getMinutes() / 60;
    var degrees = (hours * 360 / 12) % 360;
    this.context.save();
    this.context.fillStyle(0x333333);
    this.context.lineStyle(1, 0x666666);
    
    var radians = this.degreesToRadians(degrees)
    this.context.rotateCanvas(radians);
    this.drawHand(110, 5);
    this.context.restore();
  }

  drawMinuteHand(theDate){
    var minutes = theDate.getMinutes() + theDate.getSeconds() / 60;
    this.context.save();
    this.context.fillStyle(0x333333);
    this.context.lineStyle(1, 0x666666);
    var radians = this.degreesToRadians(minutes * 6)
    this.context.rotateCanvas(radians);
    this.drawHand(130, 5);
    this.context.restore();
  }

  drawSecondHand(theDate){
    var seconds = theDate.getSeconds();
    this.context.save();
    this.context.fillStyle(0xff0000);
    this.context.lineStyle(1, 0x8B0000);
    var radians = this.degreesToRadians(seconds * 6)
    this.context.rotateCanvas(radians);
    this.drawHand(150);
    this.context.restore();
  }

}


class DialogManager {

  constructor(dialogs, onComplete){
    this.dialogs = dialogs
    this.frameCounter = 0
    this.isRunning = false
    this.completeHandler = onComplete
  }

  start(){
    this.isRunning = true
    this.frameCounter = 0
  }

  update(){
    if (!this.isRunning) return

    var dialogHandler = dialog => {
      if (dialog.delay !== this.frameCounter) return
      var isEnd = dialog.action()
      if (!isEnd) return
      this.stop()
    }
    this.dialogs.forEach(dialogHandler)
    this.frameCounter += 1
  }

  stop(){
    this.isRunning = false
    if (this.completeHandler) this.completeHandler()
  }

}

export default FixTheClock