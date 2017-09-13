/**
 * 
 */
import {GamePlayState as defaultState} from "states/game/GamePlayState";

class CasualPlatform {
    game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
        this.game.state.add('GamePlayState', defaultState);
    }

    // todo why addState(stateKey: string, state :Phaser.State) doesn't work
    addState(stateKey: string, state :any) :CasualPlatform{
        this.game.state.add(stateKey, state);
        return this;
    }

    play(stateKey?: string) {
        if (!stateKey) {
            this.game.state.start('GamePlayState');
        } else {
            this.game.state.start(stateKey);
        }
    }
}

var game = new CasualPlatform().play();