define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hero {
        constructor(game, x, y, customSprite) {
            this.game = game;
            this.life = 10;
            this.gravity = 1400;
            this.velocity = 100;
            this.fps = 10;
            this.posX = x || 32;
            this.posY = y || this.game.world.height - 200;
            this.setSprite(customSprite || 'hero');
        }
        getLife() {
            return this.life;
        }
        getSprite() {
            return this.sprite;
        }
        getPosX() {
            return this.posX;
        }
        getPosY() {
            return this.posY;
        }
        getVelocity() {
            return this.velocity;
        }
        getGravity() {
            return this.gravity;
        }
        getFps() {
            return this.fps;
        }
        setLife(life) {
            this.life = life;
            return this;
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
        setPosX(x) {
            this.posX = x;
            return this;
        }
        setPosY(y) {
            this.posY = y;
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
        setFps(fps) {
            this.fps = fps;
            return this;
        }
        isTouchingDown() {
            return this.getSprite().body.touching.down;
        }
        collide(group) {
            return this.game.physics.arcade.collide(this.getSprite(), group);
        }
        goLeft(velocity) {
            let hero = this.getSprite();
            hero.scale.setTo(-1, 1);
            hero.animations.play('run');
            hero.body.velocity.x = (velocity || this.getVelocity()) * -1;
            return this;
        }
        goRight(velocity) {
            let hero = this.getSprite();
            hero.scale.setTo(1, 1);
            hero.animations.play('run');
            hero.body.velocity.x = velocity || this.getVelocity();
            return this;
        }
        stand() {
            let hero = this.getSprite();
            hero.animations.play('idle');
            hero.body.setZeroVelocity();
            return this;
        }
        jump() {
            let hero = this.getSprite();
            if (this.isTouchingDown()) {
                hero.animations.play('jump');
                hero.body.velocity.y = -350;
            }
            return this;
        }
        fall() {
            let hero = this.getSprite();
            if (!this.isTouchingDown()) {
                hero.animations.play('mid air');
            }
            else {
                hero.animations.play('landing');
            }
            return this;
        }
        resetPosition(x, y) {
            let hero = this.getSprite();
            hero.body.x = this.getPosX();
            hero.body.y = this.getPosY();
            return this;
        }
        hit(damage) {
            let life = this.getLife();
            if (damage) {
                life -= Math.abs(damage);
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
