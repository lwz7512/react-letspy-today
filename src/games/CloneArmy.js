import Phaser from 'phaser';

class Bullet extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture){
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0); // dynamic body
    this.setData('isDead', false);
    this.born = 0
    this.initY = y
  }

  // update position
  update(time, delta) {
    // moving...
    this.x += delta * 0.6
    this.y = this.initY // keep the bullet no gravity flying
  }

}

class Soldier extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, id){
    super(scene, x, y, texture, 0) // stand
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 1); // static body
    this.setData('id', id)
    this.setData('fired', false)
    this.setScale(0.6, 0.6);
  }

  fire() {
    if (this.getData('fired')) return null

    this.shootTimer = this.scene.time.addEvent({
      delay: 200,
      callback() {
        this.setFrame(2) // lazy Kneeling
        this.setData('fired', true) // lazy set fired
      },
      callbackScope: this,
      loop: false,
    });

    return new Bullet(this.scene, this.x, this.y, 'bullet')
  }

  update() {
    if (this.shootTimer === undefined) return
    if (this.shootTimer === null) return
    // lazy clear timer
    if (this.getData('fired')) {
      this.shootTimer.remove();
      this.shootTimer = null
    }
  }

}

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, id){
    super(scene, x, y, texture)
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0); // dynamic body
    this.setData('id', id)
    this.setData('isDead', false)
    this.setScale(0.8, 0.8)
    this.play('move')

    const colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];
    this.setTint(Phaser.Utils.Array.GetRandom(colors));
  }

  update(time, delta) {
    if (!this.getData('isDead')) {
      this.body.velocity.y = -5 // stand still
    } else {
      this.body.velocity.y = 100 // drop down...
    }
  }

}


class CloneArmy extends Phaser.Scene {
  constructor(){
    super('CloneArmy');
    // build the missing part of game
    this.complete = false
    // pass the game!
    this.succeed = false
    // dyna text
    this.guideTxt = null
    // expose bingo function
    this.bingo = this.bingo.bind(this)
    // soldiers column
    this.columnIndex = 0
    // shooting interval
    this.shootingInterval = 0
  }

  preload(){
    this.load.image('dude', 'assets/sprites/phaser-dude.png');
    this.load.image('vida', 'assets/sprites/darthvida_sm.png');
    this.load.image('bullet', 'assets/sprites/bullet5.png');
    this.load.spritesheet('soldier', 'assets/sprites/solider_yellow.png', { frameWidth: 48, frameHeight: 48});
    this.load.spritesheet('invader', 'assets/sprites/invader1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('boom', 'assets/sprites/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    this.load.audio('fire', 'assets/audio/blaster.mp3');
    this.load.audio('explosion', 'assets/audio/explosion.mp3');
  }
    
  create(){
    this.fireSound = this.sound.add('fire')
    this.explosionSound = this.sound.add('explosion')

    const move = {
        key: 'move',
        frames: 'invader',
        frameRate: 4,
        repeat: -1
    };
    const explode = {
        key: 'explode',
        frames: 'boom',
        frameRate: 36,
        hideOnComplete: true
    };
    this.anims.create(move);
    this.anims.create(explode);

    this.add.image(570, 30, 'dude');
    const vida = this.add.image(30, 32, 'vida');
    vida.setScale(0.8, 0.8);

    this.soldiers = this.add.group([], {runChildUpdate: true});
    this.enemies = this.add.group([], {runChildUpdate: true});
    this.playerLasers = this.add.group([], {runChildUpdate: true});

    // soldiers squad ...
    const rows = 4
    for (var i=0; i<5; i++) {
      for (var j=0; j<rows; j++) {
        var soldier = new Soldier(this, 20+i*20, 90+j*32, 'soldier', i*rows+j)
        this.soldiers.add(soldier);
      }
    }

    for (var m=0; m<10; m++) {
      for (var n=0; n<rows; n++) {
        var alien = new Enemy(this, 310+m*30, 90+n*32, 'invader', m*rows+n)
        this.enemies.add(alien)
      }
    }

    // fire by a column of soldiers
    this.input.keyboard.on('keydown-SPACE', function() {
      // if (!this.complete) return

      // control shooting inveral
      if (this.shootingInterval < 40) return

      // reset interval
      this.shootingInterval = 0

      const reversedSoilder = [...this.soldiers.getChildren()].reverse()
      const oneColumn = []
      reversedSoilder.forEach(soldier => {
        if (oneColumn.length === 4) return
        if (!soldier.getData('fired')) {
          oneColumn.push(soldier)
        }
      })

      if (oneColumn.length) {
        this.fireSound.play()
      }
      oneColumn.forEach(soldier => {
        const bullet = soldier.fire()
        if (bullet) {
          this.playerLasers.add(bullet)
        }
      })
    }, this);
    
    // collision detection
    this.physics.add.collider(this.enemies, this.playerLasers, function(enemy, bullet){
      this.explosionSound.play()
      // this.exploding = true
      bullet.destroy()

      enemy.setData('isDead', true)
      enemy.clearTint()
      enemy.play('explode')
      enemy.on('animationcomplete', function(){
        // this.exploding = false
        enemy.destroy() // destroy enemy later
      }, this)

    }, null, this)

  } // end of create

  _createTextBouncing() {
    this.tweens.add({
      targets: this.guideTxt,
      y: 30,
      duration: 500,
      repeat: 4,
      paused: false,
      yoyo: true
    });
  }

  _createGuideText(message, x=10, y=10) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(x, y, message, { fill: '#ffff00' });
  }

  update(time, delta){
    if (this.succeed) return
    // update interval
    this.shootingInterval += 1

    const completed = this.enemies.getChildren().length === 0
    if (!completed) return
    
    this.succeed = true
    // lazy change scene to congratulation!
    setTimeout(() => {
      this.onGameSuccess()
      this.scene.start(
        'congratulations', 
        { msg: 'You completed the [Clone Army] project!'}
      )
    }, 300)
  }

  /**
   * exposure to outeside of game
   * @returns nothing
   */
   bingo(bridge) {
    if (this.complete) return

    this._createGuideText('Bingo! press SPACE BAR to shoot those aliens.', 70, 20)
    this._createTextBouncing()
    // add more soliders...
    const rows = 4
    for (var i=5; i<10; i++) {
      for (var j=0; j<rows; j++) {
        var soldier = new Soldier(this, 20+i*20, 90+j*32, 'soldier', i*rows+j)
        this.soldiers.add(soldier);
      }
    }
    this.complete = true
    return this.complete
  }

  onGameSuccess() {
    this.game.events.emit('gamePass')
  }


}

export default CloneArmy