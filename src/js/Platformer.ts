export default class Platformer {
    game :Phaser.Game;
    group :Phaser.Group;

    private sprite :string;
    private blockSize :number = 20.48;
    private blockScale :number = 0.02;

    constructor(game :Phaser.Game, spriteKey :string) {
        this.game = game;
        this.sprite = spriteKey;
        this.group = this.game.add.group();
    }
    /**
     * Returns the Group for the platform(s).
     */
    public getGroup() :Phaser.Group {
        return this.group;
    }
    /**
     * Return the sprite key.
     */
    public getSpriteKey() :string {
        return this.sprite;
    }
    /**
     * Returns the block size.
     */
    public getBlockSize() :number {
        return this.blockSize;
    }
    /**
     * Returns the block scale.
     */
    public getBlockScale() :number {
        return this.blockScale;
    }
    /**
     * Set a new Group for the platform(s) created with this Platformer.
     * @param group {Phase.Group} The group to set.
     */
    public setGroup(group :Phaser.Group) :Platformer {
        this.group = group;
        return this;
    }
    /**
     * Set a new sprite for the platfrom's block(s).
     * @param spriteKey {string} The key of a preloaded sprite.
     */
    public setSpriteKey(spriteKey :string) :Platformer {
        this.sprite = spriteKey;
        return this;
    }
    /**
     * Set a new size for the block(s) that compose a platform.
     * @param size {number} The dimentsion of the platform's block(s).
     */
    public setBlockSize(size :number) :Platformer {
        this.blockSize = size;
        return this;
    }
    /**
     * Set a new scale value for the block(s) that compose a platform.
     * @param scale {number} The amount of how much scale the platform's block(s).
     */
    public setBlockScale(scale :number) :Platformer {
        this.blockScale = scale;
        return this;
    }
    /**
     * Enable the Body for the elements in the current group.
     */
    public enableBody() :Platformer {
        this.group.enableBody = true;
        if (this.group.length > 0) {
            this.game.physics.arcade.enable(this.group, true);
        }
        return this;
    }
    /**
     * Set or unset the body's immovable property for the pltafrom(s).
     * A body will be added for you if no one is present on the current group.
     * @param enable {boolean} If true the platform will not recive any impacts from other bodies.
     */
    public setImmovable(enable :boolean) :Platformer {
        if (!this.group.enableBody) {
            this.enableBody();
        }
        this.group.forEach((block :Phaser.Sprite, isImmovable :boolean) => {
            // An immovable body will not recive any impacts from the other bodies
            block.body.immovable = isImmovable;
        }, this, false, enable);
        return this;
    }
    /**
     * Create a new platform.
     * @param x {number} The X coordinate (in world space) to position the first block of the platform at.
     * @param y {number} The Y coordinate (in world space) to position the first block of the platform at.
     * @param length {number} The number of blocks the platform will be.
     * @param factor {number} The factor that influence the probability of get holes in the platform.
     */
    public generatePlatform(x :number, y :number, length :number, factor ?:number) :Platformer {
        let blocksNumber = length;
        let platform = [];
        let consecutive = 0;
        factor = factor || 10;
        for (let i = 0; i < blocksNumber; i++) {
            if (i <= 1 || i >= blocksNumber - 1 || consecutive >= 2 || Math.floor(Math.random() * 10) <= factor) {
                consecutive = 0;
                // Create a platform to a given coordinates
                let block = this.game.add.sprite(x, y, this.sprite);
                // Scale the platform
                block.scale.setTo(this.blockScale);
                platform.push(block);
            } else {
                consecutive++;
            }
            x += this.blockSize;
        }
        platform.forEach((block :Phaser.Sprite) => {
            this.group.add(block);
        });
        return this;
    }
    /**
     * Create new platform from array.
     * The length of the platform is the same as the length of the array.
     * Each value of the array rappresent the height of a single block from the given Y coordinate. 
     * @param x {number} The X coordinate (in world space) to position the first block of the platform at.
     * @param y {number} The Y coordinate (in world space) to position the first block of the platform at.
     * @param array {number[]} the array describing the platform.
     */
    public generatePlatformFromArray(x :number, y :number, array :number[]) :Platformer {
        let blocksNumber = array.length;
        let platform = [];
        for (let i = 0; i < blocksNumber; i++) {
            // Create a platform to a given coordinates
            let block = this.game.add.sprite(x, y - (array[i] * this.blockSize), this.sprite);
            // Scale the platform
            block.scale.setTo(this.blockScale);
            platform.push(block);
            x += this.blockSize;
        }
        platform.forEach((block :Phaser.Sprite) => {
            this.group.add(block);
        });
        return this;
    }
}