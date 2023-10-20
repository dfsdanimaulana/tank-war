import {
    LiveBonus,
    ShieldBonus,
    UpgradeWeaponBonus,
    RocketBonus,
} from './src/bonus.js'
import { checkLocalStorage, updateLocalStorage } from './src/utils.js'
import Enemy from './src/enemy.js'
import InputHandler from './src/input.js'
import Collision from './src/collision.js'
import Player from './src/player.js'
import Snow from './src/terrains/type/snow.js'
import GrassLight from './src/terrains/type/grassLight.js'
import GrassLight2 from './src/terrains/type/grassLight2.js'
import GrassDark from './src/terrains/type/grassDark.js'
import GrassDark2 from './src/terrains/type/grassDark2.js'
import UI from './src/UI.js'
import './src/prototype.js'

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.scale = 1
        this.initialize()
    }

    initialize() {
        this.player = new Player(this)
        this.input = new InputHandler()
        this.UI = new UI(this)

        this.terrainsType = [
            new Snow(this),
            new GrassLight(this),
            new GrassLight2(this),
            new GrassDark(this),
            new GrassDark2(this),
        ]

        this.terrains = this.getRandomTerrain()

        this.enemies = []
        this.maxEnemies = 1 // max enemies for first wave

        this.collisions = []

        this.score = 0
        this.bestScore = this.getBestScore()
        this.checkBestScore()

        this.wave = 0

        this.gameOver = false

        this.bonuses = []
        this.bonusTimer = 0
        this.bonusExpiredTimer = 0
        this.bonusInterval = 15000 // in ms
        this.bonusExpiredInterval = 10000

        this.stroke = false
    }

    update() {
        this.handleDebugMode()
        this.handleRestartGame()
        this.handleLoseCondition()
        this.updateBestScore()
        this.summonEnemies()
        this.cleanupObjects()
    }

    render(deltaTime, ctx) {
        this.update()

        this.updateBonuses(deltaTime)

        this.updateAndDraw(this.terrains, deltaTime, ctx)
        this.updateAndDraw(this.bonuses, deltaTime, ctx)
        this.updateAndDraw(this.enemies, deltaTime, ctx)
        this.updateAndDraw(this.collisions, deltaTime, ctx)

        this.updateAndDraw(this.player, deltaTime, ctx)
        this.updateAndDraw(this.UI, deltaTime, ctx)
    }

    restart() {
        this.gameOver = false
        this.maxEnemies = 3
        this.enemies = []
        this.bonuses = []
        this.score = 0
        this.wave = 0
        this.bonusTimer = 0
        this.bonusExpiredTimer = 0
        this.terrains = this.terrainsType.getRandomValue()
        this.player.restart()
    }

    getRandomTerrain() {
        return this.terrainsType.getRandomValue()
    }

    getBestScore() {
        return localStorage.getItem('tankBestScore') || '0'
    }

    handleDebugMode() {
        if (this.input.keys.includes('p')) {
            this.stroke = !this.stroke
        }
    }

    handleRestartGame() {
        if (
            (this.input.keys.includes('ArrowDown') ||
                this.input.keys.includes('r')) &&
            this.gameOver
        ) {
            this.restart()
        }
    }

    handleLoseCondition() {
        if (this.player.lives < 1) {
            this.gameOver = true
        }
    }

    updateBestScore() {
        updateLocalStorage('tankBestScore', this.score)
        this.bestScore = this.getBestScore()
    }

    checkBestScore() {
        checkLocalStorage('tankBestScore', '0')
    }

    summonEnemies() {
        if (this.enemies.length < 1 && !this.gameOver) {
            for (let i = 0; i < this.maxEnemies; i++) {
                this.addEnemy()
            }
            this.wave += 1
            if (this.wave > 1) {
                this.terrains = this.getRandomTerrain()
            }
            this.maxEnemies += 1
        }
    }

    addEnemy() {
        this.enemies.push(new Enemy(this))
    }

    updateBonuses(deltaTime) {
        if (this.bonuses.length < 1 && !this.gameOver) {
            this.bonusExpiredTimer = 0
            this.handleBonusInterval(deltaTime)
        }

        if (this.bonuses.length >= 1) {
            this.bonusTimer = 0
            this.handleBonusExpiredTimer(deltaTime)
        }
    }

    handleBonusInterval(deltaTime) {
        if (this.bonusTimer > this.bonusInterval) {
            this.createBonus()
            this.bonusTimer = 0
        } else {
            this.bonusTimer += deltaTime
        }
    }

    createBonus() {
        const bonusType = [
            new LiveBonus(this),
            new ShieldBonus(this),
            new UpgradeWeaponBonus(this),
            new RocketBonus(this),
        ]
        const randomBonus = bonusType.getRandomValue()
        this.bonuses.push(randomBonus)
    }

    handleBonusExpiredTimer(deltaTime) {
        if (this.bonusExpiredTimer > this.bonusExpiredInterval) {
            this.bonuses = []
            this.bonusExpiredTimer = 0
        } else {
            this.bonusExpiredTimer += deltaTime
        }
    }

    cleanupObjects() {
        this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
        this.bonuses = this.bonuses.filter((bonus) => !bonus.markedForDeletion)
        this.collisions = this.collisions.filter(
            (collision) => !collision.markedForDeletion,
        )
    }

    // Define an updated updateAndDraw method for arrays of game elements and single elements
    updateAndDraw(target, deltaTime, ctx) {
        if (Array.isArray(target)) {
            target.forEach((element) => {
                if (typeof element.update === 'function') {
                    element.update(deltaTime)
                }
                if (typeof element.draw === 'function') {
                    element.draw(ctx)
                }
            })
        } else if (typeof target === 'object') {
            if (typeof target.update === 'function') {
                target.update(deltaTime)
            }
            if (typeof target.draw === 'function') {
                target.draw(ctx)
            }
        }
    }

    // Create explosion animation
    createExplosion(x, y, size) {
        this.collisions.push(new Collision(x, y, size))
    }

    // collision detection between two circle
    checkCircleCollision(a, b) {
        // Calculate the center coordinates of the a
        const aX = a.x + a.width * 0.5
        const aY = a.y + a.height * 0.5

        // Calculate the center coordinates of the b
        const bX = b.x + b.width * 0.5
        const bY = b.y + b.width * 0.5

        // Calculate the distance between the centers of the a and b
        const dx = aX - bX
        const dy = aY - bY
        const distance = Math.sqrt(dx * dx + dy * dy)

        return distance < a.width * 0.33 + b.width * 0.33
    }

    // collision detection between two rectangle
    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }

    // resolve collision betwen two moving objects
    resolveCollision(obj1, obj2) {
        const dx = obj1.x + obj1.width / 2 - (obj2.x + obj2.width / 2)
        const dy = obj1.y + obj1.height / 2 - (obj2.y + obj2.height / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)

        const angle = Math.atan2(dy, dx)
        const totalSpeed = Math.sqrt(
            obj1.speedX * obj1.speedX + obj1.speedY * obj1.speedY,
        )

        const newSpeedX1 = totalSpeed * Math.cos(angle)
        const newSpeedY1 = totalSpeed * Math.sin(angle)

        obj1.speedX = newSpeedX1
        obj1.speedY = newSpeedY1
    }

    // Bounce object when collision
    bounceObject(value) {
        const object = value
        const pX = object.x
        const pY = object.y

        switch (object.direction) {
            case 'up':
                object.x = pX
                object.y = pY + 5
                break
            case 'down':
                object.x = pX
                object.y = pY - 5
                break
            case 'left':
                object.x = pX + 5
                object.y = pY
                break
            case 'right':
                object.x = pX - 5
                object.y = pY
                break
        }
        return object
    }
}
