import { Resource, ResourceState } from "./resource.js";

/**
 * @extends {Resource<AudioBuffer>}
 * @export
 */
export class SoundRes extends Resource<AudioBuffer> {

    async load() {
        const ctx = new AudioContext()
        if (this.state == ResourceState.toload) {
            const res = await fetch(this.src)
            if (res) {
                const arrayBuffer = await res.arrayBuffer();
                this.data = await ctx.decodeAudioData(arrayBuffer);
                this.state = ResourceState.ready
            } else {
                this.state = ResourceState.failed
            }
        }
    }
};

