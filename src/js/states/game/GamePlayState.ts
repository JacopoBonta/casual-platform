/**
 * GamePlayState
 */
import State from 'states/StateAbstract';
import Hero from 'characters/Hero';
import Platformer from 'Platformer';

export default class GamePlayState extends State {
    ground :Platformer;
    hero: Hero;
    cursors :Phaser.CursorKeys;
    lifeText :Phaser.Text;

    preload() {
        this.game.load.image('platform', 'assets/platform_1024x1024.png');
        this.game.load.image('background', 'assets/treesbackground.png');
        this.game.load.spritesheet('hero', 'assets/hero_spritesheet.png', 21, 40);
    }

    create() {
        this.printGameInfo();
        this.game.add.sprite(0, 0, 'background');

        this.ground = new Platformer(this.game, 'platform');
        this.ground
            .generatePlatform(0, this.world.bottom - 21, this.world.width / 21, 7)
            .generatePlatformFromArray(380, this.world.bottom - 21, [1,2,2,3,4,5,6,7,8])
            .generatePlatformFromArray(600, 400, [0,-1,-1,0,0,-1,-1])
            .setImmovable(true);
        
        this.hero = new Hero(this.game);

        // create the cursor key object
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.lifeText = this.game.add.text(32, 32, `Life: ${this.hero.getLife()}`, {
            font: 'Indie Flower',
            fontSize: 35,
            fontWeight: 'bold',
            fill: '#ff0044'
        });
    }

    update() {
        let player = this.hero;
        let cursors = this.cursors;

        let hitGround = player.collide(this.ground.group);

        if (cursors.left.isDown) {
            player.goLeft();
        } else if (cursors.right.isDown) {
            player.goRight();
        } else {
            player.stand();
        }

        if (cursors.up.isDown && hitGround) {
            player.jump();
        }

        if (!hitGround) {
            player.fall();
        }

        // check if the player fell down 
        if(player.getPos().y >= this.game.world.height){
            player.damage();
            this.updateLifeText();
            if (player.getLife() <= 0) {
                this.game.state.clearCurrentState();
                this.game.state.start("GameoverState");
            } else {
                player.setPos();
            }
        }
    }

    render() {
        /* let platform :Phaser.Sprite = (this.groundGroup.getAt(0) as Phaser.Sprite);
        this.game.debug.spriteInfo(platform, 32, 32);
        this.game.debug.spriteBounds(platform);
        this.game.debug.spriteBounds(this.hero.sprite);
        this.game.debug.spriteCoords(this.hero.sprite, this.game.world.width - 380, 32); */
        // this.game.debug.body(this.hero.sprite, 'rgba(244, 235, 66, 0.5)');
    }

    printGameInfo(): void {
        console.log(`World height: ${this.game.world.height}\nWorld width: ${this.game.world.width}`);
    }

    updateLifeText() {
        this.lifeText.setText(`Life: ${this.hero.getLife()}`);
    }
}