import Character from "characters/Character"
export default class Enemy extends Character {

    constructor(game :Phaser.Game, pos ?:Phaser.Point, life ?:number, speed ?:number, gravity ?:number) {
        super(game);
        this.spawnPos = pos;
        this.life = life;
        this.speed = speed;
        this.gravity = gravity;
        this.sprite = this.game.add.sprite(this.spawnPos.x, this.spawnPos.y, 'enemy', 0);
        // Enable physics on the sprite
        this.game.physics.arcade.enable(this.sprite);
        this.body = this.sprite.body;
        this.setupBody();
    }
    
    setPos(p ?:Phaser.Point) :Enemy {
        if(!this.body) {
            throw new Error("Body is not defined");
        }
        this.body.position = p;
        return this;
    }    
    /**
     * Helper function that setup the heros' body
     */
    private setupBody() :void {
        this.body.setSize(10 / this.sprite.scale.x, 30 / this.sprite.scale.y, 5, 5);
        this.body.gravity.y = this.gravity;
        this.body.collideWorldBounds = false;
    }
}