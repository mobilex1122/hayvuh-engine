import { Draw } from "./engine/draw.js";
import { Engine } from "./engine/engine.js";
import { Loader } from "./engine/loader.js";
import { GameObject } from "./engine/objects/game-object.js";
import { ImageRes } from "./engine/resources/image.js";
import { Resource } from "./engine/resources/resource.js";
import { SoundRes } from "./engine/resources/sound.js";
import { Scene } from "./engine/scenes/scene.js";
import logger from "./engine/utils/logger.js";

/** @namespace HAYVOH */

const hv = {
    Draw,
    Engine,
    Loader,

    logger,

    res: {
        Resource,
        SoundRes,
        ImageRes
    },

    scene: {
        Scene,
        objects: {
            GameObject
        }
    }
}

export default hv