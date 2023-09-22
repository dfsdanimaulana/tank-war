export default class InputHandler {
    constructor() {
        this.keys = []
        this.swipeStartX = 0
        this.swipeStartY = 0
        this.swipeEndX = 0
        this.swipeEndY = 0
        this.previousSwipeDirection = ''
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.holdTimer = 0
        this.holdThreshold = 500

        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key)
        })

        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key)
            if (index > -1) this.keys.splice(index, 1)
        })

        // Touch events for swipe on mobile
        window.addEventListener('touchstart', (e) => {
            this.swipeStartX = e.touches[0].clientX
            this.swipeStartY = e.touches[0].clientY
            this.onTouchStart()
        })

        window.addEventListener('touchmove', (e) => {
            this.swipeEndX = e.changedTouches[0].clientX
            this.swipeEndY = e.changedTouches[0].clientY
            this.handleSwipe()
        })
        window.addEventListener('touchend', (e) => {
            this.getReleasedSwipeDirection()
            this.onTouchEnd()
        })
    }

    enterState() {
        this.keys.indexOf('Enter') === -1 && this.keys.push('Enter')
        this.previousSwipeDirection = 'enter'
    }

    onTouchStart() {
        this.touchStartTime = new Date().getTime()
        this.holdTimer = setTimeout(() => this.enterState(), this.holdThreshold)
    }

    onTouchEnd() {
        this.touchEndTime = new Date().getTime()
        const touchDuration = this.touchEndTime - this.touchStartTime

        clearTimeout(this.holdTimer)

        if (touchDuration >= this.holdThreshold) {
            // The user has touched and held the screen for a long time
            // Add your desired action here
        } else {
            // The user's touch was not long enough
            // Add your desired action for a regular touch here
        }
    }

    handleSwipe() {
        const dx = this.swipeEndX - this.swipeStartX
        const dy = this.swipeEndY - this.swipeStartY

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0) {
                this.keys.indexOf('ArrowRight') === -1 &&
                    this.keys.push('ArrowRight')
                this.previousSwipeDirection = 'right'
            } else {
                this.keys.indexOf('ArrowLeft') === -1 &&
                    this.keys.push('ArrowLeft')
                this.previousSwipeDirection = 'left'
            }
        } else {
            // Vertical swipe
            if (dy > 0) {
                this.keys.indexOf('ArrowDown') === -1 &&
                    this.keys.push('ArrowDown')
                this.previousSwipeDirection = 'down'
            } else {
                this.keys.indexOf('ArrowUp') === -1 && this.keys.push('ArrowUp')
                this.previousSwipeDirection = 'up'
            }
        }
    }
    // Method to get the released swipe direction
    getReleasedSwipeDirection() {
        switch (this.previousSwipeDirection) {
            case 'up':
                this.keys.splice(this.keys.indexOf('ArrowUp'), 1)
                break
            case 'down':
                this.keys.splice(this.keys.indexOf('ArrowDown'), 1)
                break
            case 'right':
                this.keys.splice(this.keys.indexOf('ArrowRight'), 1)
                break
            case 'left':
                this.keys.splice(this.keys.indexOf('ArrowLeft'), 1)
                break
            case 'enter':
                this.keys.splice(this.keys.indexOf('Enter'), 1)
                break
            default:
                this.keys.splice(this.keys.indexOf('Enter'), 1)
        }
    }
}
