"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GamePlayState_1 = require("./GamePlayState");
var Game;
(function (Game) {
    var CasualPlatform = (function () {
        function CasualPlatform() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
                create: this.create, preload: this.preload
            });
        }
        CasualPlatform.prototype.preload = function () {
            this.game.load.image('ground', 'assets/platform_48x48.bmp');
            this.game.load.image('sky', 'assets/sky_800x600.png');
        };
        CasualPlatform.prototype.create = function () {
            this.game.state.add("GamePlayState", GamePlayState_1.GameStates.GamePlayState, true);
        };
        return CasualPlatform;
    }());
    Game.CasualPlatform = CasualPlatform;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.CasualPlatform();
};
//# sourceMappingURL=app.js.map