import Phaser from 'phaser';

class Congratulations extends Phaser.Scene {

  constructor(){
    super('congratulations');
  }

  init(data) {
    this.message = data.msg
  }

  preload() {
    this.load.image('sparkBlue', 'assets/particles/blue.png');
    this.load.image('sparkGreen', 'assets/particles/green.png');
    this.load.image('sparkRed', 'assets/particles/red.png');
    this.load.image('sparkYellow', 'assets/particles/yellow.png');
    this.load.audio('levelup', 'assets/audio/nextLevel.mp3');
  }

  _createGuideText(message = 'Congratulations') {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    var xPos = (600 - (message.length) * 10) / 2
    this.guideTxt = this.add.text(xPos, 40, message, { fill: '#00ff00' });
  }

  
  create() {

    this._createGuideText(this.message)
    
    //  First create a particle manager
    //  A single manager can be responsible for multiple emitters
    //  The manager also controls which particle texture is used by _all_ emitter
    var texture = Phaser.Utils.Array.GetRandom(['sparkBlue', 'sparkGreen', 'sparkRed', 'sparkYellow'])
    var particles = this.add.particles(texture);

    particles.createEmitter({
      x: 300,
      y: 200,
      scale: { start: 0.3, end: 0 },
      speed: { min: 200, max: 300 },
      lifespan: 2000,
      angle: { min: 245, max: 300 },
      gravityY: 200,
      blendMode: 'ADD',
    });

    this.levelupSound = this.sound.add('levelup')
    this.levelupSound.play()
  }

  update(){

  }
}

export default Congratulations