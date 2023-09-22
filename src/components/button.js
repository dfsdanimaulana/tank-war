// Draw the button on the canvas
function drawButton(ctx, x, y, width, height, text) {
    ctx.fillStyle = 'blue'
    ctx.fillRect(x, y, width, height)

    ctx.fillStyle = 'white'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, x + width / 2, y + height / 2)
}

// Check if a point is inside the button
function isInsideButton(x, y, button) {
    return (
        x > button.x &&
        x < button.x + button.width &&
        y > button.y &&
        y < button.y + button.height
    )
}

const button = { x: 150, y: 80, width: 100, height: 40, text: 'Click me' }

drawButton(button.x, button.y, button.width, button.height, button.text)

// Add click event listener to canvas
canvas.addEventListener('click', function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left
    const mouseY = event.clientY - canvas.getBoundingClientRect().top

    if (isInsideButton(mouseX, mouseY, button)) {
        // Button clicked, do something
        alert('Button clicked!')
    }
})
