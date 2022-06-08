const grid = document.querySelector('#grid');
let color = "#000000"
let isMouseDown = false;
grid.onmousedown = () => (isMouseDown = true);
grid.onmouseup = () => (isMouseDown = false);
function paint(e) {
    if (e.type === 'mouseover' && !isMouseDown) {
        return;
    } else {
        e.target.style.backgroundColor = color;
    };
};
function createGrid(gridLength) {
    for (let i = 1; i <= gridLength * gridLength; i++) {
        const newSquare = document.createElement('div');
        grid.style.cssText = `grid-template-columns: repeat(${gridLength}, 1fr); grid-template-rows: repeat(${gridLength}, 1fr);`;
        newSquare.classList.add("square");
        grid.appendChild(newSquare);
        newSquare.addEventListener('mouseover', paint);
        newSquare.addEventListener('mousedown', paint);
    };
};
createGrid(16); //default grid on load

const gridSizeOutput = document.querySelector('#gridSizeOutput');
const gridSizeInput = document.querySelector('#gridSizeInput');
gridSizeInput.addEventListener('input', () => {
    gridSizeOutput.textContent = `${gridSizeInput.value} x ${gridSizeInput.value}`;
});
const newGridBtn = document.querySelector('#newGridBtn');
newGridBtn.addEventListener('click', () => {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    };
    createGrid(gridSizeInput.value);
});
const colorInput = document.querySelector('#colorInput');
colorInput.addEventListener('input', () => {
    color = colorInput.value;
});