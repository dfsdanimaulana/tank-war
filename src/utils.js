export function findNearestObject(objects, x, y) {
    let nearestObject = null
    let shortestDistance = Number.MAX_VALUE

    for (const obj of objects) {
        const distance = Math.sqrt((x - obj.x) ** 2 + (y - obj.y) ** 2)
        if (distance < shortestDistance) {
            shortestDistance = distance
            nearestObject = obj
        }
    }

    return nearestObject
}

export function calculateAngle(x1, y1, x2, y2) {
    const angleInRadians = Math.atan2(y2 - y1, x2 - x1)
    let angleInDegrees = angleInRadians * (180 / Math.PI) + 90 // 90 only adjuster for the game

    // Ensure the angle is positive
    if (angleInDegrees < 0) {
        angleInDegrees += 360
    }

    return angleInDegrees
}

export function drawCircle(context, x, y, size, radiusModifier = 1) {
    context.save()
    const centerX = x + size * 0.5
    const centerY = y + size * 0.5
    const radius = size * radiusModifier

    // Create a radial gradient
    const gradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius,
    )

    gradient.addColorStop(1, 'rgba(170, 255, 0, 0.1)') // Center of the circle will be white
    gradient.addColorStop(0, 'rgba(170, 255, 0, 0.3)') // Outer edge of the circle will be green

    context.fillStyle = gradient
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    context.fill()
    context.lineWidth = 2
    context.stroke()
    context.restore()
}

export function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function checkLocalStorage(name, initialValue = '0') {
    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, initialValue.toString())
    }
}

export function updateLocalStorage(name, newValue) {
    const currentValue = parseInt(localStorage.getItem(name))
    if (newValue > currentValue) {
        localStorage.setItem(name, newValue.toString())
    }
}

/**
 * Checks if there is any overlap between the newObject and the objects in the array.
 *
 * @param {Array} objects - An array of objects to check for overlap.
 * @param {Object} newObject - The new object to check for overlap.
 * @return {boolean} Returns true if there is overlap, false otherwise.
 */
export function checkOverlap(objects, newObject) {
    for (const obj of objects) {
        if (
            newObject.x < obj.x + obj.width &&
            newObject.x + newObject.width > obj.x &&
            newObject.y < obj.y + obj.height &&
            newObject.y + newObject.height > obj.y
        ) {
            return true // Overlapping
        }
    }
    return false // Not overlapping
}

/**
 * Checks if the new object overlaps with an existing object.
 *
 * @param {Object} existingObject - The existing object to compare against.
 * @param {Object} newObject - The new object to check for overlap.
 * @return {boolean} Returns true if the new object overlaps with the existing object, false otherwise.
 */
export function doesOverlapExisting(existingObject, newObject) {
    if (
        newObject.x < existingObject.x + existingObject.width &&
        newObject.x + newObject.width > existingObject.x &&
        newObject.y < existingObject.y + existingObject.height &&
        newObject.y + newObject.height > existingObject.y
    ) {
        return true // Overlapping with existing object
    }
    return false // Not overlapping with existing object
}
