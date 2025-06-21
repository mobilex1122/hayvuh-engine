export class Vec2 {
    /**
     * Vector 2D
     * @param {number} x X Value of vector
     * @param {number} y Y Value of vector
     */
    constructor(x: number, y: number);
    x: number;
    y: number;
    /**
     * Adds another vector to this vector.
     * @param {Vec2} other - The vector to add.
     * @returns {Vec2} A new Vec2 instance representing the sum.
     */
    add(other: Vec2): Vec2;
    /**
     * Subtracts another vector from this vector.
     * @param {Vec2} other - The vector to subtract.
     * @returns {Vec2} A new Vec2 instance representing the difference.
     */
    subtract(other: Vec2): Vec2;
    /**
     * Scales the vector by a scalar value.
     * @param {number} scalar - The scalar value to scale by.
     * @returns {Vec2} A new Vec2 instance representing the scaled vector.
     */
    scale(scalar: number): Vec2;
    /**
     * Calculates the length (magnitude) of the vector.
     * @returns {number} The length of the vector.
     */
    length(): number;
    /**
     * Normalizes the vector to a unit vector.
     * @returns {Vec2} A new Vec2 instance representing the normalized vector.
     */
    normalize(): Vec2;
}
