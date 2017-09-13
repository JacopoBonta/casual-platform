/**
 * 
 */
import {GamePlayState} from "states/game/GamePlayState";

class CasualPlatform {
    game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
            create: this.create, preload: this.preload
        });
    }

    preload() {
    } 

    create() {
        this.game.state.add("GamePlayState", GamePlayState, true);
    }
}

var game = new CasualPlatform();