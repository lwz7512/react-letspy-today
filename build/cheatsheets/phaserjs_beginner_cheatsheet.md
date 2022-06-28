---
title: Phaserjs Beginner Cheat Sheet
cover: /assets/backgrounds/peek_md.png
download: /pdf/phaserjs_cheatsheet.pdf
description: |
  📌 Why should we take a look at Phaserjs, a javascript game engine when it comes to programming learning?
  📌 Well, investing in a popular HMTL5 Game engine like Phaserjs could make you have a better understanding the hood under some well-known online learning platform like `Prodigy` and `Scratch`. 
  📌 Moreover, web game is easy to get started and share with your friends, if you have great interests in game development and would like delve into this field, Phaserjs is a good starting point. 
  🍭 Actually, all the mini games in this website are made of Phaserjs game engine.
date: 2022/04/10
snippets: 
  template_game: |
    class TemplateGame extends Phaser.Scene {
      constructor(){
        super('TemplateGame');
      }
      preload(){
        // loading image assets...
      }
      create(){
        // create game sprites
      }
      update(){
        // rendering changes loop
      }
    }
  game_config: |
    export const BaseConfig = {
      type: Phaser.AUTO,
      width: 600,
      height: 237,
      parent: 'phaser-game-box',
      banner: false,
    };
  platformer_config: |
    export const PlatformerConfig = {
      ...BaseConfig,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
    };
  game_object: |
    const withParentAndScene = {
      ...PlatformerConfig,
      scene: [currentGame, Congratulations, GameFailed]
    }
    const game = new Phaser.Game(withParentAndScene)
  create_text: |
    /**
    * create/update a text on screen
    *
    * @param {string} message text display
    * @param {int} x horizontal position
    * @param {int} y vertical position
    */
    _createGuideText(message, x=10, y=10) {
      if (this.guideTxt) {
        this.guideTxt.removeFromDisplayList()
      }
      const params = [
        x, y, message, { fill: '#ffff00' }
      ]
      this.guideTxt = this.add.text(...params);
    }
  preload_game_assets: |
    preload(){
      // load bullet image
      this.load.image('bullet', 'assets/sprites/bullet5.png');
      // define solder sprite
      const soldierInfo = [
        'soldier', 
        'assets/sprites/solider_yellow.png', 
        { frameWidth: 48, frameHeight: 48}
      ]
      // load soldier sprite
      this.load.spritesheet(...soldierInfo);
      // load fire sound
      this.load.audio('fire', 'assets/audio/blaster.mp3');
    }
  create_animation: |
    preload(){
      const explosion = [
        'boom', 'assets/sprites/explosion.png', 
        { frameWidth: 64, frameHeight: 64, endFrame: 23 }
      ]
      this.load.spritesheet();
    }
    create(){
      const explode = {
        key: 'explode', frames: 'boom',
        frameRate: 36, hideOnComplete: true
      };
      this.anims.create(explode);
    }
  listen_mouse_keyboard: |
    create(){
      // enable mouse click
      this.input.on('pointerdown', function() {
        // do something while click on game stage
      })
      // enable keyboard operation
      this.cursors = this.input.keyboard.createCursorKeys();
      // disable space key presss, conflict with monaco editor
      this.input.keyboard.removeCapture(32);
    }
  player_move_by_keyboard: |
    update(){
      if (this.cursors.left.isDown) {
        // player walk left
        return
      } else if (this.cursors.right.isDown) {
        // player walk right
        return
      } else if (this.cursors.up.isDown){
        // player jump
        return
      }
    }
  collision_detection: |
    create(){
      const groupMeta = [[], {runChildUpdate: true}]
      this.enemies = this.add.group(...groupMeta);
      this.playerLasers = this.add.group(...groupMeta);
      // collision detection
      this.physics.add.collider(
        this.enemies, this.playerLasers, 
        function(enemy, bullet){
          // explosion sound play
          // destroy enemy, bullet
        }, null, this
      )
    }
  create_bouncing_text: |
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
  lazy_todo_something: |
    create(){
      this.time.addEvent({
        delay: 200,
        callback() {
          // do something...
        },
        callbackScope: this,
        loop: false,
      })
    }
  create_tilemap_layer: |
    preload(){
      const tilesSrc = [
        'tiles', 'assets/tilemaps/tiles/kenney_redux_64x64.png'
      ]
      const mapSrc = [
        'map', 'assets/tilemaps/maps/lavaAdventure.json'
      ]
      this.load.image(...tilesSrc);
      this.load.tilemapTiledJSON(...mapSrc);
    }
    create(){
      var map = this.make.tilemap({ key: 'map' });
      var tiles = map.addTilesetImage('adventure', 'tiles');
      this.background = map.createLayer('background', tiles, 0, 0);
    }
  create_player_sprite: |
    preload(){
      this.load.spritesheet(
        'player', 
        'assets/sprites/player_tilesheet.png', 
        { frameWidth: 80, frameHeight: 110 }
      );
    }
    _createPlayer(){
      this.player = this.physics.add.sprite(20, 0, 'player', 0);
      this.player.setBounce(0.2);
      this.player.setScale(0.4, 0.4);
      this.player.setCollideWorldBounds(true);
      this.player.setDepth(1)
    }
  create_player_anim: |
    _createPlayerAnimation() {
      this.anims.create({
          key: 'turn',
          frames: [ { key: 'player', frame: 0 } ],
          frameRate: 6
      });
      const goLeft = ['player', { start: 10, end: 9 }]
      this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers(...goLeft),
          frameRate: 6,
          repeat: -1
      });
      const goRight = ['player', { start: 9, end: 10 }]
      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers(...goRight),
          frameRate: 6,
          repeat: -1
      });
    }
  hit_exit_check: |
    create(){
      // 2: wall, 13: grass block, 96: exit
      this.background.setCollision([2, 13,])
      const doorFilter = tile => tile.index === 96
      this.exits = this.background.filterTiles(doorFilter)
    }
    _hitExitCheck(){
      const overlapParams = [
        this.player, this.exits, this._hitExit, null, this
      ]
      this.physics.world.overlapTiles(overlapParams);
    }
  close_enough_check: |
    /**
    * touch enough to consider a real hit
    * @param {Sprite} player 
    * @param {Tile} tile 
    * @param {Number} distance 
    * @returns true or false
    */
    _closeEnough(player, tile, distance, tileWidth = 32) {
      var tx = tile.x * tileWidth + tileWidth/2
      var px = player.body.center.x
      var horiDifference = Math.round(Math.abs(tx - px))
      return distance > horiDifference
    }
  PLACEHOLDER: |
    // ......
  more: |
    ...
---


# Phaserjs Beginner Cheat Sheet

## 1-Phaser Cheatsheet

[Phaser Cheatsheet](https://gist.github.com/woubuc/6ef002051aeef453a95b)

[Cheat sheet for the Phaser 2.4.4 API](https://phaser.io/news/2015/12/phaser244-cheatsheet)

## 2-Phaser Quick Guide

[Phaser Quick Guide](https://www.codecademy.com/article/phaser-quick-guide)

[Phaser starter project](https://github.com/photonstorm/phaser3-project-template)

## 3-Notes of Web Game

[Notes of Phaser 3](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/)

[How to Make an HTML5 Game](https://gamedevacademy.org/how-to-make-a-html5-game/)

[Prodigy Game](https://www.prodigygame.com/main-en/)

[Scratch](https://scratch.mit.edu/)


## 4-Game Scene Skeleton

![template_game](/cheatsheets/snippets/phaser_template_game.png)

## 5-Phaser Game Base Config

![game_config](/cheatsheets/snippets/phaser_base_config.png)

## 6-Phaser Game Platformer Config

![platformer_config](/cheatsheets/snippets/phaser_platformer_config.png)

## 7-Create Phaser Game Object

![game_object](/cheatsheets/snippets/phaser_game_object.png)

## 8-Create Text function

![create_text](/cheatsheets/snippets/phaser_create_text_function.png)

## 9-Preload Game Assets

![preload_game_assets](/cheatsheets/snippets/phaser_preload_assets.png)

## 10-Create Explosion Animation

![create_animation](/cheatsheets/snippets/phaser_create_animation.png)

## 11-Listen Mouse and Keyboard

![listen_mouse_keyboard](/cheatsheets/snippets/phaser_listen_mouse_keyboard.png)

## 12-Player Move by Keyboard

![player_move_by_keyboard](/cheatsheets/snippets/player_move_by_keyboard.png)

## 13-Shoot Enemy Detection

![collision_detection](/cheatsheets/snippets/phaser_collision_detection.png)

## 14-Create Bouncing Text

![create_bouncing_text](/cheatsheets/snippets/phaser_create_bouncing_text.png)

## 15-Lazy todo Something

![lazy_todo_something](/cheatsheets/snippets/phaser_delay_todo_something.png)

## 16-Create Tilemap and Layer

![create_tilemap_layer](/cheatsheets/snippets/phaser_create_tilemap_layer.png)

## 17-Create Player Sprite

![create_player_sprite](/cheatsheets/snippets/phaser_create_player.png)

## 18-Create Player Animation

![create_player_anim](/cheatsheets/snippets/phaser_create_player_anim.png)

## 19-Hit Exit Check

![hit_exit_check](/cheatsheets/snippets/phaser_hit_exit_check.png)

## 20-Close Enough Check

![close_enough_check](/cheatsheets/snippets/phaser_close_enough_check.png)

