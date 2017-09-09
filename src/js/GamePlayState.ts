export namespace GameStates {
    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;

        constructor() {
            super();
        }

        preload() {
        }

        create() {
            this.printGameInfo();

            this.game.add.sprite(0, 0, 'sky');

            this.createGround(80, 80)
        }

        printGameInfo() : void {
            console.log(`World height: ${this.game.world.height}\nWorld width: ${this.game.world.width}`);
        }

        /**
         * Populate the ground with platforms.
         * Start platform and end platform have a fixed width of 3 blocks.
         * Middle platforms have a random width between 1 and 4 blocks.
         * 
         * ps: a platform is made by blocks; a single block measure 48*48 px.
         */
        createGround(offsetX = 192, inequality = 0) {
            // Create a group where to add platforms for the ground
            let groundGroup = this.game.add.group();
            groundGroup.enableBody = true;

            // Place starting platform
            let platform = groundGroup.create(0, this.game.world.height - 64, 'ground');
            platform.scale.setTo(3, 1);
            platform.body.immovable = true;
            let nextPlatformXPos = 144 + offsetX;

            // Place the middle platforms
            while (nextPlatformXPos < this.game.world.width) {
                let offsetY = this.game.world.height - 64;
                if (inequality > 0) {
                    offsetY -= Math.floor(Math.random() * inequality);
                }
                // How much scale a single block
                let platformScaleX = Math.floor(Math.random() * (4 - 1) + 1);
                let platformLength = platformScaleX * 48;

                if (nextPlatformXPos + platformLength < this.game.world.width - 144) {
                    platform = groundGroup.create(nextPlatformXPos, offsetY, 'ground');
                    platform.scale.setTo(platformScaleX, 1);
                    platform.body.immovable = true;
                }

                nextPlatformXPos += platformLength + offsetX;
            }

            // Place ending platform
            platform = groundGroup.create(this.game.world.width - 144, this.game.world.height - 64, 'ground');
            platform.scale.setTo(3, 1);
            platform.body.immovable = true;

        }
    }
}