/**
 * GameoverState
 * This state is executed when the player has lost all his lives
 */
import State from 'states/StateAbstract';

export default class GameoverState extends State {
    preload(): void{
        this.game.load.image('gameover', 'assets/gameover.png');
    }
    create(): void{
        this.game.add.sprite(0, 0, 'gameover');

        let restartText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Restart');
        restartText.inputEnabled = true;

        restartText.events.onInputOver.add((item :Phaser.Text) => {
            document.body.style.cursor = 'pointer';
            item.addColor('#f00', 0);
        }, this);
        restartText.events.onInputDown.add((item :Phaser.Text) => {
            this.game.state.clearCurrentState();
            this.game.state.start('GamePlayState');
        }, this);
        restartText.events.onInputOut.add((item :Phaser.Text) => {
            document.body.style.cursor = 'default';
            item.clearColors();
        }, this);
    }
    update(): void{
        
    }

}