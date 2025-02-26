class PuckSpawner extends Phaser.GameObjects.Sprite {
    static instance_id = 0

    static defaultParams = {
        dir: { x: 1, y: 0 },
    }

    constructor(scene, x, y, params={}) {
        params = {...PuckSpawner.defaultParams, ...params}
        super(scene, 0, 0, "puckSpawner")
        scene.add.existing(this)
        this.scene = scene
        this.setDepth(5)
        this.setOrigin(0.5, 0.5)
        this.instance_id = PuckSpawner.instance_id++

        // instance vars
        this.timeToSpawn    = 1
        this.spawnDelay     = 1
        this.launchSpeed    = 5
        this.dir            = planck.Vec2(params.dir.x, params.dir.y)
        this.dir.normalize()

        this.physicsBody = Physics.world.createBody({
            type: "static",
            position: planck.Vec2(x, y),
        })
        this.physicsBody.createFixture({
            shape: planck.Box(0.5, 0.5),
            isSensor: true,
        })
    }


    physicsUpdate(time, dt) {
        this.timeToSpawn -= dt
        if (this.timeToSpawn <= 0) {
            this.timeToSpawn += this.spawnDelay

            let vx = this.dir.x * this.launchSpeed
            let vy = this.dir.y * this.launchSpeed
            const pos = this.physicsBody.getPosition()
            let newPuck = new Puck(this.scene, pos.x, pos.y, {
                spawnVelocity: planck.Vec2(vx, vy)
            })

            play.pucks.add(newPuck)
        }

        let angle = Math.atan2(this.dir.y, this.dir.x)
        this.physicsBody.setAngle(angle)
        this.setRotation(angle)
    }

    visualUpdate() {
        let aproxPos = this.physicsBody.getPosition().clone()
        let deltaPos = this.physicsBody.getLinearVelocity().clone()

        deltaPos.mul(Physics.lagTime)
        aproxPos.add(deltaPos)

        this.setPosition(aproxPos.x * Physics.unit, aproxPos.y * Physics.unit)
        this.setDisplaySize(Physics.unit, Physics.unit)
    }

    destroy() {
        this.scene.machines.delete(this)
        Physics.world.destroyBody(this.physicsBody)
        this.physicsBody.delete
        super.destroy()
    }
}