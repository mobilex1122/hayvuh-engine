/**
 * @typedef {"image" | "audio"} ResourceType
 */

import logger from "./utils/logger.mjs";



/**
 * @typedef {string} Base64DataString
 * Base64 encoded data 
 * 
 * __WARNING:__ Include `data:<tipe>;base64,` prefix!
 * @export
 */


/**
 * @typedef {Object} Resource
 * @property {ResourceType} type Type of the resource
 * @property {string} src Can Be URL or base64 encoded data (with prefix)
 * @property {string} id ID of the resource
 * @export
 */

/**
 * @typedef {Resource[]} ResourceArray
 * @export
 */

/**
 * @typedef {Object} LoaderResource __INTERNAL__
 * @property {ResourceType} type
 * @property {ImageBitmap} [data] Base64 encoded data (with `data:<tyle>;base64,` prefix)
 * @property {boolean} [loaded] Set to true when resource is ready to be used
 */

/**
 * @typedef {Map<string,LoaderResource>} LoaderResourceMap
 */

/**
 * @typedef {Object} LoaderOptions
 * @property {ResourceArray} resources Array of resources to load
 * @export
 */



/**
 * @callback onUpdateCallback
 * @param {number} progress Loading Progress (0-1)
 */

/**
 * @callback onComplateCallback
 */


export class Loader {


    /** @type {LoaderResourceMap} */
    resources = new Map();


    toLoadResources;

    /** @type {onUpdateCallback[]} */
    onUpdateCallbacks = []

     /** @type {onComplateCallback[]} */
    onComplateCallbacks = []


    /**
     * 
     * @param {LoaderOptions} options 
     */
    constructor(options) {
        this.toLoadResources = options.resources
    }

    /**
     * Adds event listener for state updates
     * @param {onUpdateCallback} callback 
     */
    addOnUpdateCallback(callback) {
        this.onUpdateCallbacks.push(callback)
    }

    /**
     * Adds event listener for load complate event
     * @param {onComplateCallback} callback 
     */
    addOnComplateCallback(callback) {
        this.onComplateCallbacks.push(callback)
    }

    /**
     * Removes event listener for state updates
     * @param {onUpdateCallback} callback 
     */
    removeOnUpdateCallback(callback) {
        this.onUpdateCallbacks = this.onUpdateCallbacks.filter((cb) => cb != callback)
    }

    /**
     * Removes event listener for load complate event
     * @param {onComplateCallback} callback 
     */
    removeOnComplateCallback(callback) {
        this.onComplateCallbacks = this.onComplateCallbacks.filter((cb) => cb != callback)
    }



    /**
     * 
     * @param {string} id 
     * @param {Base64DataString} type
     * @returns {string | undefined}
     */
    getResource(id, type) {
        const res = this.resources.get(id)
        if (res && res.loaded) {
            return res.data
        }
        return undefined
    }



    load() {
        this.updateProgress()
        this.toLoadResources.forEach(async (res) => {
            this.resources.set(res.id, {loaded: false})
            this.updateProgress()

            const response = await fetch(res.src)

            const blobData = await response.blob()

        
            this.resources.set(res.id, {data: blobData,loaded: true})
        })
    }

    /**
     * @private
     */
    updateProgress() {
        var loaded = 0;
        this.resources.forEach((r)=> {
            if (r.loaded) {
                loaded++;
            }
        })
        const progress = loaded / this.toLoadResources.length
        this.onUpdateCallbacks.forEach((callback) => {
            callback(progress)
        })

        if (loaded == this.toLoadResources.length) {
            this.onComplateCallbacks.forEach((callback) => {
                callback()
            })
            this.onComplateCallbacks = []
            this.onUpdateCallbacks = []
        }
    }
}