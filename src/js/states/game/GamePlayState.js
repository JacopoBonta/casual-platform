define(["require", "exports", "states/StateAbstract", "Hero"], function (require, exports, StateAbstract_1, Hero_1) {
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
            this.game.load.spritesheet('hero', 'assets/hero_spritesheet.png', 21, 40);
        }
        create() {
            this.printGameInfo();
            this.game.add.sprite(0, 0, 'background');
            this.generateGround();
            this.hero = new Hero_1.default(this.game);
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        update() {
            let player = this.hero;
            let cursors = this.cursors;
            let hitGround = player.collide(this.groundGroup);
            if (cursors.left.isDown) {
                player.goLeft();
            }
            else if (cursors.right.isDown) {
                player.goRight();
            }
            else {
                player.stand();
            }
            if (cursors.up.isDown && hitGround) {
                player.jump();
            }
            if (!hitGround) {
                player.fall();
            }
            if (player.sprite.y >= this.game.world.height) {
                this.game.state.clearCurrentState();
                this.game.state.start("GameoverState");
            }
        }
        render() {
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
    }
    exports.default = GamePlayState;
});
