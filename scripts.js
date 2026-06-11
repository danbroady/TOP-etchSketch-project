// QUERY SELECTORS
const gridLabel = document.querySelector('#size-label');
const gridSize = document.querySelector('#size');
const colourPicker = document.querySelector('#colour-picker');
const colourMode = document.querySelector('#colour');
const rainbowMode = document.querySelector('#rainbow');
const rubberMode = document.querySelector('#rubber');
const clearAll = document.querySelector('#clear');
const gridSpace = document.querySelector('.grid');


// BUTTON STATES
let colourValue = colourPicker.value;
colourPicker.addEventListener('input', () => {colourValue = colourPicker.value;})
let currentMode = 'colour';


rainbowMode.addEventListener('click', ()=>{
    currentMode = 'rainbow';
    colourMode.classList.remove("toggled");
    rainbowMode.classList.add("toggled");
    rubberMode.classList.remove("toggled");
})

colourMode.addEventListener('click', ()=>{
    currentMode = 'colour';
    colourMode.classList.add("toggled");
    rainbowMode.classList.remove("toggled");
    rubberMode.classList.remove("toggled");
})

rubberMode.addEventListener('click', ()=>{
    currentMode = 'rubber';
    colourMode.classList.remove("toggled");
    rainbowMode.classList.remove("toggled");
    rubberMode.classList.add("toggled");
})


// MOUSE TOGGLE
let mouseDown = false;
window.addEventListener('mousedown', () => {mouseDown = true;})
window.addEventListener('mouseup', () => {mouseDown = false;})


// INITIAL STATE
// Initial grid size & setup
const defaultSize = 16;
gridLabel.textContent = (`${defaultSize} x ${defaultSize}`);
gridSize.value = defaultSize;
window.addEventListener("load",() => setGrid(defaultSize));

// Update grid size label on slider movement
gridSize.addEventListener('input', ()=>{updateGrid(gridSize.value)});

// setGrid() - add divs to create the grid
function setGrid(size){
    // Empty grid
    while (gridSpace.hasChildNodes()) {
        gridSpace.removeChild(gridSpace.firstChild);
    }

    // Populate grid
    for (let i=0; i<size; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let j=0; j<size; j++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            
            // Sketch interaction
            gridItem.addEventListener('mouseover', editGrid);
            gridItem.addEventListener('mousedown', editGrid);
            rowDiv.appendChild(gridItem);
        }
        gridSpace.appendChild(rowDiv);
    }
}

// updateGrid() - update grid size & label
function updateGrid(size) {
    gridLabel.textContent = (`${size} x ${size}`);
    setGrid(size);
}


// SKETCHING
// editGrid() - edit grid cell colours
function editGrid(event) {
    if (event.type === 'mouseover' && !mouseDown) return;
    switch (currentMode) {
        case "rubber":
            event.target.style["background-color"] = "";
            break;
        case "rainbow":
            const randRed = Math.floor(Math.random()*256);
            const randGreen = Math.floor(Math.random()*256);
            const randBlue = Math.floor(Math.random()*256);
            event.target.style["background-color"] = `rgb(${randRed}, ${randGreen}, ${randBlue})`;
            break;
        default:
            event.target.style["background-color"] = colourValue;
            break;
    }


}

// clearGrid()
clearAll.addEventListener('click', () => {setGrid(gridSize.value)});