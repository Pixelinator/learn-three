//  Imports

/**
 * class Preloader
 * 
 */
class Preloader{
    constructor(options) {
        this.assets = {};

        for(let asset of options.assets) {
            this.assets[asset] = { loaded: 0, complete: false};
            this.load(asset);
        }

        this.container = options.container;
        if(options.onProgress = undefined) {
            this.onProgress = onProgress;
            this.domElement = document.createElement("div");
            this.domElement.style.position = 'absolute';
            this.domElement.style.top = '0';
            this.domElement.style.left = '0';
            this.domElement.style.width = '100%';
            this.domElement.style.height = '100%';
            this.domElement.style.background = '#000';
            this.domElement.style.opacity = '0.7';
            this.domElement.style.display = 'flex';
            this.domElement.style.alignItems = 'center';
            this.domElement.style.justifyContent = 'center';
            this.domElement.style.zIndex = '1111';

            const barBase = document.createElement("div");
            barBase.style.background = '#aaa';
            barBase.style.width = '50%';
            barBase.style.minWidth = '250px';
            barBase.style.borderRadius = '10px';
            barBase.style.height = '15px';
            this.domElement.appendChild(barBase);

            const bar = document.createElement("div");
            bar.style.background = '#2a2';
            bar.style.width = '50%';
            bar.style.borderRadius = '10px';
            bar.style.height = '100%';
            bar.style.width = '0';
            barBase.appendChild(bar);
            this.progressBar = bar;

            if(this.container != undefined) {
                this.container.appendChild(this.domElement);
            }
            else {
                document.body.appendChild(this.domElement);

            }
        }

        else {
            this.onProgress = options.onProgress;
        }

        this.onComplete = options.onComplete;

        const loader = this;
        function onProgress(delta) {
            const progress = delta * 100;
            loader.progressBar.style.width = `${progress}`;
        }
    }

    checkCompleted() {
        for(let prop in this.assets) {
            const asset = this.assets[prop];
            if(!asset.complete) return false;
        }
        return true;
    }

    get progress() {
        let total = 0;
        let loaded = 0;

        for(let prop in this.assets) {
            const asset = this.assets[prop];
            if(asset.total == undefined) {
                loaded = 0;
                break;
            }
            loaded += asset.loaded;
            total += asset.total;
        }

        return loaded/total;
    }

    load(url) {
        const loader = this;
        // TODO: webpack/node loader
    }
};

export default Preloader;