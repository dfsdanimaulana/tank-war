Array.prototype.getRandomValue = function () {
    if (this.length === 0) {
        return undefined
    }
    const randomIndex = Math.floor(Math.random() * this.length)
    return this[randomIndex]
}
