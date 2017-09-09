import {GameStates} from "./GamePlayState";
module Game {
    export class CasualPlatform {
        game: Phaser.Game;


        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
                create: this.create, preload: this.preload
            });
        }

        preload() {
            this.game.load.image('ground', 'assets/platform_48x48.bmp');
            this.game.load.image('sky', 'assets/sky_800x600.png');
        } 

        create() {
            this.game.state.add("GamePlayState", GameStates.GamePlayState, true);
        }
    }
}
window.onload = () => {
    var game = new Game.CasualPlatform();
};