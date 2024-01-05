const gameBoard = (() => { //BOARD MODULE
    const tilesGrid = document.querySelector('#tilesGrid');
    let marks = [];
    function createBoard() { //Initialize game board to track tiles
        for (let i = 0; i < 9; i++) {
            marks.push(i);
            const tile = document.createElement('p');
            tile.classList.add("tile");
            tile.setAttribute('data-index', i);
            tilesGrid.appendChild(tile);
        }
    } createBoard();
    function showBoard() {
        document.querySelector('main').style.display = "inline-block";
        document.querySelector('#settings').style.display = "none";
    }
    function hideBoard() {
        document.querySelector('main').style.display = "none";
        document.querySelector('#settings').style.display = "grid";
    }
    function resetBoard() {
        settings.isEnd = false;
        for (let i = 0; i < 9; i++) {
            marks[i] = i;
        }
        document.querySelectorAll('.tile').forEach((tile) => {
            tile.innerText = "";
        });
    }
    return { tilesGrid, marks, showBoard, hideBoard, resetBoard };
})();

const displayController = (() => { //DISPLAY CONTROLLER MODULE
    const playerNotified = document.querySelector('#playerNotified');
    document.querySelectorAll('.tile').forEach((tile) => {
        tile.addEventListener('click', (e) => {
            if (e.target.innerText || settings.isEnd) return; //Only play on unmarked tiles
            markTile(e.target, e.target.dataset.index, settings.currentPlayer.mark, settings.currentPlayer.nickname);
            if (settings.p2.mode === "2P") settings.switchPlayers(settings.currentPlayer);
            else { //Play against AI during AI mode
                playerNotified.innerText = settings.p2.nickname; //Notify AI's turn
                setTimeout(() => {
                    playAI();
                    playerNotified.innerText = settings.p1.nickname;
                }, 200);
            }
        });
    });
    function markTile(tile, index, mark, name) {
        gameBoard.marks[index] = mark;
        tile.innerText = mark;
        setTimeout(() => {
            checkWin(gameBoard.marks, mark, name);
            checkTie();
        }, 100);
    }
    function playAI() {
        if (settings.p2.mode === "normal") { //Find a random unmarked tile for AI to mark
            let unmarkedTiles = gameBoard.marks.filter(n => n / 1 === n);
            const randomUnmarkedIndex = unmarkedTiles[Math.floor(Math.random() * unmarkedTiles.length)];
            markTile(gameBoard.tilesGrid.children.item(randomUnmarkedIndex), randomUnmarkedIndex, "O", "AI");
        } else { //Find the best unmarked tile for AI to mark
            let boardCopy = gameBoard.marks; //Duplicate board for minimax testing
            let bestTile = displayController.minimax(boardCopy, "O");
            markTile(gameBoard.tilesGrid.children.item(bestTile.index), bestTile.index, "O", "AI");
        }
    }

    const p1Score = document.querySelector('#p1Score');
    const p2Score = document.querySelector('#p2Score');
    const ties = document.querySelector('#ties');
    function isWinPattern(array, mark) {
        if (
            (array[3] === mark && array[4] === mark && array[5] === mark) ||
            (array[0] === mark && array[1] === mark && array[2] === mark) ||
            (array[6] === mark && array[7] === mark && array[8] === mark) ||
            (array[0] === mark && array[3] === mark && array[6] === mark) ||
            (array[1] === mark && array[4] === mark && array[7] === mark) ||
            (array[2] === mark && array[5] === mark && array[8] === mark) ||
            (array[0] === mark && array[4] === mark && array[8] === mark) ||
            (array[2] === mark && array[4] === mark && array[6] === mark)
        ) return true;
        else return false;
    }
    function checkWin(array, mark, name) {
        if (isWinPattern(array, mark)) { //If win is detected, notify & update scores
            settings.isEnd = true;
            alert(`${name} has won!`);
            if (mark === "X") p1Score.innerText++;
            else if (mark === "O") p2Score.innerText++;
            gameBoard.resetBoard();
        }
    }
    function checkTie() {
        if (gameBoard.marks.every(n => typeof n === 'string')) { //No numbers left in array means tie
            alert("It's a tie!");
            ties.innerText++;
            gameBoard.resetBoard();
        }
    }
    document.querySelector('#resetBtn').addEventListener('click', () => { //Reset all scores
        p1Score.innerText = 0;
        p2Score.innerText = 0;
        ties.innerText = 0;
    });
    document.querySelector('#returnBtn').addEventListener('click', () => { //Reset all scores
        p1Score.innerText = 0;
        p2Score.innerText = 0;
        ties.innerText = 0;
        gameBoard.resetBoard();
        gameBoard.hideBoard();
        settings.currentPlayer = settings.p1;
    });

    function minimax(testBoard, mark) {
        let unmarkedTiles = testBoard.filter(n => n / 1 === n); //Find unmarked tiles
        if (isWinPattern(testBoard, "X")) return { score: -10 }; //Check for terminal states: win/lose/tie
        else if (isWinPattern(testBoard, "O")) return { score: 10 };
        else if (unmarkedTiles.length === 0) return { score: 0 };

        let moves = []; //List each empty spot's index & score as a move;
        for (let i = 0; i < unmarkedTiles.length; i++) { //For each unmarked tile,
            let move = {}; //create MOVE object
            move.index = testBoard[unmarkedTiles[i]]; //to store index of the unmarked tile that will be marked next
            testBoard[unmarkedTiles[i]] = mark; // Mark TestBoard with AI's test mark

            if (mark === "O") { //Store minimax score of opponent
                let result = minimax(testBoard, "X"); //Start another FC using opponent's test mark
                move.score = result.score;
            } else {
                let result = minimax(testBoard, "O"); //Start another FC using AI's test mark
                move.score = result.score;
            }
            testBoard[unmarkedTiles[i]] = move.index; //Remove test mark to reset TestBoard from this move
            moves.push(move);
        }
        let bestMove;
        if (mark === "O") { //If it's AI's turn,
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) { //loop through each move & choose the highest scoring move
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else { //If it's my turn,
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) { //loop through each move & choose the lowest scoring move
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove]; //index
    }
    return { playerNotified, minimax };
})();

const Player = (mark, nickname, mode) => { // PLAYER FACTORY
    return { mark, nickname, mode };
};

const settings = (function () { //SETTINGS MODULE
    let isEnd = false;
    const p1 = Player("X", "Player X", "2P");
    const p2 = Player("O", "Player O", "2P");
    let currentPlayer = p1;

    function switchPlayers(player) {
        player === p1 ? this.currentPlayer = p2 : this.currentPlayer = p1;
        displayController.playerNotified.innerText = this.currentPlayer.nickname;
    }

    function customizeName(player, input, mode) {
        if (input.value) player.nickname = input.value; //Set player names
        if (player === p2 && mode !== "2P") p2.nickname = "AI"; //P2's name is "AI" during AI mode
        if (player === p2 && mode === "2P" && !input.value && p2.nickname === "AI") { //Don't reuse "AI" nickname as default after switching from AI to 2P
            p2.nickname = "Player O";
        }
    }
    document.querySelectorAll('.startBtn').forEach((btn) => {
        btn.addEventListener('click', () => {
            gameBoard.showBoard();
            btn.classList.contains("vsAI") ? p2.mode = btn.id : p2.mode = "2P"; //If AI, set difficulty chosen
            customizeName(p1, document.querySelector('#p1Name'), p2.mode);
            customizeName(p2, document.querySelector('#p2Name'), p2.mode);
            displayController.playerNotified.innerText = currentPlayer.nickname; //Notify starting player
        });
    });
    return { p1, p2, currentPlayer, isEnd, switchPlayers };
})();

