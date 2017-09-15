define(["require", "exports", "states/StateAbstract"], function (require, exports, StateAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GamePlayState extends StateAbstract_1.default {
        preload() {
            this.game.load.image('ground', 'assets/platform_48x48.bmp');
            this.game.load.image('background', 'assets/treesbackground.png');
            this.game.load.spritesheet('player', 'assets/stickman.png', 100, 120, 7);
        }
        create() {
            this.printGameInfo();
            this.game.add.sprite(0, 0, 'background');
            this.createGround(80, 80);
            this.createStickman();
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        update() {
            let hitPlatform = this.game.physics.arcade.collide(this.player, this.groundGroup);
            let player = this.player;
            let cursors = this.cursors;
            player.body.velocity.x = 0;
            if (cursors.left.isDown) {
                player.body.velocity.x = -200;
                player.scale.setTo(-1, 1);
                player.animations.play('left');
            }
            else if (cursors.right.isDown) {
                player.body.velocity.x = 200;
                player.scale.setTo(1, 1);
                player.animations.play('right');
            }
            else {
                player.animations.stop();
                player.frame = 3;
            }
            if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
                player.body.velocity.y = -350;
            }
            if (player.y >= this.game.world.height) {
                this.game.state.clearCurrentState();
                this.game.state.start("GameoverState");
            }
        }
        printGameInfo() {
            console.log(`World height: ${this.game.world.height}\nWorld width: ${this.game.world.width}`);
        }
        createGround(offsetX = 192, inequality = 0) {
            this.groundGroup = this.game.add.group();
            let ground = this.groundGroup;
            ground.enableBody = true;
            let platform = ground.create(0, this.game.world.height - 64, 'ground');
            platform.scale.setTo(3, 1);
            platform.body.immovable = true;
            let nextPlatformXPos = 144 + offsetX;
            while (nextPlatformXPos < this.game.world.width) {
                let offsetY = this.game.world.height - 64;
                if (inequality > 0) {
                    offsetY -= Math.floor(Math.random() * inequality);
                }
                let platformScaleX = Math.floor(Math.random() * (4 - 1) + 1);
                let platformLength = platformScaleX * 48;
                if (nextPlatformXPos + platformLength < this.game.world.width - 144) {
                    platform = ground.create(nextPlatformXPos, offsetY, 'ground');
                    platform.scale.setTo(platformScaleX, 1);
                    platform.body.immovable = true;
                }
                nextPlatformXPos += platformLength + offsetX;
            }
            platform = ground.create(this.game.world.width - 144, this.game.world.height - 64, 'ground');
            platform.scale.setTo(3, 1);
            platform.body.immovable = true;
        }
        createStickman() {
            this.player = this.game.add.sprite(32, this.game.world.height - 200, 'player');
            this.game.physics.arcade.enable(this.player);
            this.player.body.setSize(45, 73, 10, 30);
            this.player.anchor.setTo(.5, .5);
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 700;
            this.player.body.collideWorldBounds = false;
            this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 20, true);
            this.player.animations.add('right', [0, 1, 2, 3, 4, 5, 6], 20, true);
        }
    }
    exports.default = GamePlayState;
});
