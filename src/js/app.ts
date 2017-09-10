//import {GamePlayState} from "./GamePlayState";
//import GamePlayState = require("./GamePlayState");
module Game {
    export class CasualPlatform {
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
}
window.onload = () => {
    var game = new Game.CasualPlatform();
};