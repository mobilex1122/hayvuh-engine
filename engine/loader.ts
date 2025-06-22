import { Resource, ResourceState } from "./resources/resource";
import logger from "./utils/logger";

export type ResourcesArray = Resource<any>[]

export type ResourcesMap = Map<string,Resource<any>>


export type ResourcesRecord = Record<string,Resource<any>>

export type Resources = ResourcesRecord | ResourcesMap

type onUpdateCallback = (progress:number) => void
/**
 * @callback onUpdateCallback
 * @param {number} progress Loading Progress (0-1)
*/

type onComplateCallback = () => void

export type LoaderOptions = {
    resources:Resources
}

export class Loader {

    resources:ResourcesMap;

    constructor(options:LoaderOptions) {
        this.resources = Loader.resources2Map(options.resources)
    }


    /**
     * 
     * @param {Resources} resources 
     * @returns {ResourcesMap}
     */
    static resources2Map(resources:Resources) {
        if (resources instanceof Map) {
            return resources
        }
        return new Map(Object.entries(resources))
    }

    load() {
        logger.log("Loading Resources")
        this._checkProgress()
        this.resources.forEach(async (res) => {
            this._checkProgress()
            if (res.state == ResourceState.toload) {
                await res.load()
            }
            this._checkProgress()
        })
    }



    getResource<T>(name:string):Resource<T> | undefined{
        const res = this.resources.get(name)
        if (res && res.state == ResourceState.ready) {
            return res;
        }
        return undefined;
    }


    _checkProgress() {
        var loaded = 0;
        var toLoad = this.resources.size
        this.resources.forEach(res => {
            if (res.state == ResourceState.ready) {
                loaded++
            }
        })
        this._callUpdateCallbacks(loaded / toLoad, false)
        if (loaded == toLoad) {
            logger.log("Resources Loaded")
            this._callUpdateCallbacks(1)
            this._callComplateCallbacks()
        };
    }
    onUpdateCallbacks:onUpdateCallback[] = []
    onComplateCallbacks:onComplateCallback[] = []

    /**
     * Adds event listener for state updates
     */
    addOnUpdateCallback(callback:onUpdateCallback) {
        this.onUpdateCallbacks.push(callback)
    }

    /**
     * Adds event listener for load complate event
     */
    addOnComplateCallback(callback:onComplateCallback) {
        this.onComplateCallbacks.push(callback)
    }

    /**
     * Removes event listener for state updates
     */
    removeOnUpdateCallback(callback:onUpdateCallback) {
        this.onUpdateCallbacks = this.onUpdateCallbacks.filter((cb) => cb != callback)
    }

    /**
     * Removes event listener for load complate event
     */
    removeOnComplateCallback(callback:onComplateCallback) {
        this.onComplateCallbacks = this.onComplateCallbacks.filter((cb) => cb != callback)
    }

    /**
     * Calls Complate Callback
     * @param {boolean} clear Clears callback array 
     */
    _callComplateCallbacks(clear = true) {
        this.onComplateCallbacks.forEach(c => c())
        if (clear) {
            this.onComplateCallbacks = []
        }
    }

    /**
     * Calls Update Callback
     */
    _callUpdateCallbacks(progress:number,clear = true) {
        this.onUpdateCallbacks.forEach(c => c(progress))
        if (clear) {
            this.onUpdateCallbacks = []
        }
    }
}