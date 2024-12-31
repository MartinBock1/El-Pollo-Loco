function winGameTemplate() {
    return `
                <img src="./assets/img/9_intro_outro_screens/win/won_2.png" alt="You Win">
                <button class="start-button" onclick="restartGame()">Play Again</button>
            `;
}

function showGameOverTemplate() {
    return `
                <img src="./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png" alt="Game Over">
                <button class="start-button" onclick="restartGame()">Play Again</button>
            `;
}