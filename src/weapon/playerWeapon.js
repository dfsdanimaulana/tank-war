import Weapon from './weapon.js'
import { findNearestObject, calculateAngle } from '../utils.js'

class PlayerWeapon extends Weapon {
    constructor(game) {
        super()
        this.game = game
        this.spriteWidth = 128
        this.spriteHeight = 128
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 7
        this.width = this.spriteWidth * this.game.scale
        this.height = this.spriteHeight * this.game.scale
        this.degree = 0
        this.initialDegree = this.degree
        this.degreeModifier = 0
        this.parentDegreeModifier = 1
        // TODO: set different damage for different weapon
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(
            this.game.player.x + this.width * 0.5,
            this.game.player.y + this.height * 0.5,
        )
        ctx.rotate(
            ((this.game.player.degree * this.parentDegreeModifier +
                this.degree * this.degreeModifier) *
                Math.PI) /
                180,
        )
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            -this.width * 0.5,
            -this.height * 0.5,
            this.width,
            this.height,
        )
        ctx.restore()
    }
}

export class NormalPlayerWeapon extends PlayerWeapon {
    constructor(game) {
        super(game)
        this.type = 'NormalWeapon'
    }
}

export class RocketPlayerWeapon extends PlayerWeapon {
    constructor(game) {
        super(game)
        this.type = 'RocketWeapon'
        this.degreeModifier = 1
        this.parentDegreeModifier = 0
    }
    update(deltaTime) {
        super.update(deltaTime)

        const pX = this.game.player.x
        const pY = this.game.player.y

        if (this.game.enemies.length > 0) {
            // get nearest enemy coordinate
            const enemy = findNearestObject(this.game.enemies, pX, pY)

            // calculate angle with nearest enemy
            const angle = calculateAngle(pX, pY, enemy.x, enemy.y)
            this.degree = angle
        }
    }
}
