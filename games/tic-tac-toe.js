const gameBoard = (function () {
    let marks = ["", "", "", "", "", "", "", "", ""];

    const tilesGrid = document.querySelector('#tilesGrid');
    for (let i = 1; i < 10; i++) {
        const tile = document.createElement('div');
        tile.classList.add("tile");
        tile.setAttribute('data-index', i);
        tilesGrid.appendChild(tile);
    }

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => {
        tile.addEventListener('click', (e) => {
            game.play(e.target, e.target.dataset.index, game.currentPlayer);
        });
    });

    function markTile(tile, index, marker) {
        marks[index] = marker;
        tile.innerText = marker;
    }

    return { markTile };
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
    function play(tile, index, player) {
        gameBoard.markTile(tile, index, player.marker);
        player === p1 ? this.currentPlayer = p2 : this.currentPlayer = p1;
        alertedPlayer.innerText = this.currentPlayer.marker;
    }
    return { currentPlayer, play };
})();