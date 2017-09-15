/**
 * A State provide quick access to common functions such as the camera, cache, input, match, sound and more.
 * It is considered valid if it has at least one of the core functions (preload, create, update, render).
 * Extend this class to create a new state.
 */
export default abstract class State extends Phaser.State {
    game: Phaser.Game;

    constructor() {
        super();
    }
    
    preload(): void {};
    render(): void {};
    
    abstract create(): void;
    abstract update(): void;
}