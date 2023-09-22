import { NormalWeapon, MovingWeapon, RocketWeapon } from './enemyWeapon.js'
import '../prototype.js'

export class EnemyRedWeapon1_1 extends NormalWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed1_1,
            enemyWeaponPurple1_1,
            enemyWeaponGreen1_1,
            enemyWeaponDesert1_1,
        ]
        this.image = this.images.getRandomValue()
    }
}
export class EnemyRedWeapon1_2 extends NormalWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed1_2,
            enemyWeaponPurple1_2,
            enemyWeaponGreen1_2,
            enemyWeaponDesert1_2,
        ]
        this.image = this.images.getRandomValue()
    }
}
export class EnemyRedWeapon1_3 extends NormalWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed1_3,
            enemyWeaponPurple1_3,
            enemyWeaponGreen1_3,
            enemyWeaponDesert1_3,
        ]
        this.image = this.images.getRandomValue()
    }
}
export class EnemyRedWeapon1_4 extends NormalWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed1_4,
            enemyWeaponPurple1_4,
            enemyWeaponGreen1_4,
            enemyWeaponDesert1_4,
        ]
        this.image = this.images.getRandomValue()
    }
}
export class EnemyRedWeapon2_1 extends MovingWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed2_1,
            enemyWeaponPurple2_1,
            enemyWeaponGreen2_1,
            enemyWeaponDesert2_1,
        ]
        this.image = this.images.getRandomValue()
        this.maxFrame = 10
    }
}
export class EnemyRedWeapon2_2 extends MovingWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed2_2,
            enemyWeaponPurple2_2,
            enemyWeaponGreen2_2,
            enemyWeaponDesert2_2,
        ]
        this.image = this.images.getRandomValue()
        this.maxFrame = 10
    }
}
export class EnemyRedWeapon2_3 extends MovingWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed2_3,
            enemyWeaponPurple2_3,
            enemyWeaponGreen2_3,
            enemyWeaponDesert2_3,
        ]
        this.image = this.images.getRandomValue()

        this.maxFrame = 10
    }
}
export class EnemyRedWeapon2_4 extends MovingWeapon {
    constructor(enemy) {
        super(enemy)
        this.images = [
            enemyWeaponRed2_4,
            enemyWeaponPurple2_4,
            enemyWeaponGreen2_4,
            enemyWeaponDesert2_4,
        ]
        this.image = this.images.getRandomValue()

        this.maxFrame = 10
    }
}
