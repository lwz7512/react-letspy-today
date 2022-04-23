---
title: Phaserjs Beginner Cheat Sheet
cover: assets/backgrounds/peek_md.png
download: pdf/cheatsheet_of_py_cheatsheets.pdf
description: |
  📌 Why should we take a look at Phaserjs, a javascript game engine when it comes to programming learning?
  📌 Well, investing in a popular HMTL5 Game engine like Phaserjs could make you have a better understanding the hood under some well-known online learning platform like `Prodigy` and `Scratch`. 
  📌 Moreover, web game is easy to get started and share with your friends, if you have great interests in game development and would like delve into this field, Phaserjs is a good starting point. 
  🍭 Actually, all the mini games in this website are made of Phaserjs game engine.
date: 2022/04/10
snippets: 
  template_game: |
    export const BaseConfig = {
      type: Phaser.AUTO,
      width: 600,
      height: 237,
      parent: 'phaser-game-box',
      banner: false,
    };
  game_config: |
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
  platformer_config: |
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

![template_game](cheatsheets/snippets/phaser_template_game.png)

## 5-Phaser Game Base Config

![game_config](cheatsheets/snippets/phaser_base_config.png)

## 6-Phaser Game Platformer Config

![platformer_config](cheatsheets/snippets/phaser_platformer_config.png)

## 7-Create Phaser Game Object

![game_object](cheatsheets/snippets/phaser_game_object.png)

## 8-Create Text function

![create_text](cheatsheets/snippets/phaser_create_text_function.png)

## 9-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 10-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 11-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 12-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 13-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 14-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 15-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 16-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 17-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 18-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 19-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

## 20-BLANK

![PLACEHOLDER](cheatsheets/snippets/carbon.png)

