import Projectile from './projectile.js'

class EnemyProjectile extends Projectile {
    constructor(game) {
        super(game)
        this.color = 'red'
        this.damage = 1
    }
    update() {
        super.update()
        // Check collision player - projectile
        if (!this.free && this.game.checkCollision(this, this.game.player)) {
            if (this.game.player.shield) {
                this.game.player.shield = false
            } else {
                this.game.player.lives--
            }
            this.reset()
        }
    }
}

export class NormalEnemyProjectile extends EnemyProjectile {
    constructor(game) {
        super(game)
    }
    update(enemy) {
        super.update()
        if (!this.free) {
            if (!this.onAir) {
                this.updateDirection(enemy.direction)
                this.onAir = true
            }
        }
    }
}

export class MovingEnemyProjectile extends EnemyProjectile {
    constructor(game) {
        super(game)
    }
    update(enemy) {
        super.update()
        if (!this.free) {
            if (!this.onAir) {
                const totalDegree =
                    enemy.weapon.degreeModifier * enemy.weapon.degree
                const degree =
                    totalDegree >= 360 ? totalDegree - 360 : totalDegree

                if (degree >= 22.5 && degree < 67.5) {
                    // "up-right"
                    this.speedX = this.maxSpeed
                    this.speedY = -this.maxSpeed
                } else if (degree >= 67.5 && degree < 112.5) {
                    // "right"
                    this.speedX = this.maxSpeed
                    this.speedY = 0
                } else if (degree >= 112.5 && degree < 157.5) {
                    // "down-right"
                    this.speedX = this.maxSpeed
                    this.speedY = this.maxSpeed
                } else if (degree >= 157.5 && degree < 202.5) {
                    // "down"
                    this.speedX = 0
                    this.speedY = this.maxSpeed
                } else if (degree >= 202.5 && degree < 247.5) {
                    // "down-left"
                    this.speedX = -this.maxSpeed
                    this.speedY = this.maxSpeed
                } else if (degree >= 247.5 && degree < 292.5) {
                    // "left"
                    this.speedX = -this.maxSpeed
                    this.speedY = 0
                } else if (degree >= 292.5 && degree < 337.5) {
                    // "up-left"
                    this.speedX = -this.maxSpeed
                    this.speedY = -this.maxSpeed
                } else {
                    // "up"
                    this.speedX = 0
                    this.speedY = -this.maxSpeed
                }

                this.onAir = true
            }
        }
    }
}

export class RocketEnemyProjectile extends EnemyProjectile {
    constructor(game) {
        super(game)
    }
    update() {
        super.update()
        if (!this.free) {
            // shot the projectile to player
            const deltaX = this.x - this.game.player.x
            const deltaY = this.y - this.game.player.y
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

            this.x += (deltaX / distance) * this.maxSpeed
            this.y += (deltaY / distance) * this.maxSpeed
        }
    }
}
