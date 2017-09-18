define(["require", "exports", "states/StateAbstract"], function (require, exports, StateAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GamePlayState extends StateAbstract_1.default {
        constructor() {
            super(...arguments);
            this.scalePlatform = 0.02;
        }
        preload() {
            this.game.load.image('platform', 'assets/platform_1024x1024.png');
            this.game.load.image('background', 'assets/treesbackground.png');
            this.game.load.spritesheet('hero', 'assets/hero.png', 19, 34, 12);
        }
        create() {
            this.printGameInfo();
            this.game.add.sprite(0, 0, 'background');
            this.generateGround();
            this.createHero();
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        update() {
            let player = this.hero;
            let cursors = this.cursors;
            let hitPlatform = this.game.physics.arcade.collide(player, this.groundGroup);
            player.body.velocity.x = 0;
            if (cursors.left.isDown) {
                player.body.velocity.x = -100;
                player.scale.setTo(-1, 1);
            }
            else if (cursors.right.isDown) {
                player.body.velocity.x = 100;
                player.scale.setTo(1, 1);
            }
            else {
            }
            if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
                player.body.velocity.y = -350;
            }
        }
        render() {
            let platform = this.groundGroup.getAt(0);
            this.game.debug.spriteInfo(platform, 32, 32);
            this.game.debug.spriteBounds(platform);
            this.game.debug.spriteCoords(this.hero, this.game.world.width - 380, 32);
        }
        printGameInfo() {
            console.log(`World height: ${this.game.world.height}\nWorld width: ${this.game.world.width}`);
        }
        generateGround() {
            let worldLength = this.game.world.width;
            let blockSize = 20.48;
            let blocksNumber = Math.ceil(worldLength / blockSize);
            let platforms = [];
            let ground = this.groundGroup = this.game.add.group();
            ground.enableBody = true;
            let x = 0;
            let y = this.world.bottom - blockSize;
            for (let i = 0; i < blocksNumber; i++) {
                let platform = this.game.add.sprite(x, y, 'platform');
                platform.scale.setTo(this.scalePlatform);
                platforms.push(platform);
                x += blockSize;
            }
            platforms.forEach((platform) => {
                ground.add(platform);
            });
            ground.forEach((child, isImmovable) => {
                child.body.immovable = isImmovable;
            }, this, false, true);
        }
        createHero() {
            let hero = this.hero = this.game.add.sprite(32, this.game.world.height - 200, 'hero');
            hero.animations.add('idle');
            hero.animations.play('idle', 50, true);
            this.game.physics.arcade.enable(hero);
            hero.body.bounce.y = 0;
            hero.body.gravity.y = 1400;
            hero.body.collideWorldBounds = false;
        }
    }
    exports.default = GamePlayState;
});
