import { Resource, ResourceState } from "./resource.js";

/**
 * @extends {Resource<ImageBitmap>}
 */
export class ImageRes extends Resource<ImageBitmap> {

    async load() {
        if (this.state == ResourceState.toload) {
            const res = await fetch(this.src)
            if (res) {
                const blob = await res.blob()
                this.data = await window.createImageBitmap(blob)
                this.state = ResourceState.ready
            } else {
                this.state = ResourceState.failed
            }
        }
    }
};

