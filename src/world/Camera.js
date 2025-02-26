class Camera {
    static unitHeight = 10
    static minHeight = 5
    static maxHeight = 40
    static zoomStep = 5
    static panSpeed = 0.5

    static init(scene) {
        this.scene = scene;
        this.cam = scene.cameras.main
        this.pos = { x: 0, y: 0 }
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

        let vx = (Input.rightKey.isDown - Input.leftKey.isDown) * this.panSpeed * this.unitHeight
        let vy = (Input.downKey.isDown - Input.upKey.isDown) * this.panSpeed * this.unitHeight
        this.pos.x += vx * dt
        this.pos.y += vy * dt
        
        this.cam.centerOn(this.pos.x * Physics.unit, this.pos.y * Physics.unit)
        this.cam.setZoom(this.height / (this.unitHeight * Physics.unit))
    }
}