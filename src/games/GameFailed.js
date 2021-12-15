import Phaser from 'phaser';

class GameFailed extends Phaser.Scene {
  constructor(){
    super('gamefailed');
  }

  init(data) {
    this.lastScene = data.scene
  }

  preload(){
    // this.load.image('logo', 'assets/sprites/phaser3-logo-small.png');
  }
    
  create(){
    const message = 'Oops...you failed!'
    const guideTxt = this.add.text(180, 50, message, { fill: '#ffff00', fontSize: 24 });
    this.tweens.add({
      targets: guideTxt,
      y: 20,
      duration: 1000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
    // TODO: add 'RESTART' button 
    const backMessage = 'Press SPACE BAR to restart!'
    this.add.text(180, 120, backMessage, { fill: '#00ff00', fontSize: 16 })

    this.input.keyboard.on('keydown-SPACE', function() {
      this._restart()
    }, this)
  }

  update(){

  }

  _restart() {
    this.scene.start(this.lastScene)
  }

}

export default GameFailed