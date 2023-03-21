
// STEPS:
// 1. Create 16 by 16 grid
//  1a. Create row
//  1b. Create 16 div tags using for loop
//  1c. add class of 'cell' and unique ID to each div
//  1d. Add row to parent container
//  1e. repeat process 16x
//  1f. Have 256 boxes with same class and unique IDs

// Color each cell will change its background color property to when clicked
let drawColor = "green";
let bgColor = "white";
let currentSize = 16;

let idCounter = 1
let allCells = [];

// functions to change basic elements
function setDrawColorTo(newColor) {
    drawColor = newColor;
}

function setBgColorTo(newColor) {
    bgColor = newColor;
    applyBgColor();
}

function setCurrentSizeTo(newSize) {
    currentSize = newSize;
}



// Objects
const drawColorPicker = document.getElementById('drawColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const toggleGridButton = document.getElementById('grid-toggle-btn');
const clearButton = document.getElementById('clear-btn');
let grid = document.querySelector('.grid');

// create the grid
createGrid(currentSize);

// create array of all cells, call at the end of createGrid()
function updateCellList() {
    allCells = document.querySelectorAll('.cell');
}

// clear button wipes board of all drawing, essentially createds a new one
clearButton.onclick = reloadGrid

// call setDrawColorTo() when whenever new color is selected from colorPicker
drawColorPicker.oninput = (e) => setDrawColorTo(e.target.value);

// call setBgColorTo() whenever new color is selected from bgColorPicker
bgColorPicker.oninput = (e) => setBgColorTo(e.target.value);

// use sizeSlider to adjust the size of the grid
sizeSlider.onchange= (e) => {changeSize(e.target.value)}

// display current size on slider immediately
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)

// function to toggle grid border on and off
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

// turn on the border after the cell size is adjusted so 
// the user can better grasp the size without having to toggle again
function applyBorder() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.style.border = '1px solid black';
    });
  }

// use above function to toggle Grid border whenever button is pressed
toggleGridButton.onclick = toggleGridBorder

// all steps to apply changes in grid size in one function
function changeSize(newSize) {
    setCurrentSizeTo(newSize);
    updateSizeValue(newSize);
    reloadGrid();
}

// function to change text to show current grid size
function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
  }

// clear the grid the create a new one with current size
function reloadGrid() {
    removeGrid();
    createGrid(currentSize);
}
  
function removeGrid() {
    grid.innerHTML = '';
}






// function to apply the background color to all cells
function applyBgColor() {
    allCells.forEach((cell) => {
        if (!cell.classList.contains("inked")) {
            cell.style.backgroundColor = bgColor;
        }
    })
}






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
            // cell.textContent = String(idCounter);
            idCounter++;
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

// function to change the div (cell) background colour when hovered over
function addHoverColor(div) {
    div.addEventListener("mousedown", function() {
        div.style.backgroundColor = drawColor;
        div.classList.add("inked");
    })
}


   




