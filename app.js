

// Initialize variables
let drawColor = "green";
let bgColor = "white";
let currentSize = 16;
let idCounter = 1
let allCells = [];
let isMouseDown = false;


// Dom Elements
const drawColorPicker = document.getElementById('drawColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const toggleGridButton = document.getElementById('grid-toggle-btn');
const clearButton = document.getElementById('clear-btn');
let grid = document.querySelector('.grid');


// create the grid and update cell list
createGrid(currentSize);


// Add event listeners
clearButton.onclick = reloadGrid
drawColorPicker.oninput = (e) => setDrawColorTo(e.target.value);
bgColorPicker.oninput = (e) => setBgColorTo(e.target.value);
sizeSlider.onchange= (e) => {changeSize(e.target.value)};
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
toggleGridButton.onclick = toggleGridBorder;
document.addEventListener('mousedown', () => {isMouseDown = true})
document.addEventListener('mouseup', () => {isMouseDown = false})

// function to add click listener to each cell, called in createGrid()
function addClickColor(div) {
    div.addEventListener("mousedown", function() {
        div.style.backgroundColor = drawColor;
        div.classList.add("inked");
    })
}

// function to add hover listener to each cell, only drawing if mouse is also clicked
function addHoverColor(div) {
    div.addEventListener("mouseover", function() {
        if (isMouseDown) {
            div.style.backgroundColor = drawColor;
            div.classList.add("inked");
        }
    })
}



// functions to change variables
function setDrawColorTo(newColor) {
    rawColor = newColor;
}

function setBgColorTo(newColor) {
    bgColor = newColor;
    applyBgColor();
}

function setCurrentSizeTo(newSize) {
    currentSize = newSize;
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `Grid size: ${value} x ${value}`
}

function toggleGridBorder() {
    document.querySelectorAll('.cell').forEach(function(e) {
        if (e.style.border) {
          e.style.border = '';
        } else {
          e.style.border = 'solid 1px black';
        }
        
      });
    console.log("grid changed");

}

// functions to manipulate the grid
function createGrid(currentSize) {
    for (i = 0; i < (currentSize); i++) {
        var row = document.createElement("div");
        row.classList.add("row");

        // create currentSize cells within each row with cell class and unique ID
        for (j = 0; j < (currentSize); j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            
            // show ID in box to aid setup for now, will remove later
            cell.id = String(idCounter);
            idCounter++;
            addClickColor(cell);
            addHoverColor(cell);

            // add each cell to parent container
            row.appendChild(cell);
        }

        // add each row to parent container
        grid.appendChild(row);
    }
    updateCellList()
    setBgColorTo(bgColor);
    applyBorder();
}

function updateCellList() {
    allCells = document.querySelectorAll('.cell');
}

function removeGrid() {
    grid.innerHTML = '';
}

function reloadGrid() {
    removeGrid();
    createGrid(currentSize);
}

function changeSize(newSize) {
    setCurrentSizeTo(newSize);
    updateSizeValue(newSize);
    reloadGrid();
}

function applyBorder() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.style.border = '1px solid black';
    });
}

function applyBgColor() {
    allCells.forEach((cell) => {
        if (!cell.classList.contains("inked")) {
            cell.style.backgroundColor = bgColor;
        }
    })
}






