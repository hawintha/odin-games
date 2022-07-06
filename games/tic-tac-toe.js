const gameBoard = (function () {
    let marks = ["", "", "", "", "", "", "", "", ""];

    const tilesGrid = document.querySelector('#tilesGrid');
    marks.forEach(() => {
        const tile = document.createElement('div');
        tile.classList.add("tile");
        tilesGrid.appendChild(tile);
    })

    return { marks };
})();