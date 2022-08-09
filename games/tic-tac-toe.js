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
                    markTile(e.target, e.target.dataset.index, game.currentPlayer.mark);
                    checkWin(game.currentPlayer.mark);
                    checkTie();
                    game.changePlayer(game.currentPlayer);
                }
            });
        });
    }
    function markTile(tile, index, mark) {
        marks[index] = mark;
        tile.innerText = mark;
    }

    const p1Score = document.querySelector('#p1Score');
    const p2Score = document.querySelector('#p2Score');
    const ties = document.querySelector('#ties');
    function checkWin(mark) {
        if (
            (marks[0] === mark && marks[1] === mark && marks[2] == mark) ||
            (marks[3] === mark && marks[4] === mark && marks[5] == mark) ||
            (marks[6] === mark && marks[7] === mark && marks[8] == mark) ||
            (marks[0] === mark && marks[3] === mark && marks[6] == mark) ||
            (marks[1] === mark && marks[4] === mark && marks[7] == mark) ||
            (marks[2] === mark && marks[5] === mark && marks[8] == mark) ||
            (marks[0] === mark && marks[4] === mark && marks[8] == mark) ||
            (marks[2] === mark && marks[4] === mark && marks[6] == mark)
        ) {
            alert(`${game.currentPlayer.nickname} has won!`);
            if (mark === "X") {
                p1Score.innerText++;
            } else if (mark === "O") {
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
    const resetBtn = document.querySelector('#resetBtn');
    resetBtn.addEventListener('click', () => {
        p1Score.innerText = 0;
        p2Score.innerText = 0;
    })

    return { newBoard };
})();

const game = (function () {
    function createPlayer(mark) {
        this.mark = mark;
        this.nickname = `Player ${mark}`
        return { mark, nickname };
    };
    const p1 = createPlayer("X");
    const p2 = createPlayer("O");
    let currentPlayer = p1;
    function customizeNames(p1Input, p2Input) {
        const playerNotified = document.querySelector('#playerNotified');
        if (p1Input.value) p1.nickname = p1Input.value;
        if (p2Input.value) p2.nickname = p2Input.value;
        playerNotified.innerText = currentPlayer.nickname;
    }

    const playBtn = document.querySelector('#playBtn');
    const settings = document.querySelector('#settings');
    const main = document.querySelector('main');
    playBtn.addEventListener('click', () => {
        gameBoard.newBoard();
        main.style.display = "inline-block";
        settings.style.display = "none";
        customizeNames(document.querySelector('#p1Name'), document.querySelector('#p2Name'));
    });

    function changePlayer(player) {
        player === p1 ? this.currentPlayer = p2 : this.currentPlayer = p1;
        playerNotified.innerText = this.currentPlayer.nickname;
    }

    return { currentPlayer, changePlayer };
})();
