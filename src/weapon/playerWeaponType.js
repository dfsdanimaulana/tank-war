import { NormalPlayerWeapon, RocketPlayerWeapon } from './playerWeapon.js'

export class PlayerWeapon1_1 extends NormalPlayerWeapon {
    constructor(game) {
        super(game)
        this.image = playerWeaponBlue1_1
    }
}
export class PlayerWeapon1_2 extends NormalPlayerWeapon {
    constructor(game) {
        super(game)
        this.image = playerWeaponBlue1_2
    }
}
export class PlayerWeapon1_3 extends NormalPlayerWeapon {
    constructor(game) {
        super(game)
        this.image = playerWeaponBlue1_3
    }
}
export class PlayerWeapon2_1 extends NormalPlayerWeapon {
    constructor(game) {
        super(game)
        this.image = playerWeaponBlue2_1
        this.maxFrame = 10
    }
}
export class PlayerWeapon2_2 extends NormalPlayerWeapon {
    constructor(game) {
        super(game)
        this.image = playerWeaponBlue2_2
        this.maxFrame = 10
    }
}
export class PlayerWeapon2_3 extends RocketPlayerWeapon {
    constructor(game) {
        super(game)
        this.image = playerWeaponBlue2_3
        this.maxFrame = 10
    }
}
