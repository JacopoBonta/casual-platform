export default interface Character {
    game :Phaser.Game;
    initialPos :Phaser.Point;
    sprite :Phaser.Sprite;
    body :Phaser.Physics.Arcade.Body;

    life :number;
    velocity :number;
    gravity :number;

    getLife() :number;
    getVelocity() :number;
    getGravity() :number;
    getPos() :Phaser.Point;

    setLife(x :number) :Character;
    setVelocity(x :number) :Character;
    setGravity(x :number) :Character;
    setPos(p ?:Phaser.Point) :Character;

    isTouchingDown() :boolean;
    collide(o :Phaser.Sprite | Phaser.Group | Phaser.Particles.Arcade.Emitter | Phaser.TilemapLayer | Array<Phaser.Sprite | Phaser.Group | Phaser.Particles.Arcade.Emitter | Phaser.TilemapLayer>) :boolean;
    collidePoint(p :Phaser.Point) :boolean;

    stand() :void;
    goLeft(x ?:number) :void;
    goRight(x ?:number) :void;
    jump(x ?:number) :void;
    fall() :void;

    damage(x ?:number) :Character;

}