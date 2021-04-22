define(["require", "exports", "characters/Character"], function (require, exports, Character_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enemy extends Character_1.default {
        constructor(game, pos, life, speed, gravity) {
            super(game);
            this.spawnPos = pos;
            this.life = life;
            this.speed = speed;
            this.gravity = gravity;
            this.sprite = this.game.add.sprite(this.spawnPos.x, this.spawnPos.y, 'enemy', 0);
            this.game.physics.arcade.enable(this.sprite);
            this.body = this.sprite.body;
            this.setupBody();
        }
        setPos(p) {
            if (!this.body) {
                throw new Error("Body is not defined");
            }
            this.body.position = p;
            return this;
        }
        setupBody() {
            this.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
            this.body.gravity.y = this.gravity;
            this.body.collideWorldBounds = false;
        }
    }
    exports.default = Enemy;
});
