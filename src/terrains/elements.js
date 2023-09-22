import Terrains from './terrains.js'

export class Grass extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 0
    }
}
export class Wood extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 1

        this.randomDegree()
    }
}
export class Tree extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 2

        this.getHit = false
        this.growTimer = 0
        this.growInterval = 10000
        this.randomDegree()
    }
    update(deltaTime) {
        super.update()
        // re-grow the tree after get hit
        if (this.getHit) {
            if (this.growTimer > this.growInterval) {
                this.getHit = false
                this.growTimer = 0
            } else {
                this.growTimer += deltaTime
            }
        }

        // collision tree - player
        if (this.checkTerrainCollision(this.game.player)) {
            this.getHit = true
        }

        // collision tree - enemies
        this.game.enemies.forEach((enemy) => {
            if (this.checkTerrainCollision(enemy)) {
                this.getHit = true
            }
        })
        if (this.getHit) {
            this.frameX = 1
        } else {
            this.frameX = 2
        }
    }
}
export class Road extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 3
    }
}
export class Turn extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 4
    }
}
export class T_Junction extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 5
    }
}
export class Crossroad extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 6
    }
}
