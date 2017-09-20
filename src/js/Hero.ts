export default class Hero {
    game :Phaser.Game
    
    private life :number;
    private sprite :Phaser.Sprite;
    private posX :number;
    private posY :number;
    private velocity :number;
    private gravity :number;
    private fps :number;

    constructor(game :Phaser.Game, x ?:number, y ?:number, customSprite ?:string) {
        this.game = game;
        this.life = 10;
        this.gravity = 1400;
        this.velocity = 100;
        this.fps = 10;
        this.posX = x || 32;
        this.posY = y || this.game.world.height - 200;

        this.setSprite(customSprite || 'hero');
    }

    public getLife() :number {
        return this.life;
    }

    public getSprite() :Phaser.Sprite {
        return this.sprite;
    }

    public getPosX() :number {
        return this.posX;
    }

    public getPosY() :number {
        return this.posY;
    }

    public getVelocity() :number {
        return this.velocity;
    }

    public getGravity() :number {
        return this.gravity;
    }

    public getFps() :number {
        return this.fps;
    }

    public setLife(life :number) :Hero {
        this.life = life;
        return this;
    }
    
    private setSprite(sprite :string) {
        this.sprite = this.game.add.sprite(this.posX, this.posY, sprite, 0);
        this.sprite.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], this.fps, true);
        this.sprite.animations.add('run', [60, 61, 62, 63, 64, 65, 66, 67], this.fps, true);
        this.sprite.animations.add('jump', [12]);
        this.sprite.animations.add('mid air', [48, 49], this.fps, true);
        this.sprite.animations.add('landing', [24]);
        
        this.sprite.anchor.setTo(.5,.5);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = this.gravity;
        this.sprite.body.collideWorldBounds = false;
        this.sprite.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
    }

    public setPosX(x :number) :Hero {
        this.posX = x;
        return this;
    }

    public setPosY(y :number) :Hero {
        this.posY = y;
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

    public setFps(fps :number) :Hero {
        this.fps = fps;
        return this;
    }

    private isTouchingDown() :boolean {
        return this.getSprite().body.touching.down;
    }

    public collide(group :Phaser.Group) :boolean {
        return this.game.physics.arcade.collide(this.getSprite(), group);
    }

    public goLeft(velocity ?:number) :Hero {
        let hero = this.getSprite();
        hero.scale.setTo(-1, 1);
        hero.animations.play('run');
        hero.body.velocity.x = (velocity || this.getVelocity()) * -1;
        return this;
    }

    public goRight(velocity ?:number) :Hero {
        let hero = this.getSprite();
        hero.scale.setTo(1, 1);
        hero.animations.play('run');
        hero.body.velocity.x = velocity || this.getVelocity();
        return this;
    }

    public stand() :Hero {
        let hero = this.getSprite();
        hero.animations.play('idle');        
        hero.body.velocity.x = 0;
        return this;
    }

    public jump() :Hero {
        let hero = this.getSprite();
        if (this.isTouchingDown()) {
            hero.animations.play('jump');
            hero.body.velocity.y = -350;
        }
        return this;
    }

    public fall() :Hero {
        let hero = this.getSprite();
        if (!this.isTouchingDown()) {
            hero.animations.play('mid air');
        } else {
            hero.animations.play('landing');
        }
        return this;
    }

    public resetPosition(x ?:number, y ?:number) :Hero {
        let hero = this.getSprite()
        hero.body.x = this.getPosX();
        hero.body.y = this.getPosY();
        return this;
    }

    public hit(damage ?:number) :Hero {
        let life = this.getLife();
        if(damage) {
            life -= Math.abs(damage);
        } else {
            life--;
        }
        this.setLife(life);
        return this;
    }
}