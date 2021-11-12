import Phaser from 'phaser';

class BouncingGame extends Phaser.Scene {
  constructor(image){
      super();
      this.image = image
  }

  preload(){
      this.load.image('logo', this.image);
  }
    
  create(){
      const logo = this.add.image(300, 20, 'logo');
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