export default class Collision {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.spriteWidth = 200
        this.spriteHight = 179
        this.image = boom
        this.frameX = 0
        this.timeSinceLastFrame = 0
        this.frameXInterval = 200
        this.markedForDeletion = false
    }
    update(deltaTime) {
        this.timeSinceLastFrame += deltaTime
        if (this.timeSinceLastFrame > this.frameXInterval) {
            this.frameX++
            this.timeSinceLastFrame = 0
            if (this.frameX > 5) {
                this.markedForDeletion = true
            }
        }
    }
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHight,
            this.x,
            this.y - this.size / 4,
            this.size,
            this.size,
        )
    }
}
