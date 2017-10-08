define(["require", "exports", "characters/Character"], function (require, exports, Character_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hero extends Character_1.default {
        constructor(game, pos, life, speed, gravity) {
            super(game);
            this._fps = 15;
            if (pos) {
                this.spawnPos = pos;
            }
            if (life) {
                this.life = life;
            }
            if (speed) {
                this.speed = speed;
            }
            if (gravity) {
                this.gravity = gravity;
            }
            this.sprite = this.game.add.sprite(this.spawnPos.x, this.spawnPos.y, 'hero', 0);
            this.sprite.scale.setTo(1.25, 1.25);
            this.setupSprite();
            this.game.physics.arcade.enable(this.sprite);
            this.body = this.sprite.body;
            this.setupPhysiscs();
        }
        get fps() {
            return this._fps;
        }
        set fps(fps) {
            this._fps = fps;
        }
        setupSprite() {
            this.sprite.anchor.setTo(.5, .5);
            this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.fps, true);
            this.sprite.animations.add('run', [60, 61, 62, 63, 64, 65, 66, 67], this.fps, true);
            this.sprite.animations.add('jump', [12]);
            this.sprite.animations.add('mid air', [48, 49], this.fps, true);
            this.sprite.animations.add('landing', [24]);
        }
        setupPhysiscs() {
            this.body.gravity.y = this.gravity;
            this.body.collideWorldBounds = false;
        }
        isTouchingDown() {
            return this.body.touching.down;
        }
        collide(obj) {
            return this.game.physics.arcade.collide(this.sprite, obj);
        }
        collidePoint(point) {
            return this.sprite.getBounds().contains(point.x, point.y);
        }
        stand() {
            this.sprite.animations.play('idle');
            this.stop();
        }
        left(velocity) {
            this.sprite.scale.setTo(-1.25, 1.25);
            this.sprite.animations.play('run');
            this.moveLeft(velocity);
        }
        right(velocity) {
            this.sprite.scale.setTo(1.25, 1.25);
            this.sprite.animations.play('run');
            this.moveRight(velocity);
        }
        jump(verticalSpeed) {
            if (this.isTouchingDown()) {
                this.sprite.animations.play('jump');
                this.moveUp(verticalSpeed);
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
            this.life -= Math.abs(amount) || 1;
            return this;
        }
    }
    exports.default = Hero;
});
