/**
 * GamePlayState
 */
import {State} from 'states/StateAbstract';

export class GamePlayState extends State {
    player: Phaser.Sprite;
    groundGroup: Phaser.Group;
    cursors: Phaser.CursorKeys;

    preload() {
        this.game.load.image('ground', 'assets/platform_48x48.bmp');
        this.game.load.image('background', 'assets/treesbackground.png');
        this.game.load.spritesheet('player', 'assets/stickman.png', 100, 120, 7);
    }

    create() {
        this.printGameInfo();
        this.game.add.sprite(0, 0, 'background');
        this.createGround(80, 80);
        this.createStickman();

        // create the cursor key object
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        //  Collide the player with the platforms
        let hitPlatform = this.game.physics.arcade.collide(this.player, this.groundGroup);
        let player = this.player;
        let cursors = this.cursors;

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -200;
            player.scale.setTo(-1,1);
            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 200;
            player.scale.setTo(1,1);
            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();

            player.frame = 3;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        }

        // check if the player fell down 
        if(player.y >= this.game.world.height){
            this.game.state.start("GameoverState");
        }
    }

    printGameInfo(): void {
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
        this.groundGroup = this.game.add.group();
        let ground = this.groundGroup;
        ground.enableBody = true;

        // Place starting platform
        let platform = ground.create(0, this.game.world.height - 64, 'ground');
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
                platform = ground.create(nextPlatformXPos, offsetY, 'ground');
                platform.scale.setTo(platformScaleX, 1);
                platform.body.immovable = true;
            }

            nextPlatformXPos += platformLength + offsetX;
        }

        // Place ending platform
        platform = ground.create(this.game.world.width - 144, this.game.world.height - 64, 'ground');
        platform.scale.setTo(3, 1);
        platform.body.immovable = true;

    }

    createStickman() {
        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 200, 'player');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        this.player.body.setSize(45, 73, 10, 30);
        this.player.anchor.setTo(.5,.5);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = false;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 20, true);
        this.player.animations.add('right', [0, 1, 2, 3, 4, 5, 6], 20, true);
    }
}