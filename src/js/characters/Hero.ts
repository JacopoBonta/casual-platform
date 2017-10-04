import Character from "CharacterInterface"
export default class Hero implements Character {
    readonly game :Phaser.Game
    readonly initialPos :Phaser.Point;
    readonly sprite :Phaser.Sprite;
    readonly body :Phaser.Physics.Arcade.Body;
    life :number;
    velocity :number;
    gravity :number;

    private fps :number = 15;

    constructor(game :Phaser.Game, initialPosition :Phaser.Point = {x: 0, y: 0} as Phaser.Point, life :number = 10, velocity :number = 100, gravity :number = 1400) {
        this.game = game;
        this.initialPos = initialPosition;
        this.life = life;
        this.velocity = velocity;
        this.gravity = gravity;
        this.sprite = this.game.add.sprite(this.initialPos.x, this.initialPos.y, 'hero', 0);
        this.setupSprite();
        this.body = this.sprite.body;
        this.setupPhysiscs();
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
        // Enable physics on the sprite
        this.game.physics.arcade.enable(this.sprite);
    }
    /**
     * Helper function that setup the heros' body
     */
    private setupPhysiscs() :void {
        this.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
        this.body.gravity.y = this.getGravity();
        this.body.collideWorldBounds = false;
    }

    public getLife() :number {
        return this.life;
    }
    
    public getVelocity() :number {
        return this.velocity;
    }

    public getGravity() :number {
        return this.gravity;
    }

    public getPos() :Phaser.Point {
        return new Phaser.Point(this.body.x, this.body.y);
    }

    public setLife(life :number) :Hero {
        this.life = life;
        return this;
    }
    
    public setVelocity(velocity :number) :Hero {
        this.velocity = velocity;
        return this;
    }

    public setGravity(g :number) :Hero {
        this.gravity = g;
        return this;
    }

    public setPos(pos ?:Phaser.Point) :Hero {
        if (pos) {
            this.body.x = pos.x;
            this.body.y = pos.y;
        } else {
            this.body.x = this.initialPos.x;
            this.body.y = this.initialPos.y;
        }
        return this;
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
        this.body.velocity.x = 0;
    }

    public goLeft(velocity ?:number) :void {
        this.sprite.scale.setTo(-1, 1);
        this.sprite.animations.play('run');
        this.body.velocity.x = (velocity || this.getVelocity()) * -1;
    }

    public goRight(velocity ?:number) :void {
        this.sprite.scale.setTo(1, 1);
        this.sprite.animations.play('run');
        this.body.velocity.x = velocity || this.getVelocity();
    }

    public jump(verticalSpeed ?:number) :void {
        if (this.isTouchingDown()) {
            this.sprite.animations.play('jump');
            this.body.velocity.y = (verticalSpeed || 350) * -1;
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
        let life = this.getLife();
        if(amount) {
            life -= Math.abs(amount);
        } else {
            life--;
        }
        this.setLife(life);
        return this;
    }
}