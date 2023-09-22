export default class UI {
    constructor(game) {
        this.game = game
        this.fromX = 10
        this.fromY = 30
        this.fontSize = 30
        this.fontFamily = 'Creepster'
        this.fontColor = 'white'
    }

    drawSquare(ctx) {
        // Set the square properties
        const x = 2 // X-coordinate of the top-left corner
        const y = 2 // Y-coordinate of the top-left corner
        const sideLengthX = 245 // Width
        const sideLengthY = 220 // Height
        const borderRadius = 10 // Border radius
        const borderColor = 'black' // Border color
        const borderWidth = 2 // Border width
        const fillColor = 'rgba(0, 0, 0, 0.2)' // Transparent black fill color

        // Draw the square
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x + borderRadius, y)
        ctx.lineTo(x + sideLengthX - borderRadius, y)
        ctx.arcTo(
            x + sideLengthX,
            y,
            x + sideLengthX,
            y + borderRadius,
            borderRadius,
        )
        ctx.lineTo(x + sideLengthX, y + sideLengthY - borderRadius)
        ctx.arcTo(
            x + sideLengthX,
            y + sideLengthY,
            x + sideLengthX - borderRadius,
            y + sideLengthY,
            borderRadius,
        )
        ctx.lineTo(x + borderRadius, y + sideLengthY)
        ctx.arcTo(
            x,
            y + sideLengthY,
            x,
            y + sideLengthY - borderRadius,
            borderRadius,
        )
        ctx.lineTo(x, y + borderRadius)
        ctx.arcTo(x, y, x + borderRadius, y, borderRadius)
        ctx.closePath()

        ctx.lineWidth = borderWidth
        ctx.strokeStyle = borderColor
        ctx.fillStyle = fillColor

        ctx.stroke()
        ctx.fill()
        ctx.restore()
    }

    draw(ctx) {
        this.drawSquare(ctx)

        ctx.save()
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        ctx.shadowColor = 'black'
        ctx.shadowBlur = 0
        ctx.font = this.fontSize + 'px ' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.fontColor

        // Score
        ctx.fillText('Score: ' + this.game.score, this.fromX, this.fromY * 1)

        // Best score
        ctx.fillText(
            'Best Score: ' + this.game.bestScore,
            this.fromX,
            this.fromY * 2.5,
        )

        // Wave count
        ctx.fillText('Wave: ' + this.game.wave, this.fromX, this.fromY * 4)

        // Bonus
        if (this.game.bonusTimer > 0) {
            ctx.fillText(
                'Next Bonus In: ' +
                    (this.game.bonusInterval * 0.001 -
                        (this.game.bonusTimer * 0.001).toFixed()),
                this.fromX,
                this.fromY * 5.5,
            )
        }

        // Bonus expired
        if (this.game.bonusExpiredTimer > 0) {
            ctx.fillText(
                'Bonus Expired In: ' +
                    (this.game.bonusExpiredInterval * 0.001 -
                        (this.game.bonusExpiredTimer * 0.001).toFixed()),
                this.fromX,
                this.fromY * 5.5,
            )
        }

        // Pressed keys
        this.game.input.keys.forEach((key, index) => {
            if (key === ' ') key = 'Space'
            ctx.fillText(key, this.fromX, this.fromY * 7 + 25 * index)
        })

        // Game over
        if (this.game.gameOver) {
            ctx.save()
            ctx.textAlign = 'center'
            ctx.font = '150px ' + this.fontFamily
            ctx.fillText(
                'GAME OVER',
                this.game.width * 0.5,
                this.game.height * 0.5,
            )
            ctx.font = '30px Impact'
            ctx.fillText(
                'press R or SwipeDown to restart',
                this.game.width * 0.5,
                this.game.height * 0.5 + 35,
            )
            ctx.restore()
        }
        ctx.restore()
    }
}
