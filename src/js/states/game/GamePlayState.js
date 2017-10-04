define(["require", "exports", "states/StateAbstract", "characters/Hero", "Platformer"], function (require, exports, StateAbstract_1, Hero_1, Platformer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GamePlayState extends StateAbstract_1.default {
        init(difficult = 2) {
            if (difficult <= 0) {
                this.difficult = 1;
            }
            else if (difficult >= 10) {
                this.difficult = 10;
            }
            else {
                this.difficult = difficult;
            }
        }
        preload() {
            this.game.load.image('platform', 'assets/platform_1024x1024.png');
            this.game.load.image('background', 'assets/treesbackground.png');
            this.game.load.spritesheet('hero', 'assets/hero_spritesheet.png', 21, 40);
        }
        create() {
            this.levelStartPos = new Phaser.Point(0, this.world.height - 40);
            this.levelEndPos = new Phaser.Point(this.world.width - 1, this.world.height - 40);
            this.playerStartPos = new Phaser.Point(0, this.world.height - 40);
            let groundStart = new Phaser.Point(0, this.world.height - 21);
            let groundEnd = new Phaser.Point(this.world.width, this.world.height - 21);
            this.game.add.sprite(0, 0, 'background');
            this.ground = new Platformer_1.default(this.game, 'platform');
            this.ground
                .generatePlatform(groundStart, groundEnd, 10 - this.difficult)
                .setImmovable(true);
            this.hero = new Hero_1.default(this.game, this.playerStartPos);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.lifeText = this.game.add.text(32, 32, `Life: ${this.hero.getLife()}`, {
                font: 'Indie Flower',
                fontSize: 35,
                fontWeight: 'bold',
                fill: '#ff0044'
            });
            let levelText = this.game.add.text(this.world.centerX, 32, `The difficult for this level is ${this.difficult}`, {
                font: 'Indie Flower',
                fontSize: 26,
                fontWeight: 'bold',
                fill: '#ff0044'
            });
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
            if (player.getPos().x <= 0) {
                player.goRight();
            }
            else if (player.getPos().x >= this.game.world.width) {
                player.goLeft();
            }
            if (player.getPos().y >= this.game.world.height) {
                player.damage();
                this.updateLifeText();
                if (player.getLife() <= 0) {
                    this.game.state.clearCurrentState();
                    this.game.state.start("GameoverState");
                    return;
                }
                else {
                    this.game.camera.flash(0x000000, 200);
                    player.setPos(new Phaser.Point(0, this.world.height - 50));
                }
            }
            if (player.collidePoint(this.levelEndPos)) {
                console.log("Good job! You reach the end!");
                player.body.velocity.x = 0;
                this.game.state.clearCurrentState();
                this.game.state.start("GamePlayState", true, false, this.difficult + 1);
            }
        }
        render() {
            this.game.debug.geom(this.levelStartPos, 'rgba(255, 0, 0, 1)');
            this.game.debug.geom(this.levelEndPos, 'rgba(0, 255, 0, 1)');
        }
        updateLifeText() {
            this.lifeText.setText(`Life: ${this.hero.getLife()}`);
        }
    }
    exports.default = GamePlayState;
});
