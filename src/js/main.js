"use strict";
/**
 * The main script of the game.
 * It coordinates the all the game objects thanks to the Phaser game engine.
 * Up to date API reference: https://photonstorm.github.io/phaser-ce/
 */

 /**
  * Global variables.
  */
var groundGroup;

const game = new Phaser.Game(800 * 2, 600, Phaser.AUTO, 'game', {
  // It is called first and used to load game assets
  preload() {
    game.load.image('groundSprite', 'assets/platform.png');
    game.load.image('groundSpriteStart', 'assets/platform-start.png');
    game.load.image('groundSpriteEnd', 'assets/platform-end.png');
  },
  // Called once after preload(). Use it for various initializatoin of the current state.
  create() {
    printGameInfo();

    createGround({
      offset: 80,
      inequality: 80
    });

  },
  // After create() completes this function is called once per frame. We refere to it as the game loop.
  update() {

  }
});

function printGameInfo() {
  console.log(`World height: ${game.world.height}\nWorld width: ${game.world.width}`);
}

/**
 * Populate the ground with platforms.
 * Start platform and end platform have a fixed width of 3 blocks.
 * Middle platforms have a random width between 1 and 4 blocks.
 * 
 * ps: a platform is made by blocks; a single block measure 48*48 px.
 */
function createGround(conf = {}) {
  let platform;
  let offsetX = conf.offset || 192;
  let inequality = conf.inequality || 0;
  let nextPlatformXPos;
  
  // Create a group where to add platforms for the ground
  groundGroup = game.add.group();
  groundGroup.enableBody = true;
  
  // Place starting platform
  platform = groundGroup.create(0, game.world.height - 64, 'groundSpriteStart');
  platform.scale.setTo(3, 1);
  platform.body.immovable = true;
  nextPlatformXPos = 144 + offsetX;
  
  // Place the middle platforms
  while(nextPlatformXPos < game.world.width) {
    let offsetY = game.world.height - 64;
    if (inequality > 0) {
      offsetY -= Math.floor(Math.random() * inequality);
    }
    // How much scale a signle block
    let platformScaleX = Math.floor(Math.random() * (4 - 1) + 1);
    let platformLength = platformScaleX * 48;
    
    if (nextPlatformXPos + platformLength < game.world.width - 144) {
      platform = groundGroup.create(nextPlatformXPos, offsetY, 'groundSprite');
      platform.scale.setTo(platformScaleX, 1);
      platform.body.immovable = true;
    }    
    
    nextPlatformXPos += platformLength + offsetX;
  }

  // Place ending platform
  platform = groundGroup.create(game.world.width - 144, game.world.height - 64, 'groundSpriteEnd');
  platform.scale.setTo(3, 1);
  platform.body.immovable = true;

}