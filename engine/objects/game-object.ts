import { Draw } from "../draw.js";
import { Loader } from "../loader.js";
import { Scene } from "../scenes/scene.js";
import { Vec2 } from "../utils/vec2.js";


/**
 * @abstract
 */
export class GameObject {

    public kill = false;

    public pos;

    public rotation:number;

    constructor(pos:Vec2 = Vec2.ZERO) {
        this.pos = pos
        this.rotation = 0;
    }

    init(scene:Scene) {}

    update(dt:number,scene:Scene) {}

    draw(d:Draw,scene:Scene) {}

    _draw(d:Draw,scene:Scene) {
        d.ctx?.save()
        d.ctx?.translate(this.pos.x,this.pos.y)
        d.ctx?.rotate(this.rotation)
        this.draw(d,scene)

        d.ctx?.restore()

    }
}