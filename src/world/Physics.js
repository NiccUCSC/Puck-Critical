class Physics {
    static unit         = 64
    static tickRate     = 64
    static tick         = 0
    static time         = 0

    static init(debugScene) {
        this.world = planck.World(planck.Vec2(0, 0))    // Gravity
        this.lagTime    = 0                             // time since last tick
        this.tickTime   = 1 / this.tickRate             // time between ticks
        this.timeScale  = 1                             // physics time scale
    
        this.debugGraphics = debugScene.add.graphics()
        this.debugMode = true
    }

    static update(time, dt, beforeStep, afterStep) {
        for (this.lagTime += dt * this.timeScale; this.lagTime >= this.tickTime; this.lagTime -= this.tickTime) {
            this.tick++
            this.time += this.tickTime
            beforeStep(this.time, this.tickTime)
            this.world.step(this.tickTime)            
            afterStep(this.time, this.tickTime)
            if (this.debugMode) this.drawDebugGraphics()
        }
    }

    static drawDebugGraphics() {
        let world = this.world
        let graphics = this.debugGraphics
        graphics.clear()
        graphics.depth = 1000
    
        // Iterate over all Box2D bodies
        for (let body = world.getBodyList(); body; body = body.getNext()) {
            const pos = body.getPosition()
            const angle = body.getAngle() // Get body's rotation in radians
    
            // Convert Box2D world coordinates to Phaser pixels (1m = 16px)
            const x = pos.x * this.unit
            const y = pos.y * this.unit
    
            for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
                if (fixture.isSensor() == true) {
                    graphics.lineStyle(1, 0xff00ff, 1)
                    graphics.fillStyle(0xff00ff, 0.2)
                } else {
                    graphics.lineStyle(1, 0x00ff00, 1)
                    graphics.fillStyle(0x00ff00, 0.2)
                }
    
                const shape = fixture.getShape()
    
                if (shape.getType() == 'polygon') { // Polygons & Boxes
                    const vertices = shape.m_vertices.map(v => {
                        // Rotate the vertex around (0,0) and apply body's position
                        const rotatedX = v.x * Math.cos(angle) - v.y * Math.sin(angle)
                        const rotatedY = v.x * Math.sin(angle) + v.y * Math.cos(angle)
    
                        return {
                            x: (rotatedX + pos.x) * this.unit, 
                            y: (rotatedY + pos.y) * this.unit
                        }
                    })
    
                    graphics.beginPath()
                    graphics.moveTo(vertices[0].x, vertices[0].y)
    
                    for (let i = 1; i < vertices.length; i++) {
                        graphics.lineTo(vertices[i].x, vertices[i].y)
                    }
    
                    graphics.closePath()
                    graphics.strokePath()
                    graphics.fillPath()
                }
                else if (shape.getType() == 'circle') { // Circles
                    const radius = shape.m_radius * this.unit
                    graphics.strokeCircle(x, y, radius)
                    graphics.fillCircle(x, y, radius)
                }
            }
        }
    }
}