var Game;
(function (Game) {
    class CasualPlatform {
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
    Game.CasualPlatform = CasualPlatform;
})(Game || (Game = {}));
window.onload = () => {
    var game = new Game.CasualPlatform();
};
