define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Platformer {
        constructor(game, spriteKey) {
            this.game = game;
            this.sprite = spriteKey;
            this.group = this.game.add.group();
            this.blockSize = 20.48;
            this.blockScale = 0.02;
        }
        getGroup() {
            return this.group;
        }
        getSpriteKey() {
            return this.sprite;
        }
        getBlockSize() {
            return this.blockSize;
        }
        getBlockScale() {
            return this.blockScale;
        }
        setGroup(group) {
            this.group = group;
            return this;
        }
        setSpriteKey(spriteKey) {
            this.sprite = spriteKey;
            return this;
        }
        setBlockSize(size) {
            this.blockSize = size;
            return this;
        }
        setBlockScale(scale) {
            this.blockScale = scale;
            return this;
        }
        enableBody() {
            this.group.enableBody = true;
            if (this.group.length > 0) {
                this.game.physics.arcade.enable(this.group, true);
            }
            return this;
        }
        setImmovable(enable) {
            if (!this.group.enableBody) {
                this.enableBody();
            }
            this.group.forEach((block, isImmovable) => {
                block.body.immovable = isImmovable;
            }, this, false, enable);
            return this;
        }
        generatePlatform(start, end, factor = 10) {
            let blocksNumber = Phaser.Point.distance(start, end);
            let platform = [];
            let x = start.x;
            let y = start.y;
            let consecutive = 0;
            for (let i = 0; i < blocksNumber; i++) {
                if (i <= 1 || i >= blocksNumber - 1 || consecutive >= 2 || Math.floor(Math.random() * 10) <= factor) {
                    consecutive = 0;
                    let block = this.game.add.sprite(x, y, this.sprite);
                    block.scale.setTo(this.blockScale);
                    platform.push(block);
                }
                else {
                    consecutive++;
                }
                x += this.blockSize;
            }
            platform.forEach((block) => {
                this.group.add(block);
            });
            return this;
        }
        generatePlatformFromArray(x, y, array) {
            let blocksNumber = array.length;
            let platform = [];
            for (let i = 0; i < blocksNumber; i++) {
                let block = this.game.add.sprite(x, y - (array[i] * this.blockSize), this.sprite);
                block.scale.setTo(this.blockScale);
                platform.push(block);
                x += this.blockSize;
            }
            platform.forEach((block) => {
                this.group.add(block);
            });
            return this;
        }
    }
    exports.default = Platformer;
});
