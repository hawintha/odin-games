function computerPlay() {
    let elements = ["fire", "water", "wood"];
    return elements[Math.floor(Math.random() * 3)];
}

let playerScore = 0;
let computerScore = 0;
let roundNum = 1;

const elementBtns = document.querySelectorAll('.elementBtn');
elementBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        playerSelection = btn.id;
        computerSelection = computerPlay();
        const playerIcon = document.querySelector("#playerIcon")
        const computerIcon = document.querySelector("#computerIcon")

        const gameLog = document.querySelector('#gameLog')
        const newRoundPicks = document.createElement('p')
        newRoundPicks.textContent = `Round ${roundNum}: You chose ${playerSelection} ◈◆◈ Mother Nature chose ${computerSelection}`;
        gameLog.appendChild(newRoundPicks);
        roundNum++;

        const newExplanation = document.createElement('p');
        const losingMessage = "You lost this round. Better luck next time.";
        const winningMessage = "Congrats! You won this round!";
        const tieMessage = "Your fight with Mother Nature continues. You both chose the same element."
        if (playerSelection === "wood" && computerSelection === "fire") {
            playerIcon.textContent = "forest";
            computerIcon.textContent = "local_fire_department";
            newExplanation.textContent = "Mother Nature has burned your wood with her fire." + losingMessage;
            computerScore++;
        } else if (playerSelection === "fire" && computerSelection === "water") {
            playerIcon.textContent = "local_fire_department";
            computerIcon.textContent = "water_drop";
            newExplanation.textContent = "Mother Nature has extinguished your fire with her water." + losingMessage;
            computerScore++;
        } else if (playerSelection === "water" && computerSelection === "wood") {
            playerIcon.textContent = "water_drop";
            computerIcon.textContent = "forest";
            computerScore++;
        } else if (playerSelection === computerSelection) {
            newExplanation.textContent = tieMessage;
            if (playerSelection === "wood") {
                playerIcon.textContent = "forest";
                computerIcon.textContent = "forest";
                playerIcon.textContent = "local_fire_department";
                computerIcon.textContent = "local_fire_department";
            } else if (playerSelection === "water") {
                playerIcon.textContent = "water_drop";
                computerIcon.textContent = "water_drop";
            }
        } else if (playerSelection === "fire" && computerSelection === "wood") {
            computerIcon.textContent = "forest";
            playerIcon.textContent = "local_fire_department";
            newExplanation.textContent = "Your fire has burned Mother Nature's wood." + winningMessage;
            playerScore++;
        } else if (playerSelection === "water" && computerSelection === "fire") {
            computerIcon.textContent = "local_fire_department";
            playerIcon.textContent = "water_drop";
            newExplanation.textContent = "Your water has extinguished Mother Nature's fire." + winningMessage;
            playerScore++;
        } else if (playerSelection === "wood" && computerSelection === "water") {
            computerIcon.textContent = "water_drop";
            playerIcon.textContent = "forest";
            newExplanation.textContent = "Your wood has absorbed Mother Nature's water." + winningMessage;
            playerScore++;
        }
        newRoundPicks.appendChild(newExplanation);

        const scoreBoard = document.querySelector('#scoreBoard')
        scoreBoard.textContent = `◈◆◈ You: ${playerScore} ◈◆◈ Mother Nature: ${computerScore} ◈◆◈`;

        const finalOutcome = document.querySelector('#finalOutcome')
        if (computerScore === 5) {
            finalOutcome.textContent = "Game over! Mother Nature is truly a force to be reckoned with."
        } else if (playerScore === 5) {
            finalOutcome.textContent = "A miracle! You won against Mother Nature!"
        }
    });
});