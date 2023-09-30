import TerrainStructure from '../terrainStructure.js'
/* 
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
    FourEndTower // 16
    TurnWall, // 17
    TurnTower // 18
*/

export default class GrassLight extends TerrainStructure {
    constructor(game) {
        super(game)
        this.type = 1
        this.terrainPattern = [
            // [indexOfTerrainClasses, degree]
            [
                // top left to right - row 1
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
                [2, 0],
            ],
            [
                // top left to right - row 2
                [2, 0],
                [0, 0],
                [17, 270],
                [8, 0],
                [8, 0],
                [8, 0],
                [8, 0],
                [8, 0],
                [17, 0],
                [2, 0],
            ],
            [
                // top left to right - row 3
                [2, 0],
                [2, 0],
                [7, 270],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [16, 0],
                [8, 270],
                [2, 0],
            ],
            [
                // middle left to right - row 4
                [3, 90],
                [5, 90],
                [3, 90],
                [3, 90],
                [4, 90],
                [0, 0],
                [0, 0],
                [0, 0],
                [8, 270],
                [2, 0],
            ],
            [
                // middle left to right - row 5

                [2, 0],
                [3, 0],
                [7, 90],
                [0, 0],
                [3, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [8, 90],
                [2, 0],
            ],
            [
                // middle left to right - row 6

                [2, 0],
                [3, 0],
                [18, 180],
                [7, 180],
                [3, 0],
                [7, 0],
                [8, 0],
                [8, 0],
                [18, 90],
                [2, 0],
            ],
            [
                // middle left to right - row 7
                [2, 0],
                [3, 0],
                [1, 0],
                [0, 0],
                [3, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [2, 0],
                [2, 0],
            ],
            [
                // bottom left to right - row 8
                [2, 0],
                [3, 0],
                [0, 0],
                [0, 0],
                [3, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [2, 0],
                [2, 0],
            ],
            [
                // bottom left to right - row 9
                [2, 0],
                [3, 0],
                [0, 0],
                [0, 0],
                [3, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [2, 0],
            ],
            [
                // bottom left to right - row 10
                [3, 90],
                [5, 270],
                [3, 90],
                [3, 90],
                [6, 90],
                [3, 90],
                [3, 90],
                [3, 90],
                [3, 90],
                [3, 90],
            ],
        ]
        this.generateTerrain()
    }
}
