import Phaser from 'phaser';

class BouncingGame extends Phaser.Scene {
  // constructor(){
  //     super();
  // }

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
}

export default BouncingGame