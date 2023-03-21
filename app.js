
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

let boxLength = 25;

let grid = document.querySelector('.grid');

let idCounter = 1

const drawColorPicker = document.getElementById('drawColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');

// create the grid
createGrid(boxLength);

// array of all cells
let allCells = document.querySelectorAll('.cell');


// function to set the background color of all cells
function applyBgColor() {
    allCells.forEach((cell) => {
        if (cell.classList.contains("inked")) {
            console.log(cell);
        } else {
            cell.style.backgroundColor = bgColor;
        }
    })
}

// function to change draw color
function setDrawColorTo(newColor) {
    drawColor = newColor;
}

// function to change background color
function setBgColorTo(newColor) {
    bgColor = newColor;
    applyBgColor();
}

// call setDrawColorTo() when whenever new color is selected from colorPicker
drawColorPicker.oninput = (e) => setDrawColorTo(e.target.value);

// call setBgColorTo() whenever new color is selected from bgColorPicker
bgColorPicker.oninput = (e) => {
    setBgColorTo(e.target.value);
}



function createGrid(boxLength){
// create boxLength rows
for (i = 0; i < (boxLength); i++) {
    var row = document.createElement("div");
    row.classList.add("row");

    // create boxLength cells within each row with cell class and unique ID
    for (j = 0; j < (boxLength); j++) {
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
}

// function to change the div (cell) background colour when hovered over
function addHoverColor(div) {
    div.addEventListener("mousedown", function() {
        div.style.backgroundColor = drawColor;
        div.classList.add("inked");
    })
}

// function to set each color button's background color according to its ID
// function setColorButtons() {
//     let colorButtons = document.querySelectorAll('color-btn');
//     colorButtons.forEach(button => {
//         button.backgroundColor = this.id;
//     })
// }

// setColorButtons();
   




