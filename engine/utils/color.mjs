export class Color {

    /** @public */
    hex;
    
    /**
     * 
     * @param {string} hex 
     */
    constructor(hex) {
        this.hex = hex;
    }

    /**
     * Create Color from Hex
     * @param {string} hex 
     * @returns Color
     */
    static fromHEX(hex) {
        return new Color(hex)
    }






    static BLACK = new Color("#000")
    static WHITE = new Color("#fff")
    static RED = new Color("#f00")
    static GREEN = new Color("#0f0")
    static BLUE = new Color("#00f")
    static YELLOW = new Color("#ff0")
}