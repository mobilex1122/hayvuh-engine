export class Vec2 {

    public x:number;
    public y:number;

    /**
     * Vector 2D
     * @param {number} x X Value of vector
     * @param {number} y Y Value of vector
     */
    constructor(x:number,y:number) {
        this.x = x
        this.y = y
    }

    /**
     * Adds another vector to this vector.
     * @param {Vec2} other - The vector to add.
     * @returns {Vec2} A new Vec2 instance representing the sum.
     */
    add(other:Vec2) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    /**
     * Subtracts another vector from this vector.
     * @param {Vec2} other - The vector to subtract.
     * @returns {Vec2} A new Vec2 instance representing the difference.
     */
    subtract(other:Vec2) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    /**
     * Scales the vector by a scalar value.
     */
    scale(scalar:number) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    /**
     * Calculates the length (magnitude) of the vector.
     */
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Normalizes the vector to a unit vector.
     */
    normalize() {
        const len = this.length();
        if (len === 0) return new Vec2(0, 0); // Prevent division by zero
        return new Vec2(this.x / len, this.y / len);
    }


    static get ZERO() {return new Vec2(0,0)};
}