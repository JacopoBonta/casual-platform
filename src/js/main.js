define(["require", "exports", "states/game/GamePlayState"], function (require, exports, GamePlayState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CasualPlatform {
        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
                create: this.create, preload: this.preload
            });
        }
        preload() {
        }
        create() {
            this.game.state.add("GamePlayState", GamePlayState_1.GamePlayState, true);
        }
    }
    var game = new CasualPlatform();
});
