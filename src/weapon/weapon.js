export default class Weapon {
    constructor() {
        this.fps = 20
        this.frameTimer = 0
        this.frameInterval = 1000 / this.fps
        this.active = false
    }

    update(deltaTime) {
        if (this.active) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++
                } else {
                    this.frameX = 0
                    this.active = false
                }
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
}
