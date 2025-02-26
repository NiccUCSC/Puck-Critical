class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.spawnTime = 0.025
        this.timeToSpawn = 0
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('puck', 'ball.png')
    }

    create() {
        play = this
        Physics.init(this)
        Camera.init(this)

        this.pucks = new Set()

    }


    // called before physics step
    beforeStep(time, dt) {
        play.timeToSpawn += dt
        if (play.timeToSpawn > play.spawnTime) {
            play.timeToSpawn -= play.spawnTime
            let newPuck = new Puck(play, 0, 0)
            let vx = 5 * Math.cos(time)
            let vy = 5 * Math.sin(time)
            newPuck.setVelocity(vx, vy)
            play.pucks.add(newPuck)
        }
        for (let puck of play.pucks) puck.physicsUpdate()

    }

    // called after physics step
    afterStep(time, dt) { }

    update(time, dt) {
        time /= 1000
        dt /= 1000
        if (1/dt < 100) console.warn(`Pucks: ${this.pucks.length}, Framerate: ${1/dt}`)

        Physics.update(time, dt, this.beforeStep, this.afterStep)
        Camera.update(time, dt)

        for (let puck of this.pucks) puck.visualUpdate()
    }
}