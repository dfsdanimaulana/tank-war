import {
    Grass,
    Wood,
    Tree,
    Road,
    Turn,
    T_Junction,
    Crossroad,
} from './elements.js'
import {
    OneSideWall,
    TwoSideWall,
    ThreeSideWall,
    FourSideWall,
    FourEndWall,
    OneSideTower,
    TwoSideTower,
    ThreeSideTower,
    FourSideTower,
    FourEndTower,
    TurnWall,
    TurnTower,
} from './walls.js'

export default class TerrainStructure {
    constructor(game) {
        this.game = game
        this.terrainSize = 128
        this.gridSize = 10
        this.type = 0
        this.map = []
        this.terrainClasses = [
            Grass, // 0
            Wood, // 1
            Tree, // 2
            Road, // 3
            Turn, // 4
            T_Junction, // 5
            Crossroad, // 6
            OneSideWall, // 7
            TwoSideWall, // 8
            ThreeSideWall, // 9
            FourSideWall, // 10
            FourEndWall, // 11
            OneSideTower, // 12
            TwoSideTower, // 13
            ThreeSideTower, // 14
            FourSideTower, // 15
            FourEndTower, // 16
            TurnWall, // 17
            TurnTower, // 18
        ]

        // TODO: create larger terrains 20x20
        // TODO: Player relative camera in 10 block
    }
    generateTerrain() {
        for (let x = 0; x < this.terrainPattern.length; x++) {
            this.map[x] = []
            for (let y = 0; y < this.terrainPattern[x].length; y++) {
                const value = this.terrainPattern[y][x]
                if (Array.isArray(value)) {
                    this.map[x][y] = new this.terrainClasses[value[0]](
                        this.game,
                        x * this.terrainSize,
                        y * this.terrainSize,
                        value[1],
                        this.type,
                    )
                } else {
                    this.map[x][y] = new this.terrainClasses[value](
                        this.game,
                        x * this.terrainSize,
                        y * this.terrainSize,
                        0,
                        this.type,
                    )
                }
            }
        }
    }
    update(deltaTime) {
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const terrain = this.map[x][y]
                terrain.update(deltaTime)
            }
        }
    }
    draw(ctx) {
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const terrain = this.map[x][y]
                terrain.draw(ctx)
            }
        }
    }
}
