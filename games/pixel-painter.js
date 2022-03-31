const container = document.querySelector(".container");
const newGrid = (gridLength) => {
    for (let i = 1; i <= gridLength * gridLength; i++) {
        const newSquare = document.createElement('div');
        container.style.cssText = `grid-template-columns: repeat(${gridLength}, 1fr); grid-template-rows: repeat(${gridLength}, 1fr);`;
        newSquare.classList.add("square");
        container.appendChild(newSquare);
    }
}
newGrid(16);

const gridSizeDisplay = document.querySelector('#gridSizeDisplay');
const gridSizeInput = document.querySelector('#gridSizeInput');
gridSizeInput.addEventListener('change', () => {
    gridSizeDisplay.textContent = `${gridSizeInput.value} x ${gridSizeInput.value}`;
});
const newGridBtn = document.querySelector("#newGridBtn");
newGridBtn.addEventListener('click', () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
    newGrid(gridSizeInput.value);
})

const squares = document.querySelectorAll('.square');
squares.forEach((square) => {
    square.addEventListener('click', () => {
        square.style.backgroundColor = 'blue';
    })
})