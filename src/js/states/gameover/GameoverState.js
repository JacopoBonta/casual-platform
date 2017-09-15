define(["require", "exports", "states/StateAbstract"], function (require, exports, StateAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameoverState extends StateAbstract_1.default {
        preload() {
            this.game.load.image('gameover', 'assets/gameover.png');
        }
        create() {
            this.game.add.sprite(0, 0, 'gameover');
        }
        update() {
        }
    }
    exports.default = GameoverState;
});
