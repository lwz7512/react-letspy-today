import Phaser from 'phaser';

class AcrossLiveBridge extends Phaser.Scene {

  constructor(){
    super('AcrossLiveBridge');
    // got the missing part of game from pthon code
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // expose bingo function
    this.bingo = this.bingo.bind(this)
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
    
    this.layerGroup = this.add.group();
    for (let i=0; i<10; i++) {
      let layer = map.createLayer('layer_'+i, tiles, -20, -40);
      layer.setCollision([118, 119])
      this.layerGroup.add(layer)
    }

    this.physics.add.collider(this.layerGroup, this.player);
  }

  _createPlayer() {
    this.player = this.physics.add.sprite(0, 0, 'aliens');
    this.player.setBounce(0.2);
    this.player.setScale(0.6, 0.6);
    this.player.setCollideWorldBounds(true);
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
  

}

export default AcrossLiveBridge