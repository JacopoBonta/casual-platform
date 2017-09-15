define(["require", "exports", "states/StateAbstract"], function (require, exports, StateAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameStartState extends StateAbstract_1.default {
        preload() {
            this.game.load.image('background', 'assets/treesbackground.png');
        }
        create() {
            this.game.add.sprite(0, 0, 'background');
            this.game.add.text(this.game.width / 2.5, 20, 'Casual Platform');
            let startText = this.game.add.text(this.game.world.centerX - 10, this.game.world.centerY - 0.5, 'Start');
            startText.inputEnabled = true;
            startText.events.onInputOver.add((item) => {
                document.body.style.cursor = 'pointer';
                item.addColor('#f00', 0);
            }, this);
            startText.events.onInputDown.add(() => {
                document.body.style.cursor = 'default';
                this.game.state.clearCurrentState();
                this.game.state.start('GamePlayState');
            });
            startText.events.onInputOut.add((item) => {
                document.body.style.cursor = 'default';
                item.clearColors();
            }, this);
        }
        update() { }
    }
    exports.default = GameStartState;
});
