/**
 * GamePlayState
 */
import State from 'states/StateAbstract';

export default class GamePlayState extends State {
    hero: Phaser.Sprite;
    groundGroup: Phaser.Group;
    cursors: Phaser.CursorKeys;
    scalePlatform :number = 0.02;

    preload() {
        this.game.load.image('platform', 'assets/platform_1024x1024.png');
        this.game.load.image('background', 'assets/treesbackground.png');
        this.game.load.spritesheet('hero', 'assets/hero.png', 19, 34, 12);
    }

    create() {
        this.printGameInfo();
        this.game.add.sprite(0, 0, 'background');

        this.generateGround();        
        this.createHero(); // todo new Hero()

        // create the cursor key object
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        let player = this.hero;
        let cursors = this.cursors;

        //  Collide the player with the platforms
        let hitPlatform = this.game.physics.arcade.collide(player, this.groundGroup);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -100;
            player.scale.setTo(-1,1);
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 100;
            player.scale.setTo(1,1);
        }
        else {
            //  Stand still
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        }

        // check if the player fell down 
        /*if(player.y >= this.game.world.height){
            this.game.state.clearCurrentState();
            this.game.state.start("GameoverState");
        }*/
    }

    render() {
        let platform :Phaser.Sprite = (this.groundGroup.getAt(0) as Phaser.Sprite);
        this.game.debug.spriteInfo(platform, 32, 32);
        this.game.debug.spriteBounds(platform);
        //this.game.debug.spriteBounds(this.hero);
        this.game.debug.spriteCoords(this.hero, this.game.world.width - 380, 32);
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
    /*generateGround(offsetX = 192, inequality = 0) {
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
    }*/

    generateGround() {
        let worldLength = this.game.world.width;
        let blockSize = 20.48;
        let blocksNumber = Math.ceil(worldLength / blockSize);
        let platforms = [];
        let ground = this.groundGroup = this.game.add.group();
        ground.enableBody = true;

        let x = 0;
        let y = this.world.bottom - blockSize;

        for (let i = 0; i < blocksNumber; i++) {
            // if (i <= 3 || i >= blocksNumber - 5 || Math.floor(Math.random() * 10) % 2 === 0) {
                // Create a platform to a given coordinates
                let platform = this.game.add.sprite(x, y, 'platform');
                // Scale the platform
                platform.scale.setTo(this.scalePlatform);
                platforms.push(platform);
            // }

            x += blockSize;
        }
        
        platforms.forEach((platform :Phaser.Sprite) => {
            ground.add(platform);
        });

        ground.forEach((child :Phaser.Sprite, isImmovable :boolean) => {
            // An immovable body will not recive any impacts from the other bodies
            child.body.immovable = isImmovable;
        }, this, false, true);
    }

    createHero() {
        let hero = this.hero = this.game.add.sprite(32, this.game.world.height - 200, 'hero');

        hero.animations.add('idle');
        hero.animations.play('idle', 50, true);

        this.game.physics.arcade.enable(hero);
        hero.body.bounce.y = 0;
        hero.body.gravity.y = 1400;
        hero.body.collideWorldBounds = false;
    }
}