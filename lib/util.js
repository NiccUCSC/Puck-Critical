function getAngularDiff(angle1, angle2) {
    return Math.atan2(Math.sin(angle1 - angle2), Math.cos(angle1 - angle2))
}

function generateGameID(length, segments) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$'
    const power = chars.length
    let id = ""
    for (let i = 0; i < segments; i++) {
        for (let j = 0; j < length; j++) {
            let char = chars.charAt(Math.floor(Math.random() * power))  // Do not link to phasers random gen
            id += char
        }
        if (i < segments - 1) id += '-'
    }
    return id
}

function stringToSeed(string) {
    const num = 0x9e3779b97f4a7c15n
    let hash = 0
    for (let i = 0; i < string.length; i++) {
        let charCode = string.charCodeAt(i)
        hash = (hash << 5) - hash + charCode
        hash |= 0; 
    }
    return (BigInt(hash) * num) & 0xFFFFFFFFFFFFFFFFn
}

function ParseDigits(num, digits) {
    num = Math.round(num)
    let parsed = []
    for (let i = 0; i < digits; i++) {
        let digit = num % 10
        num = (num-digit) / 10
        parsed.push(digit)
    }
    parsed.reverse()
    return parsed
}

function map(x, x0, x1, y0 = 0, y1 = 1) {
    return (x - x0) / (x1 - x0) * (y1 - y0) + y0
}

function clampedMap(x, x0, x1, y0 = 0, y1 = 1) {
    return Phaser.Math.Clamp((x - x0) / (x1 - x0) * (y1 - y0) + y0, y0, y1)
}

function letterToIndex(letter) {
    if (typeof letter !== 'string' || letter.length !== 1) {
        throw new Error('Input must be a single letter')
    }
    letter = letter.toLowerCase()
    if (letter < 'a' || letter > 'z') {
        throw new Error('Input must be a letter from A to Z')
    }
    return letter.charCodeAt(0) - 'a'.charCodeAt(0)
}