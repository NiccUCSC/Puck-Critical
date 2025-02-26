class Input {
    static init(playScene) {
        let addKey = keycode => playScene.input.keyboard.addKey(keycode)
        let KeyCodes = Phaser.Input.Keyboard.KeyCodes

        this.upKey = addKey(KeyCodes.W)
        this.downKey = addKey(KeyCodes.S)
        this.leftKey = addKey(KeyCodes.A)
        this.rightKey = addKey(KeyCodes.D)

        this.debugKey = addKey(KeyCodes.E)
        this.timeScaleUpKey = addKey(KeyCodes.COMMA)
        this.timeScaleDownKey = addKey(KeyCodes.PERIOD)
        this.zoomInKey = addKey(KeyCodes.CLOSED_BRACKET)
        this.zoomOutKey = addKey(KeyCodes.OPEN_BRACKET)
        this.restartKey = addKey(KeyCodes.R)


        this.debugKey.on('down', () => { Physics.toggleDebug() })
    
        this.timeScaleUpKey.on('down', () => { Physics.decreaseTimeScale() })
    
        this.timeScaleDownKey.on('down', () => { Physics.increaseTimeScale() })
    
        this.zoomInKey.on('down', () => { Camera.zoomIn() })

        this.zoomOutKey.on('down', () => { Camera.zoomOut() })
    
        this.restartKey.on('down', () => { })
    }
}