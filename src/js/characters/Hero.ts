import Character from "characters/Character"
export default class Hero extends Character {
    private _fps :number = 15;

    constructor(game :Phaser.Game, pos ?:Phaser.Point, life ?:number, speed ?:number, gravity ?:number) {
        super(game);
        if (pos) {
            this.spawnPos = pos;
        }
        if (life) {
            this.life = life;
        }
        if (speed) {
            this.speed = speed;
        }
        if (gravity) {
            this.gravity = gravity;
        }
        this.sprite = this.game.add.sprite(this.spawnPos.x, this.spawnPos.y, 'hero', 0);
        this.sprite.scale.setTo(1.25, 1.25);
        this.setupSprite();
        // Enable physics on the sprite
        this.game.physics.arcade.enable(this.sprite);
        this.body = this.sprite.body;
        this.setupPhysiscs();
    }
    get fps() :number {
        return this._fps;
    }
    set fps(fps :number) {
        this._fps = fps;
    }
    /**
     * Helper function that setup the hero's sprite
     */
    private setupSprite() :void {
        // Create the sprite and the animations
        this.sprite.anchor.setTo(.5,.5);
        this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.fps, true);
        this.sprite.animations.add('run', [60, 61, 62, 63, 64, 65, 66, 67], this.fps, true);
        this.sprite.animations.add('jump', [12]);
        this.sprite.animations.add('mid air', [48, 49], this.fps, true);
        this.sprite.animations.add('landing', [24]);
    }
    /**
     * Helper function that setup the heros' body
     */
    private setupPhysiscs() :void {
        // this.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
        this.body.gravity.y = this.gravity;
        this.body.collideWorldBounds = false;
    }

    public isTouchingDown() :boolean {
        return this.body.touching.down;
    }

    public collide(obj :Phaser.Sprite | Phaser.Group | Phaser.Particles.Arcade.Emitter | Phaser.TilemapLayer | Array<Phaser.Sprite | Phaser.Group | Phaser.Particles.Arcade.Emitter | Phaser.TilemapLayer>) :boolean {
        return this.game.physics.arcade.collide(this.sprite, obj);
    }

    public collidePoint(point :Phaser.Point) :boolean {
        return this.sprite.getBounds().contains(point.x, point.y);
    }

    public stand() :void {
        this.sprite.animations.play('idle');
        this.stop();
    }

    public left(velocity ?:number) :void {
        this.sprite.scale.setTo(-1.25, 1.25);
        this.sprite.animations.play('run');
        this.moveLeft(velocity);
    }

    public right(velocity ?:number) :void {
        this.sprite.scale.setTo(1.25, 1.25);
        this.sprite.animations.play('run');
        this.moveRight(velocity);
    }

    public jump(verticalSpeed ?:number) :void {
        if (this.isTouchingDown()) {
            this.sprite.animations.play('jump');
            this.moveUp(verticalSpeed);
        }
    }

    public fall() :void {
        if (!this.isTouchingDown()) {
            this.sprite.animations.play('mid air');
        } else {
            this.sprite.animations.play('landing');
        }
    }

    public damage(amount ?:number) :Hero {
        this.life -= Math.abs(amount) || 1;
        return this;
    }
}