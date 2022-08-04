const gameBoard = (function () {
    let marks = [];

    function newBoard() {
        const tilesGrid = document.querySelector('#tilesGrid');
        marks = [];
        tilesGrid.replaceChildren();
        for (let i = 0; i < 9; i++) {
            marks.push("");
            const tile = document.createElement('p');
            tile.classList.add("tile");
            tile.setAttribute('data-index', i);
            tilesGrid.appendChild(tile);
        }
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile) => {
            tile.addEventListener('click', (e) => {
                if (!e.target.innerText) {
                    game.play(e.target, e.target.dataset.index, game.currentPlayer, game.currentPlayer.marker);
                }
            });
        });
    }
    newBoard();

    function markTile(tile, index, marker) {
        marks[index] = marker;
        tile.innerText = marker;
    }

    const p1Score = document.querySelector('#p1Score');
    const p2Score = document.querySelector('#p2Score');
    const ties = document.querySelector('#ties');

    function checkWin(marker) {
        if (
            (marks[0] === marker && marks[1] === marker && marks[2] == marker) ||
            (marks[3] === marker && marks[4] === marker && marks[5] == marker) ||
            (marks[6] === marker && marks[7] === marker && marks[8] == marker) ||
            (marks[0] === marker && marks[3] === marker && marks[6] == marker) ||
            (marks[1] === marker && marks[4] === marker && marks[7] == marker) ||
            (marks[2] === marker && marks[5] === marker && marks[8] == marker) ||
            (marks[0] === marker && marks[4] === marker && marks[8] == marker) ||
            (marks[2] === marker && marks[4] === marker && marks[6] == marker)
        ) {
            alert(`${marker} has won!`);
            if (marker === "X") {
                p1Score.innerText++;
            } else if (marker === "O") {
                p2Score.innerText++;
            }
            newBoard();
        }
    }

    function checkTie() {
        if (!marks.includes("", 0)) {
            alert("It's a tie!");
            ties.innerText++;
            newBoard();
        }
    }

    return { newBoard, markTile, checkWin, checkTie };
})();

const createPlayer = (marker) => {
    this.marker = marker;
    return { marker };
};

const game = (function () {
    const p1 = createPlayer("X");
    const p2 = createPlayer("O");
    let currentPlayer = p1;
    const alertedPlayer = document.querySelector('#alertedPlayer');

    function play(tile, index, player, marker) {
        gameBoard.markTile(tile, index, marker);
        gameBoard.checkWin(marker);
        gameBoard.checkTie();
        player === p1 ? this.currentPlayer = p2 : this.currentPlayer = p1;
        alertedPlayer.innerText = this.currentPlayer.marker;
    }

    return { currentPlayer, play };
})();