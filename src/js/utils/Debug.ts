export class Debug {
    private debug :Phaser.Utils.Debug;
    private showDebug :boolean;
    private x :number;
    private y :number;
    private color :string = 'rgb(255,255,255)';

    constructor(debug :Phaser.Utils.Debug, show? :boolean, x? :number, y? :number) {
        this.debug = debug;
        this.showDebug = show || false;
        this.x = x || 0;
        this.y = y || 0;
    }

    public getX() :number {
        return this.x;
    }

    public getY() :number {
        return this.y;
    }

    public setX(x :number) {
        this.x = x;
        return this;
    }

    public setY(y :number) {
        this.y = y;
        return this;
    }

    public toggleDebug() {
        this.showDebug = !this.showDebug;
    }

    public spriteInfo(sprite :Phaser.Sprite) {
        if (this.showDebug) {
            this.debug.bodyInfo(sprite, this.x, this.y, this.color);
        }
        return this;
    }

    public cameraInfo(cam :Phaser.Camera) {
        if (this.showDebug) {
            this.debug.cameraInfo(cam, this.x, this.y);
        }
        return this;
    }

    public mouseInfo() {
        if (this.showDebug) {
            this.debug.inputInfo(this.x, this.y);
        }
        return this;
    }
}