class PuckBouncer extends Phaser.GameObjects.Sprite {
    static instance_id = 0

    static defaultParams = {
        dir: { x: 1, y: 0 },
    }

    constructor(scene, x, y, params={}) {
        params = {...PuckBouncer.defaultParams, ...params}
        super(scene, 0, 0, "puckBouncer")
        scene.add.existing(this)
        this.scene = scene
        this.setDepth(4)
        this.setOrigin(0.5, 0.5)
        this.instance_id = PuckBouncer.instance_id++

        // instance vars
        this.dir            = planck.Vec2(params.dir.x, params.dir.y)
        this.dir.normalize()

        // body of the piston base
        this.physicsBody = Physics.world.createBody({
            type: "static",
            position: planck.Vec2(x, y),
        })
        this.physicsBody.createFixture({
            shape: planck.Box(0.25, 1, planck.Vec2(-0.25, 0)),
        })

        // body of the piston
        this.pistonBody = Physics.world.createBody({
            type: "kinematic",
            position: planck.Vec2(x, y),
        })
        this.pistonBody.createFixture({
            shape: planck.Box(0.25, 1, planck.Vec2(0.25, 0)),
            type: 'kinematic'
        })
    }


    physicsUpdate(time, dt) {

        let angle = Math.atan2(this.dir.y, this.dir.x)
        this.physicsBody.setAngle(angle)
        this.pistonBody.setAngle(angle)
        this.pistonBody.setLinearVelocity(this.dir.clone().mul(4))
        this.setRotation(angle)
    }

    afterPhysicsUpdate(time, dt) {
        this.pistonBody.setPosition(this.physicsBody.getPosition())
    }

    visualUpdate() {
        let aproxPos = this.physicsBody.getPosition().clone()
        let deltaPos = this.physicsBody.getLinearVelocity().clone()

        deltaPos.mul(Physics.lagTime)
        aproxPos.add(deltaPos)

        this.setPosition(aproxPos.x * Physics.unit, aproxPos.y * Physics.unit)
        this.setDisplaySize(Physics.unit, 2 * Physics.unit)
    }

    destroy() {
        this.scene.machines.delete(this)
        Physics.world.destroyBody(this.physicsBody)
        Physics.world.destroyBody(this.pistonBody)
        this.physicsBody.delete
        super.destroy()
    }
}