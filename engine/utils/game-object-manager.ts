import { Draw } from "../draw.js";
import { GameObject } from "../objects/game-object.js";
import { Scene } from "../scenes/scene.js";

type UnstableGameObject = GameObject | undefined


export class GameObjectManager {


    private scene: Scene;
    
    private objectMap: Map<string,number>;

    private objectArray: UnstableGameObject[];

    constructor(scene:Scene) {
        this.objectMap = new Map();
        this.objectArray = [];
        this.scene = scene
    }


    /** @internal */
    _update(dt:number) {
        for (var i = 0; i < this.objectArray.length; i++) {
            const obj = this.objectArray[i]
            if (obj != undefined) {
                obj.update(dt,this.scene)
            }
        }
    }

    /** @internal */
    _draw(d:Draw) {
        for (var i = 0; i < this.objectArray.length; i++) {
            const obj = this.objectArray[i]
            if (obj != undefined) {
                obj._draw(d,this.scene)
            }
        }
    }

    /** @internal */
    _init() {
        for (var i = 0; i < this.objectArray.length; i++) {
            const obj = this.objectArray[i]
            if (obj != undefined) {
                obj.init(this.scene)
            }
        }
    }

    addGameObject(name:string | null,gameObject: GameObject) {
        const newObjectIndex = this.objectArray.push(gameObject) - 1
        if (name == null) {
            name = "object-" + newObjectIndex
        }
        this.objectMap.set(name, newObjectIndex);
        return name
    }

    removeGameObject(gameObject:GameObject) {
        const index = this.objectArray.findIndex((g) => gameObject === g)
        if (index >= 0 ){
            this.objectArray[index] = undefined
        }
    }

    removeGameObjectByName(name:string) {
        const index = this.objectMap.get(name)
        if (index){
            this.objectArray[index] = undefined
        }
    }
}