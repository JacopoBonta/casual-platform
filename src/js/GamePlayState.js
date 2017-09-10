class GamePlayState extends Phaser.State {
    constructor() {
        super();
    }
    preload() {
    }
    create() {
        this.printGameInfo();
        this.game.add.sprite(0, 0, 'sky');
        this.createGround(80, 80);
    }
    printGameInfo() {
        console.log(`World height: ${this.game.world.height}\nWorld width: ${this.game.world.width}`);
    }
    createGround(offsetX = 192, inequality = 0) {
        let groundGroup = this.game.add.group();
        groundGroup.enableBody = true;
        let platform = groundGroup.create(0, this.game.world.height - 64, 'ground');
        platform.scale.setTo(3, 1);
        platform.body.immovable = true;
        let nextPlatformXPos = 144 + offsetX;
        while (nextPlatformXPos < this.game.world.width) {
            let offsetY = this.game.world.height - 64;
            if (inequality > 0) {
                offsetY -= Math.floor(Math.random() * inequality);
            }
            let platformScaleX = Math.floor(Math.random() * (4 - 1) + 1);
            let platformLength = platformScaleX * 48;
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
    }
}
