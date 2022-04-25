import Phaser from 'phaser';


class SuperSoldier {

  constructor(soldier, lazyLaunch){
    this.soldier = soldier
    this.launchTime = lazyLaunch
    this.frameCounter = 0
    this.accelerator = 0
    this.outOfValley = false
  }

  update(){
    this.frameCounter += 1
    // waiting...
    if (this.frameCounter < this.launchTime) 
      return
    // out of top stage
    if (this.soldier.y < -30) {
      this.soldier.setVelocityY(0)
      this.outOfValley = true
      return
    }
    this.accelerator += 10
    this.soldier.setVelocityY(-90 - this.accelerator)
  }

  isFree(){
    return this.outOfValley
  }
}


class TroopsOnMyControl {

  constructor(successCallback){
    this.superSoldiers = null
    this.moveCounter = 0
    this.successHandler = successCallback
  }

  launch(soldiersInTrap){
    this.superSoldiers = []
    soldiersInTrap.forEach((soldier, index) => {
      this.superSoldiers.push(
        new SuperSoldier(soldier, index * 10)
      )
    })
  }

  update(){
    this.moveCounter += 1 // lazy action execution counter
    // waiting for bingo calling repetition until last update
    if (this.moveCounter < 24) return

    // fly all up
    let allset = true
    this.superSoldiers.forEach(soldier => {
      soldier.update()
      if (!soldier.isFree()) allset = false
    })

    if (allset) {
      this.successHandler()
    }
  }

  isEnd(){
    // let allset = true
    // this.superSoldiers.forEach(soldier => {
    //   if (!soldier.isFree()) allset = false
    // })
    // return allset
  }
}

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
    this.batteries = this.add.group();
    for (let i=2; i<=4; i++) {
      let btr = this.add.sprite(36+i*12, 20, 'battery', i)
      btr.setScale(0.4, 0.4)
      this.batteries.add(btr)
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

  _successHandler() {
    this.succeed = true
    this.onGameSuccess()
    this.scene.start(
      'congratulations', 
      { msg: 'You completed the [Free Your Troops] project!'}
    )
  }

  update(){
    if (!this.troops) return

    this.troops.update()
    this.player.play('blueAttack', true)
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
  bingo(troops, success) {
    if (!success) return
    // console.log(troops)

    this._createGuideText('Bingo!')

    // troops ready
    this.troops = new TroopsOnMyControl(
      this._successHandler.bind(this)
    )
    this.troops.launch(this.soldiers.getChildren())
    this.batteries.destroy(true, true)

    this.complete = true
    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default FlyThemUp