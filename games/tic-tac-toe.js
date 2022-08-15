const gameBoard = (() => { //BOARD MODULE
    const tilesGrid = document.querySelector('#tilesGrid');
    let marks = [];
    function createBoard() { //Initialize game board
        tilesGrid.replaceChildren();
        for (let i = 0; i < 9; i++) {
            marks.push("");
            const tile = document.createElement('p');
            tile.classList.add("tile");
            tile.setAttribute('data-index', i);
            tilesGrid.appendChild(tile);
        }
    } createBoard();
    function showBoard() {
        document.querySelector('main').style.display = "inline-block";
        document.querySelector('#settings').style.display = "none";
        settings.customizeNames(document.querySelector('#p1Name'), document.querySelector('#p2Name'));
    }
    function resetBoard() {
        settings.isEnd = false;
        for (let i = 0; i < 9; i++) {
            marks[i] = "";
        }
        document.querySelectorAll('.tile').forEach((tile) => {
            tile.innerText = "";
        })
    }
    return { marks, showBoard, resetBoard };
})();

const displayController = (() => { //DISPLAY CONTROLLER MODULE
    document.querySelectorAll('.tile').forEach((tile) => {
        tile.addEventListener('click', (e) => {
            if (e.target.innerText || settings.isEnd) return; //Only play round if there's availability
            markTile(e.target, e.target.dataset.index, settings.currentPlayer.mark, settings.currentPlayer.nickname);
            if (settings.p2.isAI) { //Play against AI during AI mode
                playerNotified.innerText = settings.p2.nickname;
                setTimeout(function () {
                    findRandomTile();
                    playerNotified.innerText = settings.p1.nickname;
                }, 300);
            } else {
                settings.switchPlayers(settings.currentPlayer);
            }
        });
    });
    function markTile(tile, index, mark, name) {
        gameBoard.marks[index] = mark;
        tile.innerText = mark;
        setTimeout(function () {
            checkWin(mark, name);
            checkTie();
        }, 100);
    }

    let randomIndex;
    let randomTile;
    function findRandomTile() {
        randomIndex = Math.floor(Math.random() * 9);
        randomTile = tilesGrid.children.item(randomIndex);
        checkTile();
    }
    function checkTile() {  //If tile is already marked, RNG again
        if (gameBoard.marks[randomIndex]) findRandomTile();
        else markTile(randomTile, randomIndex, "O", "AI");
    }

    const p1Score = document.querySelector('#p1Score');
    const p2Score = document.querySelector('#p2Score');
    const ties = document.querySelector('#ties');
    function checkWin(mark, name) {
        if (
            (gameBoard.marks[3] === mark && gameBoard.marks[4] === mark && gameBoard.marks[5] == mark) ||
            (gameBoard.marks[0] === mark && gameBoard.marks[1] === mark && gameBoard.marks[2] == mark) ||
            (gameBoard.marks[6] === mark && gameBoard.marks[7] === mark && gameBoard.marks[8] == mark) ||
            (gameBoard.marks[0] === mark && gameBoard.marks[3] === mark && gameBoard.marks[6] == mark) ||
            (gameBoard.marks[1] === mark && gameBoard.marks[4] === mark && gameBoard.marks[7] == mark) ||
            (gameBoard.marks[2] === mark && gameBoard.marks[5] === mark && gameBoard.marks[8] == mark) ||
            (gameBoard.marks[0] === mark && gameBoard.marks[4] === mark && gameBoard.marks[8] == mark) ||
            (gameBoard.marks[2] === mark && gameBoard.marks[4] === mark && gameBoard.marks[6] == mark)
        ) {
            settings.isEnd = true;
            alert(`${name} has won!`);
            if (mark === "X") p1Score.innerText++;
            else if (mark === "O") p2Score.innerText++;
            gameBoard.resetBoard();
        }
    }
    function checkTie() {
        if (!gameBoard.marks.includes("", 0)) {
            alert("It's a tie!");
            ties.innerText++;
            gameBoard.resetBoard();
        }
    }
    document.querySelector('#resetBtn').addEventListener('click', () => { //Reset all scores
        p1Score.innerText = 0;
        p2Score.innerText = 0;
        ties.innerText = 0;
    })
})();

const Player = (mark, nickname, isAI) => { // PLAYER FACTORY
    return { mark, nickname, isAI }
}

const settings = (function () { //SETTINGS MODULE
    let isEnd = false;
    const p1 = Player("X", "Player X", false);
    const p2 = Player("O", "Player O", false);
    let currentPlayer = p1;

    function customizeNames(p1Input, p2Input) {
        if (p1Input.value) p1.nickname = p1Input.value;
        if (p2Input.value) p2.nickname = p2Input.value;
        document.querySelector('#playerNotified').innerText = currentPlayer.nickname;
    }

    document.querySelector('#playBtn').addEventListener('click', () => {
        gameBoard.showBoard();
    });

    document.querySelector('#vsAIBtn').addEventListener('click', () => {
        p2.isAI = true;
        p2.nickname = "AI"; //AI's default name
        gameBoard.showBoard();
    })

    function switchPlayers(player) {
        player === p1 ? this.currentPlayer = p2 : this.currentPlayer = p1;
        playerNotified.innerText = this.currentPlayer.nickname;
    }

    return { p1, p2, currentPlayer, isEnd, customizeNames, switchPlayers };
})();