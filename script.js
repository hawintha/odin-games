function computerPlay() {
    let elements = ["fire", "water", "wood"];
    return elements[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    let losingMessage = "You lost to Mother Nature. ";
    let winningMessage = "Congrats! You won against Mother Nature! ";
    let tieMessage = "Your fight with Mother Nature continues. You both chose the same element.";
    let fireVsWood = "The fire has burned down the wood.";
    let fireVsWater = "The water has extinguished the fire."
    let waterVsWood = "The wood has absorbed the water."
    if (playerSelection.toLowerCase() === "wood" && computerSelection === "fire") {
        computerScore++;
        return losingMessage + fireVsWood;
    } else if (playerSelection.toLowerCase() === "fire" && computerSelection === "water") {
        computerScore++;
        return losingMessage + fireVsWater;
    } else if (playerSelection.toLowerCase() === "water" && computerSelection === "wood") {
        computerScore++;
        return losingMessage + waterVsWood;
    } else if (playerSelection.toLowerCase() === computerSelection) {
        return tieMessage;
    } else {
        playerScore++;
        return winningMessage;
    }
};




let playerScore = 0;
let computerScore = 0;

function game() {
    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Fire, water, or wood?");
        computerSelection = computerPlay();
        console.log(`You chose ${playerSelection} | Mother Nature chose ${computerSelection}`)
        console.log(playRound(playerSelection, computerSelection));
        console.log(`>>>>> You: ${playerScore} V.S. Mother Nature: ${computerScore} <<<<<`);
    }
}
game();