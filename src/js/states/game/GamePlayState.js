define(["require", "exports", "states/StateAbstract", "Hero", "Platformer"], function (require, exports, StateAbstract_1, Hero_1, Platformer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GamePlayState extends StateAbstract_1.default {
        preload() {
            this.game.load.image('platform', 'assets/platform_1024x1024.png');
            this.game.load.image('background', 'assets/treesbackground.png');
            this.game.load.spritesheet('hero', 'assets/hero_spritesheet.png', 21, 40);
        }
        create() {
            this.printGameInfo();
            this.game.add.sprite(0, 0, 'background');
            this.ground = new Platformer_1.default(this.game, 'platform');
            this.ground
                .generatePlatform(0, this.world.bottom - 21, this.world.width / 21, 3)
                .generatePlatformFromArray(380, this.world.bottom - 21, [1, 2, 2, 3, 4, 5, 6, 7, 8])
                .generatePlatformFromArray(600, 400, [0, -1, -1, 0, 0, -1, -1])
                .setImmovable(true);
            this.hero = new Hero_1.default(this.game);
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        update() {
            let player = this.hero;
            let cursors = this.cursors;
            let hitGround = player.collide(this.ground.group);
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
            if (player.getSprite().y >= this.game.world.height) {
                player.hit();
                if (player.getLife() <= 0) {
                    this.game.state.clearCurrentState();
                    this.game.state.start("GameoverState");
                }
                else {
                    player.resetPosition();
                }
            }
        }
        render() {
        }
        printGameInfo() {
            console.log(`World height: ${this.game.world.height}\nWorld width: ${this.game.world.width}`);
        }
    }
    exports.default = GamePlayState;
});
