import logger from "./utils/logger.mjs";

export class Draw {

    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {CanvasRenderingContext2D | undefined} */
    ctx;

    /**
     * Basic Canvas Wrapper for primary rendering.
     * 
     * This class is mostly just quality of life changes for nicer interaction.
     * @param {HTMLCanvasElement} canvas Canvas Element to render the game on
     */
    constructor(canvas) {
        this.canvas = canvas
        const ctx = this.canvas.getContext("2d")
        if (ctx) {
            this.ctx = ctx
        }
        logger.error("Failed to init Draw")
    }

    //MARK: Draw Functions

    /**
     * Draws Filled Rectangle (ctx.fillRect)
     * @param {number} x X Position of the recengle
     * @param {number} y Y Position of the recengle
     * @param {number} w Width of the recengle
     * @param {number} h Height of the recengle
     */
    drawFillRect(x,y,w,h) {
        if(this.ctx) {
            this.ctx.fillRect(x,y,w,h)
        }
    }

    /**
     * Draws Outline Rectangle (ctx.strokeRect)
     * @param {number} x X Position of the recengle
     * @param {number} y Y Position of the recengle
     * @param {number} w Width of the recengle
     * @param {number} h Height of the recengle
     */
    drawOutlineRect(x,y,w,h) {
        if(this.ctx) {
            this.ctx.strokeRect(x,y,w,h)
        }
    }
}