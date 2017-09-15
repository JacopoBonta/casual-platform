define(["require", "exports", "states/StateAbstract"], function (require, exports, StateAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameoverState extends StateAbstract_1.default {
        preload() {
            this.game.load.image('gameover', 'assets/gameover.png');
        }
        create() {
            this.game.add.sprite(0, 0, 'gameover');
            let restartText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Restart');
            restartText.inputEnabled = true;
            restartText.events.onInputOver.add((item) => {
                document.body.style.cursor = 'pointer';
                item.addColor('#f00', 0);
            }, this);
            restartText.events.onInputDown.add((item) => {
                this.game.state.clearCurrentState();
                this.game.state.start('GamePlayState');
            }, this);
            restartText.events.onInputOut.add((item) => {
                document.body.style.cursor = 'default';
                item.clearColors();
            }, this);
        }
        update() {
        }
    }
    exports.default = GameoverState;
});
