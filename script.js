function computerPlay() {
    let elements = ["Fire", "Water", "Wood"];
    return elements[Math.floor(Math.random() * 3)];
}

let playerScore = 0;
let computerScore = 0;
let roundNum = 1;

const elementBtns = document.querySelectorAll('.elementBtn');
elementBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        playerSelection = btn.textContent;
        computerSelection = computerPlay();

        const finalOutcome = document.querySelector('#finalOutcome')
        if (computerScore === 5) {
            finalOutcome.textContent = "Game over! Once again, Mother Nature is a force to be reckoned with."
        } else if (playerScore === 5) {
            finalOutcome.textContent = "A miracle! You won against Mother Nature!"
        }

        const gameLog = document.querySelector('#gameLog')
        const newRoundPicks = document.createElement('p')
        newRoundPicks.textContent = `Round ${roundNum}: You chose ${playerSelection} ◈◆◈ Mother Nature chose ${computerSelection}`;
        gameLog.appendChild(newRoundPicks);
        roundNum++;

        const newExplanation = document.createElement('p');
        const losingMessage = "You lost this round. Better luck next time.";
        const winningMessage = "Congrats! You won this round!";
        if (playerSelection === "Wood" && computerSelection === "Fire") {
            newExplanation.textContent = "Mother Nature has burned your wood with her fire." + losingMessage;
            computerScore++;
        } else if (playerSelection === "Fire" && computerSelection === "Water") {
            newExplanation.textContent = "Mother Nature has extinguished your fire with her water." + losingMessage;
            computerScore++;
        } else if (playerSelection === "Water" && computerSelection === "Wood") {
            newExplanation.textContent = "Mother Nature has absorbed your water with her wood." + losingMessage;
            computerScore++;
        } else if (playerSelection === computerSelection) {
            newExplanation.textContent = "Your fight with Mother Nature continues. You both chose the same element.";
        } else if (playerSelection === "Fire" && computerSelection === "Wood") {
            newExplanation.textContent = "Your fire has burned Mother Nature's wood." + winningMessage;
            playerScore++;
        } else if (playerSelection === "Water" && computerSelection === "Fire") {
            newExplanation.textContent = "Your water has extinguished Mother Nature's fire." + winningMessage;
            playerScore++;
        } else if (playerSelection === "Wood" && computerSelection === "Water") {
            newExplanation.textContent = "Your wood has absorbed Mother Nature's water." + winningMessage;
            playerScore++;
        }
        newRoundPicks.appendChild(newExplanation);

        const scoreBoard = document.querySelector('#scoreBoard')
        scoreBoard.textContent = `◈◆◈ You: ${playerScore} ◈◆◈ Mother Nature: ${computerScore} ◈◆◈`;
    });
});