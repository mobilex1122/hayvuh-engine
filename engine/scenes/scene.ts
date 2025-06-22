import { Draw } from "../draw.js";
import { Engine } from "../engine.js";
import { Loader } from "../loader.js"
import { GameObject } from "../objects/game-object.js";
import { GameObjectManager } from "../utils/game-object-manager.js";

/**
 * @namespace hayvoh
 */
export class Scene {

    loader?: Loader;
    engine?: Engine;


    //TODO: Rework Obeject Management
    children:GameObjectManager;



    constructor() {
        this.children = new GameObjectManager(this)
    }
    
    /** @internal */
    _init(loader:Loader,engine:Engine) {
        this.loader = loader
        this.engine = engine
        if (this.loader && this.engine) {
            // User first!!
            this.init()
            this.children._init()
        }
    }

    /** @internal */
    _update(dt:number) {
        if (this.loader) {
            this.update(dt)

            this.children._update(dt)
        }
    }

    /** @internal */
    _draw(d:Draw) {
        if (this.loader && this.engine) {
            this.draw(d)
            this.children._draw(d)
        }
    }

    getEngine():Engine {
        return this.engine!
    }

    init() {

    }

    update(dt:number) {
        
    }

    draw(d:Draw) {
        
    }

    getChildren() {
        return this.children
    }

    addChild(name: string | null, obj: GameObject) {
        return this.children.addGameObject(name,obj)
    }

    removeChild(obj: GameObject) {
        return this.children.removeGameObject(obj)
    }

    removeChildByName(name: string) {
        return this.children.removeGameObjectByName(name)
    }
}