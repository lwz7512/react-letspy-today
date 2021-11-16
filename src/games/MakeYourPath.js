import Phaser from 'phaser';

class MakeYourPath extends Phaser.Scene {
  // constructor(){
  //   super();
  // }

  preload(){
    this.load.image('tileskenney', 'assets/tilemaps/tiles/kenney_redux_64x64.png');
    this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
  }
    
  create(){
    // Load a map from a 2D array of tile indices
    var level = [
      [ 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, ], // - row blank
      [ 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, ], // - row blank
      [ 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 107, 151, ], // - row blank
      [ 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12, 107, 12,  ], // - ** path row **
      [ 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, 107, 1, ], // - row blank
      [ 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, ], // - row lava
    ]

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    var map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64 });

    var tiles = map.addTilesetImage('tileskenney');
    var groundLayer = map.createLayer(0, tiles, 0, 12);
    groundLayer.setScale(0.5, 0.5);
    // groundLayer.setCollisionByProperty({ collides: true });
    groundLayer.setCollision(12) // 12 is the first tile id of path row

    this.player = this.physics.add.sprite(0, 0, 'dude');
    this.player.setBounce(0.2);
    this.player.setScale(0.8, 0.8)
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, groundLayer);

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

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(){

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(80);
        this.player.anims.play('right', true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(-230);
    }

  }
}

export default MakeYourPath