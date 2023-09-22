import Terrains from './terrains.js'

class Walls extends Terrains {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.images = [
            towers_walls_snow,
            towers_walls_grass_light_1,
            towers_walls_grass_light_2,
            towers_walls_grass_dark_1,
            towers_walls_grass_dark_2,
        ]
        this.image = this.images[this.type]
    }

    resolveCollisionWithWall(obj) {
        if (obj.speedX > 0 && obj.x + obj.width > this.x) {
            obj.speedX = -obj.speedX // Bounce left
        } else if (obj.speedX < 0 && obj.x < this.x + this.width) {
            obj.speedX = -obj.speedX // Bounce right
        }

        if (obj.speedY > 0 && obj.y + obj.height > this.y) {
            obj.speedY = -obj.speedY // Bounce up
        } else if (obj.speedY < 0 && obj.y < this.y + this.height) {
            obj.speedY = -obj.speedY // Bounce down
        }
    }

    update(deltaTime) {
        super.update(deltaTime)
        //Check collision walls - player
        if (this.game.checkCircleCollision(this, this.game.player)) {
            this.game.player = this.game.bounceObject(this.game.player)
        }

        // Check collision walls - enemy
        this.game.enemies.forEach((enemy) => {
            if (this.game.checkCircleCollision(this, enemy)) {
                // Prevent enemy overlapping with walls when summon
                if (!enemy.drew) {
                    enemy.x = Math.random() * (this.game.width - enemy.width)
                    enemy.y = Math.random() * (this.game.height - enemy.height)
                }
                this.resolveCollisionWithWall(enemy)
            }
        })

        // Check collision walls - enemy projectile
        this.game.enemies.forEach((enemy) => {
            enemy.projectilesPool.forEach((projectile) => {
                if (this.game.checkCollision(this, projectile)) {
                    projectile.reset()
                }
            })
        })

        // Check collision walls - player projectile
        this.game.player.projectilesPool.forEach((projectile) => {
            if (this.game.checkCollision(this, projectile)) {
                projectile.reset()
            }
        })
    }
}

class Wall extends Walls {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameY = 4
    }
}

class Tower extends Walls {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameY = 3
    }
}

export class OneSideWall extends Wall {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 1
    }
}
export class TwoSideWall extends Wall {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 2
    }
}
export class ThreeSideWall extends Wall {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 4
    }
}
export class FourSideWall extends Wall {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 5
    }
}
export class FourEndWall extends Wall {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 0
    }
}
export class TurnWall extends Wall {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 3
    }
}

export class OneSideTower extends Tower {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 1
    }
}
export class TwoSideTower extends Tower {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 2
    }
}
export class ThreeSideTower extends Tower {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 4
    }
}
export class FourSideTower extends Tower {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 5
    }
}
export class FourEndTower extends Tower {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 0
    }
}
export class TurnTower extends Tower {
    constructor(game, x, y, degree, type) {
        super(game, x, y, degree, type)
        this.frameX = 3
    }
}
