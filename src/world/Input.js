class Input {
    static init(playScene) {
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