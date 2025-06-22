
export const ResourceState = {
    ready: "ready",
    loading: "loading",
    failed: "failed",
    toload: "toload"
}

export const ResourceType = {
    sound: "sound",
    image: "image",
    json: "json",
    general: "general"
}


export abstract class Resource<T = any> {

    data:T | undefined;

    state;
    src;

    /**
     * Resource Class
     * @param {string} source
     * Data Source
     * 
     * Can Be URL or dataURL
     */
    constructor(source:string) {
        this.state = ResourceState.toload
        this.src = source
    }


    abstract load():Promise<void>;

}