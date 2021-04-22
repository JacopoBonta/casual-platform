/**
 * 
 */
import State from "states/StateAbstract";

export default class GameStartState extends State {
    private fullscreenBtn :Phaser.Key;

    preload() {
        this.game.load.image('background', 'assets/backgrnd_vapor02.png');
    }
    create() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.fullscreenBtn = this.input.keyboard.addKey(Phaser.KeyCode.F1)
        this.fullscreenBtn.onDown.add(goFullscreen, this);
        
        this.game.add.sprite(0, 0, 'background');

        /* this.game.add.text(this.game.width / 2.5, 20, 'Casual Platform', {
            font: 'monospace',
            fontSize: 35,
            fill: '#C774E8'
        }); */
        
        let startText = this.game.add.text(30, 150, 'PRESS START', {
            font: 'VCR OSD MONO',
            fontSize: 28,
            fill: '#8795E8'
        });
        startText.inputEnabled = true;

        startText.events.onInputOver.add((item :Phaser.Text) => {
            document.body.style.cursor = 'pointer';
            item.addColor('#94D0FF', 0);
        }, this);
        startText.events.onInputDown.add(() => {
            document.body.style.cursor = 'default';
            this.game.state.clearCurrentState();
            this.game.state.start('GamePlayState');
        });
        startText.events.onInputOut.add((item :Phaser.Text) => {
            document.body.style.cursor = 'default';
            item.clearColors();
        }, this);        
    }
    update() {}
}

function goFullscreen() {
    if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
    } else {
        this.game.scale.startFullScreen(false);
    }
}