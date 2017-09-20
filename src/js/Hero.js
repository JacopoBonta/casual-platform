define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hero {
        constructor(game, x, y, customSprite) {
            this.game = game;
            this.life = 100;
            this.gravity = 1400;
            this.speed = 100;
            this.fps = 10;
            this.posX = x || 32;
            this.posY = y || this.game.world.height - 200;
            this.setSprite(customSprite || 'hero');
        }
        setSprite(sprite) {
            this.sprite = this.game.add.sprite(this.posX, this.posY, sprite, 0);
            this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.fps, true);
            this.sprite.animations.add('run', [60, 61, 62, 63, 64, 65, 66, 67], this.fps, true);
            this.sprite.animations.add('jump', [12]);
            this.sprite.animations.add('mid air', [48, 49], this.fps, true);
            this.sprite.animations.add('landing', [24]);
            this.sprite.anchor.setTo(.5, .5);
            this.game.physics.arcade.enable(this.sprite);
            this.sprite.body.gravity.y = this.gravity;
            this.sprite.body.collideWorldBounds = false;
            this.sprite.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
        }
        isTouchingDown() {
            return this.sprite.body.touching.down;
        }
        collide(group) {
            return this.game.physics.arcade.collide(this.sprite, group);
        }
        goLeft() {
            this.sprite.scale.setTo(-1, 1);
            this.sprite.animations.play('run');
            this.sprite.body.velocity.x = this.speed * -1;
        }
        goRight() {
            this.sprite.scale.setTo(1, 1);
            this.sprite.animations.play('run');
            this.sprite.body.velocity.x = this.speed;
        }
        stand() {
            this.sprite.animations.play('idle');
            this.sprite.body.velocity.x = 0;
        }
        jump() {
            if (this.isTouchingDown()) {
                this.sprite.animations.play('jump');
                this.sprite.body.velocity.y = -350;
            }
        }
        fall() {
            if (!this.isTouchingDown()) {
                this.sprite.animations.play('mid air');
            }
            else {
                this.sprite.animations.play('landing');
            }
        }
    }
    exports.default = Hero;
});
