class Input {
    static init(playScene) {
        let addKey = playScene.input.keyboard.addKey
        let KeyCodes = Phaser.Input.Keyboard.KeyCodes

        this.upKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.downKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.leftKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.rightKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.debugKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.timeScaleUpKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA)
        this.timeScaleDownKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)
        this.zoomInKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CLOSED_BRACKET)
        this.zoomOutKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.OPEN_BRACKET)
        this.restartKey = playScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)


        this.debugKey.on('down', () => { Physics.toggleDebug() })
    
        this.timeScaleUpKey.on('down', () => { Physics.decreaseTimeScale() })
    
        this.timeScaleDownKey.on('down', () => { Physics.increaseTimeScale() })
    
        this.zoomInKey.on('down', () => { Camera.zoomIn() })

        this.zoomOutKey.on('down', () => { Camera.zoomOut() })
    
        this.restartKey.on('down', () => { })
    }
}