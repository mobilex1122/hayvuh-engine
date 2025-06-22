import buildInAssets from "./build-in-assets";
import { Draw } from "./draw.js";
import { Loader } from "./loader";
import { Scene } from "./scenes/scene";
import { Color } from "./utils/color";
import logger from "./utils/logger";


export type EngineOptions = {
    loader?:Loader,
    draw:Draw
}

export class Engine {
    
    private userloader:Loader;
    private engineLoader:Loader;
    private draw:Draw;

    private delta:number = 0;

    private scene?:Scene;


    private running = false;


    private engineAssets = buildInAssets;


    constructor(options:EngineOptions) {
        logger.copyright()

        this.userloader = options.loader ?? new Loader({resources: {}})
        this.engineLoader = new Loader({resources: this.engineAssets})
        this.draw = options.draw
    }



    start() {
        if (this.userloader) {
            
            
            this.userloader.addOnUpdateCallback((p) => this.onLoadUpdate(p))
            this.userloader.addOnComplateCallback(() => this.onLoadComplate())
            
        }
        this.engineLoader.addOnComplateCallback(() => {
            if (this.userloader) {
                this.userloader.load()
            } else {
                this.onLoadComplate()
            }
            
        })
        this.engineLoader.addOnUpdateCallback((p) => this.onLoadUpdate(p))
        this.engineLoader.load()
    }

    onLoadUpdate(p:number) {
        const w = this.draw.getWidth()
        const h = this.draw.getHeight()

        var size = 200
        size = Math.min(w - 100,size)
        size = Math.min(h - 100,200)

        this.draw.drawImage(this.engineLoader.getResource<ImageBitmap>("logo"),w/2 - size/2,h/2 - size/2,size,size)
        

        this.draw.setColor(Color.fromHEX("#00000020"))
        this.draw.fill()



        const progWidth = w/2
        const progY = h/2 + size/2 + h/4

        this.draw.setColor(Color.fromHEX("#121212"))
        this.draw.drawFillRect(w/2 - progWidth/2,progY,progWidth,4)

        this.draw.setColor(Color.WHITE)
        this.draw.drawFillRect(w/2 - progWidth/2,progY,progWidth * p,4)
    }

    onLoadComplate() {

        const w = this.draw.getWidth()
        const h = this.draw.getHeight()

        var size = 200
        size = Math.min(w - 100,size)
        size = Math.min(h - 100,200)

        this.draw.setColor(Color.BLACK)
        this.draw.clear()

        this.draw.drawImage(this.engineAssets.logo,w/2 - size/2,h/2 - size/2,size,size)


        setTimeout(() => {
            this.scene?._init(this.userloader,this)
            this.startMainLoop()
        }, 1000)
    }


    public setScene(scene:Scene) {
        this.scene = scene
        if (this.running) {
            this.scene._init(this.userloader,this)
        }
    }



    public getLoader() {
        return this.userloader
    }


    private oldTime:number | null = null;

    startMainLoop() {
        window.requestAnimationFrame((t) => this.mainLoop(t));
    }

    mainLoop(time:number) {
        if (!this.oldTime) this.oldTime = time;

        this.delta = (time - this.oldTime) / 1000;
        this.oldTime = time
        
        this.draw.clear()
        if (this.scene) {
            this.scene._update(this.delta)
            this.scene._draw(this.draw)
        }

        this.startMainLoop()
    }
}