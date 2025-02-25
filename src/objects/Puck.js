class Puck extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, 0, 0, "puck")
        scene.add.existing(this)
        this.scene = scene
        this.setDepth(10)
        this.setOrigin(0.5, 0.5)


        this.physicsBody = Physics.world.createBody({
            type: "dynamic",
            position: planck.Vec2(x, y),


        })
        this.physicsBody.createFixture({
            shape: planck.Circle(0.5),
            friction: 0,
            restitution: 1,
        })
        this.physicsBody.setMassData({
            mass: 1,
            center: planck.Vec2(0, 0),
            I: 1,
        })

        this.frictionCoef = 1
    }

    setVelocity(vx, vy) {
        this.physicsBody.setLinearVelocity(planck.Vec2(vx, vy))
    }

    physicsUpdate() {
        let pos = this.physicsBody.getPosition()
        let vel = this.physicsBody.getLinearVelocity()
        let speed = Math.sqrt(vel.x*vel.x + vel.y*vel.y)

        let friction = vel.clone()
        friction.normalize()
        friction.mul(-Math.min(speed, 1) * this.frictionCoef)

        let forces = [
            friction,
        ]

        for (let force of forces) this.physicsBody.applyForce(force, pos)
    }

    visualUpdate() {
        let aproxPos = this.physicsBody.getPosition().clone()
        let deltaPos = this.physicsBody.getLinearVelocity().clone()

        deltaPos.mul(Physics.lagTime)
        aproxPos.add(deltaPos)

        this.setPosition(aproxPos.x * Physics.unit, aproxPos.y * Physics.unit)
        this.setDisplaySize(Physics.unit, Physics.unit)
    }
}