"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameStates;
(function (GameStates) {
    var GamePlayState = (function (_super) {
        __extends(GamePlayState, _super);
        function GamePlayState() {
            return _super.call(this) || this;
        }
        GamePlayState.prototype.preload = function () {
        };
        GamePlayState.prototype.create = function () {
            this.printGameInfo();
            this.game.add.sprite(0, 0, 'sky');
            this.createGround(80, 80);
        };
        GamePlayState.prototype.printGameInfo = function () {
            console.log("World height: " + this.game.world.height + "\nWorld width: " + this.game.world.width);
        };
        GamePlayState.prototype.createGround = function (offsetX, inequality) {
            if (offsetX === void 0) { offsetX = 192; }
            if (inequality === void 0) { inequality = 0; }
            var groundGroup = this.game.add.group();
            groundGroup.enableBody = true;
            var platform = groundGroup.create(0, this.game.world.height - 64, 'ground');
            platform.scale.setTo(3, 1);
            platform.body.immovable = true;
            var nextPlatformXPos = 144 + offsetX;
            while (nextPlatformXPos < this.game.world.width) {
                var offsetY = this.game.world.height - 64;
                if (inequality > 0) {
                    offsetY -= Math.floor(Math.random() * inequality);
                }
                var platformScaleX = Math.floor(Math.random() * (4 - 1) + 1);
                var platformLength = platformScaleX * 48;
                if (nextPlatformXPos + platformLength < this.game.world.width - 144) {
                    platform = groundGroup.create(nextPlatformXPos, offsetY, 'ground');
                    platform.scale.setTo(platformScaleX, 1);
                    platform.body.immovable = true;
                }
                nextPlatformXPos += platformLength + offsetX;
            }
            platform = groundGroup.create(this.game.world.width - 144, this.game.world.height - 64, 'ground');
            platform.scale.setTo(3, 1);
            platform.body.immovable = true;
        };
        return GamePlayState;
    }(Phaser.State));
    GameStates.GamePlayState = GamePlayState;
})(GameStates = exports.GameStates || (exports.GameStates = {}));
//# sourceMappingURL=GamePlayState.js.map