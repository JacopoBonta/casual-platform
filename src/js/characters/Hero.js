define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hero {
        constructor(game, x, y) {
            this.fps = 15;
            this.game = game;
            this.initialPos = new Phaser.Point(x || 32, y || 32);
            this.life = 10;
            this.velocity = 100;
            this.gravity = 1400;
            this.sprite = this.game.add.sprite(this.initialPos.x, this.initialPos.y, 'hero', 0);
            this.setupSprite();
            this.body = this.sprite.body;
            this.setupPhysiscs();
        }
        setupSprite() {
            this.sprite.anchor.setTo(.5, .5);
            this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.fps, true);
            this.sprite.animations.add('run', [60, 61, 62, 63, 64, 65, 66, 67], this.fps, true);
            this.sprite.animations.add('jump', [12]);
            this.sprite.animations.add('mid air', [48, 49], this.fps, true);
            this.sprite.animations.add('landing', [24]);
            this.game.physics.arcade.enable(this.sprite);
        }
        setupPhysiscs() {
            this.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
            this.body.gravity.y = this.getGravity();
            this.body.collideWorldBounds = false;
        }
        getLife() {
            return this.life;
        }
        getVelocity() {
            return this.velocity;
        }
        getGravity() {
            return this.gravity;
        }
        getPos() {
            return new Phaser.Point(this.body.x, this.body.y);
        }
        setLife(life) {
            this.life = life;
            return this;
        }
        setVelocity(velocity) {
            this.velocity = velocity;
            return this;
        }
        setGravity(g) {
            this.gravity = g;
            return this;
        }
        setPos(pos) {
            if (pos) {
                this.body.x = pos.x;
                this.body.y = pos.y;
            }
            else {
                this.body.x = this.initialPos.x;
                this.body.y = this.initialPos.y;
            }
            return this;
        }
        isTouchingDown() {
            return this.body.touching.down;
        }
        collide(obj) {
            return this.game.physics.arcade.collide(this.sprite, obj);
        }
        stand() {
            this.sprite.animations.play('idle');
            this.body.velocity.x = 0;
        }
        goLeft(velocity) {
            this.sprite.scale.setTo(-1, 1);
            this.sprite.animations.play('run');
            this.body.velocity.x = (velocity || this.getVelocity()) * -1;
        }
        goRight(velocity) {
            this.sprite.scale.setTo(1, 1);
            this.sprite.animations.play('run');
            this.body.velocity.x = velocity || this.getVelocity();
        }
        jump(verticalSpeed) {
            if (this.isTouchingDown()) {
                this.sprite.animations.play('jump');
                this.body.velocity.y = (verticalSpeed || 350) * -1;
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
        damage(amount) {
            let life = this.getLife();
            if (amount) {
                life -= Math.abs(amount);
            }
            else {
                life--;
            }
            this.setLife(life);
            return this;
        }
    }
    exports.default = Hero;
});
