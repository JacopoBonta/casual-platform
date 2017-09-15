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
    }
    update(): void{
        
    }

}