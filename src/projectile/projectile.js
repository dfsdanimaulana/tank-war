export default class Projectile {
    constructor(game) {
        this.game = game
        this.width = 10
        this.height = 10
        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 10
        this.free = true
        this.onAir = false
    }
    update() {
        if (
            this.y < -this.height ||
            this.y > this.game.height ||
            this.x < -this.width ||
            this.x > this.game.width
        ) {
            this.reset()
        }
        this.x += this.speedX
        this.y += this.speedY
    }
    draw(ctx) {
        if (!this.free) {
            const centerX = this.x + this.width * 0.5
            const centerY = this.y + this.height * 0.5
            const radius = this.width * 0.5
            ctx.save()
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.strokeStyle = this.color
            ctx.stroke()
            ctx.restore()
        }
    }
    start(x, y) {
        this.x = x - this.width * 0.5
        this.y = y - this.height * 0.5
        this.free = false
    }
    reset() {
        this.free = true
        this.onAir = false
        this.speedX = 0
        this.speedY = 0
    }
    updateDirection(direction) {
        switch (direction) {
            case 'right':
                this.speedX = this.maxSpeed
                break
            case 'left':
                this.speedX = -this.maxSpeed
                break
            case 'up':
                this.speedY = -this.maxSpeed
                break
            case 'down':
                this.speedY = this.maxSpeed
                break
            default:
                this.speedX = 0
                this.speedY = 0
        }
    }
}
