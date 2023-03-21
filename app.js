
// STEPS:
// 1. Create 16 by 16 grid
//  1a. Create row
//  1b. Create 16 div tags using for loop
//  1c. add class of 'cell' and unique ID to each div
//  1d. Add row to parent container
//  1e. repeat process 16x
//  1f. Have 256 boxes with same class and unique IDs



let boxGrid = document.querySelector('.box-grid');

let idCounter = 1


for (i = 0; i < 16; i++) {
    var row = document.createElement("div");
    row.classList.add("row");

    for (j = 0; j < 16; j++) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = String(idCounter);
        cell.textContent = idCounter;
        idCounter++;
        row.appendChild(cell);
    }
    boxGrid.appendChild(row);
}


