class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.spawnTime = 0.5
        this.timeToSpawn = 0
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('puck', 'ball.png')
        this.load.image('puckSpawner', 'PuckTemp.png')
        this.load.image('puckBouncer', 'bumper.jpeg')
        this.load.image('puckGoal', 'goal.jpeg')
    }

    create() {
        play = this
        Physics.init(this)
        Camera.init(this)
        Input.init(this)

        this.pucks = new Set()
        this.machines = new Set()
        let spawner = new PuckSpawner(play, 0, 0, { dir: {x: 1, y: 1} })
        let bouncer = new PuckBouncer(play, 2, 3, { dir: {x: 0.25, y: -1} })
        let goal = new PuckGoal(play, 4, -8, { dir: {x: 1, y: 0} })
        let goal1 = new PuckGoal(play, 8, -4, { dir: {x: 1, y: 0} })
        this.machines.add(spawner)
        this.machines.add(bouncer)
        this.machines.add(goal)
        this.machines.add(goal1)
    }


    // called before physics step
    beforeStep(time, dt) {
        play.pucks.forEach(puck => puck.physicsUpdate(time, dt))
        play.machines.forEach(machine => machine.physicsUpdate(time, dt))

    }

    // called after physics step
    afterStep(time, dt) { 
        play.machines.forEach(machine => machine.afterPhysicsUpdate(time, dt))
    }

    update(time, dt) {
        time /= 1000
        dt /= 1000
        if (1/dt < 100) console.warn(`Pucks: ${this.pucks.length}, Framerate: ${1/dt}`)

        Physics.update(time, dt, this.beforeStep, this.afterStep)
        Camera.update(time, dt)

        play.pucks.forEach(puck => puck.visualUpdate())
        play.machines.forEach(machine => machine.visualUpdate())   
    }
}