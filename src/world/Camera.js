class Camera {
    static unitHeight = 10
    static minHeight = 5
    static maxHeight = 40
    static zoomStep = 5

    static init(scene) {
        this.scene = scene;
        this.cam = scene.cameras.main
        console.log(this.cam)
    }

    static zoomIn() {
        this.unitHeight = Math.max(this.unitHeight - this.zoomStep, this.minHeight)
    }

    static zoomOut() {
        this.unitHeight = Math.min(this.unitHeight + this.zoomStep, this.maxHeight)
    }

    static update(time, dt) {
        this.unit   = this.cam.height / 1000
        this.height = this.cam.height
        this.width  = this.cam.width
        this.cam.centerOn(0, 0)
        this.cam.setZoom(this.height / (this.unitHeight * Physics.unit))
    }
}