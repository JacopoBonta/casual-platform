define(["require", "exports", "states/gamestart/GameStartState", "states/game/GamePlayState", "states/gameover/GameoverState"], function (require, exports, GameStartState_1, GamePlayState_1, GameoverState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CasualPlatform {
        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
            this.game.state.add('GameStartState', GameStartState_1.default);
            this.game.state.add('GamePlayState', GamePlayState_1.default);
            this.game.state.add('GameoverState', GameoverState_1.default);
        }
        addState(stateKey, state) {
            this.game.state.add(stateKey, state);
            return this;
        }
        play(stateKey) {
            if (!stateKey) {
                this.game.state.start('GamePlayState');
            }
            else {
                this.game.state.start(stateKey);
            }
        }
    }
    var game = new CasualPlatform().play('GameStartState');
});
