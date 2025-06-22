import { ImageRes } from "./resources/image.js";
import { ResourceState } from "./resources/resource.js";
import { Color } from "./utils/color";
import logger from "./utils/logger";



export type DrawOptions = {
    canvas?:HTMLCanvasElement,
    width?:number,
    height?:number
}

export class Draw {
    /** @type {HTMLCanvasElement | undefined} */
    canvas;
    /** @type {CanvasRenderingContext2D | undefined} */
    ctx;

    /**
     * Basic Canvas Wrapper for primary rendering.
     * 
     * This class is mostly just quality of life changes for nicer interaction.
     * @param {DrawOptions} options Canvas Element to render the game on
     */
    constructor(options:DrawOptions) {
        logger.copyright()        
        
        
        if (options.canvas) {
            this.canvas = options.canvas
            if (options.width) this.canvas.width = options.width
            if (options.height) this.canvas.height = options.height

            const ctx = this.canvas.getContext("2d")
            if (ctx) {
                this.ctx = ctx
                this.setColor(Color.fromHEX("#000"))
                this.clear()
            } else {
                logger.error("Failed to init Draw")
            }
        } else {
            logger.error("Failed to bind Canvas")
        }
    }

    //MARK: Draw Functions

    /**
     * Draws Filled Rectangle (ctx.fillRect)
     */
    drawFillRect(x:number,y:number,w:number,h:number) {
        if(this.ctx) {
            this.ctx.fillRect(x,y,w,h)
        }
    }

    /**
     * Draws Outline Rectangle (ctx.strokeRect)
     */
    drawOutlineRect(x:number,y:number,w:number,h:number) {
        if(this.ctx) {
            this.ctx.strokeRect(x,y,w,h)
        }
    }

    /**
     * Draws Image From Base64 data string (ctx.drawImage)
     */
    drawImage(res:ImageRes | undefined,x:number,y:number,w:number,h:number) {
        if(this.ctx && res && res.data && res.state == ResourceState.ready) {
            this.ctx.drawImage(res.data,x,y,w,h)
        }
    }


    /**
     * Clears Screen with black (ctx.fillRect)
     */
    clear() {
        if(this.ctx) {
            const orgstl = this.ctx.fillStyle;
            this.ctx.fillStyle = "#000"
            this.ctx.fillRect(0,0,this.getWidth(), this.getHeight())
            this.ctx.fillStyle = orgstl
        }
    }


    /**
     * Fills Screen with the current fill color (ctx.fillRect)
     */
    fill() {
        if(this.ctx) {
            this.ctx.fillRect(0,0,this.getWidth(), this.getHeight())
        }
    }

    getWidth() {
        if (this.canvas) {
            return this.canvas.width
        }
        return 0
    }

    getHeight() {
        if (this.canvas) {
            return this.canvas.height
        }
        return 0
    }

    /**
     * 
     * @param {Color} color 
     */
    setColor(color:Color) {
        if(this.ctx) {
            this.ctx.fillStyle = color.hex
        }
    }

    /**
     * 
     */
    setOpacity(alfa:number) {
        if(this.ctx) {
            this.ctx.globalAlpha = alfa
        }
    }

}