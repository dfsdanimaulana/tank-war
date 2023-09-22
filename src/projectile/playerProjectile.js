import Projectile from './projectile.js'
import { findNearestObject } from '../utils.js'

class PlayerProjectile extends Projectile {
    constructor(game) {
        super(game)
        this.color = 'gold'
        this.damage = 1
    }
}

export class NormalPlayerProjectile extends PlayerProjectile {
    constructor(game) {
        super(game)
        this.type = 'NormalProjectile'
    }
    update() {
        super.update()
        if (!this.free) {
            if (!this.onAir) {
                this.updateDirection(this.game.player.direction)
                this.onAir = true
            }
        }
    }
}

export class RocketPlayerProjectile extends PlayerProjectile {
    constructor(game) {
        super(game)
        this.type = 'RocketProjectile'
    }
    update() {
        super.update()
        if (this.game.enemies.length > 0) {
            if (!this.free) {
                if (!this.onAir) {
                    this.onAir = true
                }
                // get nearest enemy coordinate
                const enemy = findNearestObject(
                    this.game.enemies,
                    this.x,
                    this.y,
                )

                // shot the projectile to nearest enemyrol
                const eX = enemy.x + enemy.width * 0.5
                const eY = enemy.y + enemy.height * 0.5

                const pX = this.x + this.width * 0.5
                const pY = this.y + this.height * 0.5

                const deltaX = eX - pX
                const deltaY = eY - pY
                const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

                this.x += (deltaX / distance) * this.maxSpeed
                this.y += (deltaY / distance) * this.maxSpeed
            }
        }
    }
}
