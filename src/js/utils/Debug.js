define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Debug {
        constructor(debug, show, x, y) {
            this.color = 'rgb(255,255,255)';
            this.debug = debug;
            this.showDebug = show || false;
            this.x = x || 0;
            this.y = y || 0;
        }
        getX() {
            return this.x;
        }
        getY() {
            return this.y;
        }
        setX(x) {
            this.x = x;
            return this;
        }
        setY(y) {
            this.y = y;
            return this;
        }
        toggleDebug() {
            this.showDebug = !this.showDebug;
        }
        spriteInfo(sprite) {
            if (this.showDebug) {
                this.debug.bodyInfo(sprite, this.x, this.y, this.color);
            }
            return this;
        }
        cameraInfo(cam) {
            if (this.showDebug) {
                this.debug.cameraInfo(cam, this.x, this.y);
            }
            return this;
        }
        mouseInfo() {
            if (this.showDebug) {
                this.debug.inputInfo(this.x, this.y);
            }
            return this;
        }
    }
    exports.Debug = Debug;
});
