
// STEPS:
// 1. Create 16 by 16 grid
//  1a. Create row
//  1b. Create 16 div tags using for loop
//  1c. add class of 'cell' and unique ID to each div
//  1d. Add row to parent container
//  1e. repeat process 16x
//  1f. Have 256 boxes with same class and unique IDs

// Color each cell will change its background color property to when clicked
let targetColor = "green";

let boxLength = 100;

let boxGrid = document.querySelector('.box-grid');

let idCounter = 1

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
    boxGrid.appendChild(row);
}


// function to change the div (cell) background colour when hovered over
function addHoverColor(div) {
    div.addEventListener("mouseover", function() {
        div.style.backgroundColor = targetColor;
    })
}

// function to set each color button's background color according to its ID
function setColorButtons() {
    let colorButtons = document.querySelectorAll('color-btn');
    colorButtons.forEach(button => {
        button.backgroundColor = this.id;
    })
}

setColorButtons();
   




