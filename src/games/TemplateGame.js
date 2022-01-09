import Phaser from 'phaser';

class TemplateGame extends Phaser.Scene {
  constructor(){
    super('TemplateGame');
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
    this.load.image('logo', 'assets/sprites/phaser3-logo-small.png');
  }
    
  create(){
    const logo = this.add.image(300, 20, 'logo');
  //   logo.setScale(0.5, 0.5)
    this.tweens.add({
      targets: logo,
      y: 180,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }

  _createGuideText(message) {
    if (this.guideTxt) {
      this.guideTxt.removeFromDisplayList()
    }
    this.guideTxt = this.add.text(10, 10, message, { fill: '#ffff00' });
  }

  update(){

  }

  /**
   * exposure to outside of game
   * @returns nothing
   */
  bingo(bridge) {
    this._createGuideText('Bingo!')
    this.complete = true
    return this.complete
  }
  
  onGameSuccess() {
    this.game.events.emit('gamePass')
  }

}

export default TemplateGame