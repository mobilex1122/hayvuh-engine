export class Draw {
    /**
     * Basic Canvas Wrapper for primary rendering.
     *
     * This class is mostly just quality of life changes for nicer interaction.
     * @param {HTMLCanvasElement} canvas Canvas Element to render the game on
     */
    constructor(canvas: HTMLCanvasElement);
    /** @type {HTMLCanvasElement} */
    canvas: HTMLCanvasElement;
    /** @type {CanvasRenderingContext2D} */
    ctx: CanvasRenderingContext2D;
    /**
     * Draws Filled Rectangle (ctx.fillRect)
     * @param {number} x X Position of the recengle
     * @param {number} y Y Position of the recengle
     * @param {number} w Width of the recengle
     * @param {number} h Height of the recengle
     */
    drawFillRect(x: number, y: number, w: number, h: number): void;
    /**
     * Draws Outline Rectangle (ctx.strokeRect)
     * @param {number} x X Position of the recengle
     * @param {number} y Y Position of the recengle
     * @param {number} w Width of the recengle
     * @param {number} h Height of the recengle
     */
    drawOutlineRect(x: number, y: number, w: number, h: number): void;
}
