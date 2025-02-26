class PuckGoal extends Phaser.GameObjects.Sprite {
    static instance_id = 0

    static defaultParams = {
        dir: { x: 1, y: 0 },
    }

    constructor(scene, x, y, params={}) {
        params = {...PuckGoal.defaultParams, ...params}
        super(scene, 0, 0, "puckGoal")
        scene.add.existing(this)
        this.scene = scene
        this.setDepth(5)
        this.setOrigin(0.5, 0.5)
        this.instance_id = PuckGoal.instance_id++

        // instance vars
        this.dir            = planck.Vec2(params.dir.x, params.dir.y)
        this.dir.normalize()

        this.physicsBody = Physics.world.createBody({
            type: "static",
            position: planck.Vec2(x, y),
        })
        this.physicsBody.createFixture({
            shape: planck.Box(0.3, 1.8, planck.Vec2(-0.5, 0)),
            isSensor: true,
        })
        this.physicsBody.createFixture({
            shape: planck.Box(0.1, 2, planck.Vec2(-0.9, 0)),
        })
        this.physicsBody.createFixture({
            shape: planck.Box(1, 0.1, planck.Vec2(0, -1.9)),
        })
        this.physicsBody.createFixture({
            shape: planck.Box(1, 0.1, planck.Vec2(0, 1.9)),
        })
    }

    physicsUpdate(time, dt) {
        let angle = Math.atan2(this.dir.y, this.dir.x)
        this.physicsBody.setAngle(angle)
        this.setRotation(angle)
    }

    afterPhysicsUpdate(time, dt) { }

    visualUpdate() {
        let aproxPos = this.physicsBody.getPosition().clone()
        let deltaPos = this.physicsBody.getLinearVelocity().clone()

        deltaPos.mul(Physics.lagTime)
        aproxPos.add(deltaPos)

        this.setPosition(aproxPos.x * Physics.unit, aproxPos.y * Physics.unit)
        this.setDisplaySize(2*Physics.unit, 4*Physics.unit)
    }

    destroy() {
        this.scene.machines.delete(this)
        Physics.world.destroyBody(this.physicsBody)
        this.physicsBody.delete
        super.destroy()
    }
}