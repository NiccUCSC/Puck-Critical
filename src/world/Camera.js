class Camera {
    static unitHeight = 30

    static init(scene) {
        this.scene = scene;
        this.cam = scene.cameras.main
        console.log(this.cam)
    }

    static update(time, dt) {
        this.unit   = this.cam.height / 1000
        this.height = this.cam.height
        this.width  = this.cam.width
        this.cam.centerOn(0, 0)
        this.cam.setZoom(this.height / (this.unitHeight * Physics.unit))
    }
}