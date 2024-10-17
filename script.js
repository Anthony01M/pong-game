const gameContainer = document.getElementById('gameContainer');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

let paddle1Y = 150;
let paddle2Y = 150;
let ballX = 390;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;
let player1Score = 0;
let player2Score = 0;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            paddle1Y = Math.max(paddle1Y - 20, 0);
            break;
        case 's':
            paddle1Y = Math.min(paddle1Y + 20, gameContainer.clientHeight - paddle1.clientHeight);
            break;
        case 'ArrowUp':
            paddle2Y = Math.max(paddle2Y - 20, 0);
            break;
        case 'ArrowDown':
            paddle2Y = Math.min(paddle2Y + 20, gameContainer.clientHeight - paddle2.clientHeight);
            break;
    }
    paddle1.style.top = `${paddle1Y}px`;
    paddle2.style.top = `${paddle2Y}px`;
});

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= gameContainer.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddle1.clientWidth && ballY >= paddle1Y && ballY <= paddle1Y + paddle1.clientHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= gameContainer.clientWidth - paddle2.clientWidth - ball.clientWidth && ballY >= paddle2Y && ballY <= paddle2Y + paddle2.clientHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX <= 0) {
        player2Score++;
        score2.textContent = player2Score;
        resetBall();
    }

    if (ballX >= gameContainer.clientWidth - ball.clientWidth) {
        player1Score++;
        score1.textContent = player1Score;
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function resetBall() {
    ballX = 390;
    ballY = 190;
    ballSpeedX = -ballSpeedX;
}

setInterval(updateBall, 16);

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});