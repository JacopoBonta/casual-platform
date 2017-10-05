define(["require", "exports", "states/StateAbstract"], function (require, exports, StateAbstract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameStartState extends StateAbstract_1.default {
        preload() {
            this.game.load.image('background', 'assets/backgrnd_vapor02.png');
        }
        create() {
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.fullscreenBtn = this.input.keyboard.addKey(Phaser.KeyCode.F1);
            this.fullscreenBtn.onDown.add(goFullscreen, this);
            this.game.add.sprite(0, 0, 'background');
            let startText = this.game.add.text(30, 150, 'PRESS START', {
                font: 'VCR OSD MONO',
                fontSize: 28,
                fill: '#8795E8'
            });
            startText.inputEnabled = true;
            startText.events.onInputOver.add((item) => {
                document.body.style.cursor = 'pointer';
                item.addColor('#94D0FF', 0);
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
    function goFullscreen() {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
        else {
            this.game.scale.startFullScreen(false);
        }
    }
});
