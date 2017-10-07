export default abstract class Character {
    private _game :Phaser.Game; // Game object reference
    private _sprite :Phaser.Sprite; // The sprite of the character (can contain animations)
    private _body :Phaser.Physics.Arcade.Body; // The physiscal body of the character
    private _spawnPos :Phaser.Point = new Phaser.Point(0,0); // The initial position of the character
    private _life :number = 10;  // The amount of life of the character
    private _speed :number = 100; // The horizontal movemnet speed
    private _verticalSpeed :number = 350; // The vertical movemente speed
    private _gravity :number = 1400; // The amount of gravity that afflict the body

    constructor(game :Phaser.Game) {
        this.game = game;
    }

    get game() :Phaser.Game {
        return this._game;
    }
    set game(game :Phaser.Game) {
        this._game = game;
    }
    get sprite() :Phaser.Sprite {
        return this._sprite;
    }
    set sprite(sprite :Phaser.Sprite) {
        this._sprite = sprite;
    }
    get body() :Phaser.Physics.Arcade.Body {
        return this._body;
    }
    set body(body :Phaser.Physics.Arcade.Body) {
        this._body = body;
    }
    get spawnPos() :Phaser.Point {
        return this._spawnPos;
    }
    set spawnPos(pos :Phaser.Point) {
        this._spawnPos = pos;
    }
    get life() :number {
        return this._life;
    }
    set life(life :number) {
        this._life = life;
    }
    get speed() :number {
        return this._speed;
    }
    set speed(speed :number) {
        this._speed = speed;
    }
    get verticalSpeed() :number {
        return this._verticalSpeed;
    }
    set verticalSpeed(verticalSpeed :number) {
        this._verticalSpeed = verticalSpeed;
    }
    get gravity() :number {
        return this._gravity;
    }
    set gravity(g :number) {
        this._gravity = g;
    }

    pos(p ?:Phaser.Point) :Phaser.Point {
        if (!this.body) {
            throw new Error("Body is not defined");
        }
        if (typeof p !== 'undefined') {
            this.body.position = p;
        }
        return this.body.position;
    }

    protected moveLeft(speed ?:number) :Character {
        if (!this.body) {
            throw new Error("Body is not defined");
        }
        this.body.velocity.x = (speed || this.speed) * -1;
        return this;
    }

    protected moveRight(speed ?:number) :Character {
        if (!this.body) {
            throw new Error("Body is not defined");
        }
        this.body.velocity.x = speed || this.speed;
        return this;
    }

    protected moveUp(speed ?:number) :Character {
        if (!this.body) {
            throw new Error("Body is not defined");
        }
        this.body.velocity.y = (speed || this.verticalSpeed) * -1;
        return this;
    }

    protected moveDown(speed ?:number) :Character {
        if (!this.body) {
            throw new Error("Body is not defined");
        }
        this.body.velocity.y = speed || this.verticalSpeed;
        return this;
    }

    protected stop() :Character {
        if(!this.body) {
            throw new Error("Body is not defined");
        }
        this.body.velocity.x = 0;
        return this;
    }
    
    public collide(obj :Phaser.Sprite | Phaser.Group | Phaser.Particles.Arcade.Emitter | Phaser.TilemapLayer | Array<Phaser.Sprite | Phaser.Group | Phaser.Particles.Arcade.Emitter | Phaser.TilemapLayer>) :boolean {
        if (!this.sprite) {
            throw new Error("Sprite is not defined");
        }
        return this.game.physics.arcade.collide(this.sprite, obj);
    }

    public collidePoint(p :Phaser.Point) :boolean {
        if (!this.sprite) {
            throw new Error("Sprite is not defined");
        }
        return this.sprite.getBounds().contains(p.x, p.y);
    }

    public damage(amount ?:number) :Character {
        this.life -= amount || this.life;
        return this;
    }
}