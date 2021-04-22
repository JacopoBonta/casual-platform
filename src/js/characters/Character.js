define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Character {
        constructor(game) {
            this._spawnPos = new Phaser.Point(0, 0);
            this._life = 10;
            this._speed = 100;
            this._verticalSpeed = 350;
            this._gravity = 1400;
            this.game = game;
        }
        get game() {
            return this._game;
        }
        set game(game) {
            this._game = game;
        }
        get sprite() {
            return this._sprite;
        }
        set sprite(sprite) {
            this._sprite = sprite;
        }
        get body() {
            return this._body;
        }
        set body(body) {
            this._body = body;
        }
        get spawnPos() {
            return this._spawnPos;
        }
        set spawnPos(pos) {
            this._spawnPos = pos;
        }
        get life() {
            return this._life;
        }
        set life(life) {
            this._life = life;
        }
        get speed() {
            return this._speed;
        }
        set speed(speed) {
            this._speed = speed;
        }
        get verticalSpeed() {
            return this._verticalSpeed;
        }
        set verticalSpeed(verticalSpeed) {
            this._verticalSpeed = verticalSpeed;
        }
        get gravity() {
            return this._gravity;
        }
        set gravity(g) {
            this._gravity = g;
        }
        pos(p) {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            if (typeof p !== 'undefined') {
                this.body.position = p;
            }
            return this.body.position;
        }
        moveLeft(speed) {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            this.body.velocity.x = (speed || this.speed) * -1;
            return this;
        }
        moveRight(speed) {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            this.body.velocity.x = speed || this.speed;
            return this;
        }
        moveUp(speed) {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            this.body.velocity.y = (speed || this.verticalSpeed) * -1;
            return this;
        }
        moveDown(speed) {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            this.body.velocity.y = speed || this.verticalSpeed;
            return this;
        }
        stop() {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            this.body.velocity.x = 0;
            return this;
        }
        collide(obj) {
            if (!this.sprite) {
                throw new Error("Sprite is not defined");
            }
            return this.game.physics.arcade.collide(this.sprite, obj);
        }
        collidePoint(p) {
            if (!this.sprite) {
                throw new Error("Sprite is not defined");
            }
            return this.sprite.getBounds().contains(p.x, p.y);
        }
        damage(amount) {
            this.life -= amount || this.life;
            return this;
        }
    }
    exports.default = Character;
});
