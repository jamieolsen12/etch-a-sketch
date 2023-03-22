

// Initialize variables
let drawColor = "green";
let bgColor = "white";
let currentSize = 16;
let idCounter = 1
let allCells = [];
let isMouseDown = false;
let isGridBorderOn = true;
let rainbowMode = false;


// Dom Elements
const drawColorPicker = document.getElementById('drawColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const toggleRainbowButton = document.getElementById('rainbow-toggle-btn');
const toggleGridButton = document.getElementById('grid-toggle-btn');
const clearButton = document.getElementById('clear-btn');
let grid = document.querySelector('.grid');


// create the grid and update cell list, set cell properties 
// and add event listeners to each cell
createGrid(currentSize);


// Add event listeners
clearButton.onclick = reloadGrid
drawColorPicker.oninput = (e) => setDrawColorTo(e.target.value);
bgColorPicker.oninput = (e) => setBgColorTo(e.target.value);
sizeSlider.onchange= (e) => {changeSize(e.target.value)};
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
toggleRainbowButton.onclick = toggleRainbowMode;
toggleGridButton.onclick = toggleGridBorder;
document.addEventListener('mousedown', () => {isMouseDown = true})
document.addEventListener('mouseup', () => {isMouseDown = false})

// function to add click listener to each cell, called in createGrid()
function addClickColor(div) {
    div.addEventListener("mousedown", function() {
        
        if (rainbowMode === true) {
            div.style.backgroundColor = getRandomColor();
        } else {
            div.style.backgroundColor = drawColor;
        }
        div.classList.add("inked");
    })
}

// function to add hover listener to each cell, only drawing if mouse is also clicked
function addHoverColor(div) {
    div.addEventListener("mouseover", function() {
        if (isMouseDown) {
            if (rainbowMode === true) {
                div.style.backgroundColor = getRandomColor();
            } else {
                div.style.backgroundColor = drawColor;
            }
            div.classList.add("inked");
        }
    })
}



// functions to change variables
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

function updateSizeValue(value) {
    sizeValue.innerHTML = `Grid size: ${value} x ${value}`
}

function toggleGridBorder() {
    document.querySelectorAll('.cell').forEach(function(e) {
        if (e.style.border) {
          e.style.border = '';
          isGridBorderOn = false;
          setGridToggleButtonAppearance();
        } else {
          e.style.border = 'solid 1px black';
          isGridBorderOn = true;
          setGridToggleButtonAppearance();
        }
      });
    console.log("grid changed");
}

// functions to manipulate settings area

function setGridToggleButtonAppearance() {
    if (isGridBorderOn === true) {
        toggleGridButton.style.color = "#202020";
        toggleGridButton.style.backgroundColor = "#7245b5";
    }
    if (isGridBorderOn === false) {
        toggleGridButton.style.color = "#7245b5";
        toggleGridButton.style.backgroundColor = "#202020";
    }
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
    // turn on the border by default each time a new grid is created
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
    isGridBorderOn = true;
    setGridToggleButtonAppearance()
}

function applyBgColor() {
    allCells.forEach((cell) => {
        if (!cell.classList.contains("inked")) {
            cell.style.backgroundColor = bgColor;
        }
    })
}

// function to get random color for rainbow mode
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// toggle rainbow mode, also alter buttons appearance to show if its on or off
function toggleRainbowMode() {
    if (rainbowMode === true) {
        rainbowMode = false;
        console.log(rainbowMode);
        toggleRainbowButton.style.color = "#7245b5";
        toggleRainbowButton.style.backgroundColor = "#202020";
    } else if (rainbowMode === false) {
        rainbowMode = true;
        console.log(rainbowMode);
        toggleRainbowButton.style.color = "#202020";
        toggleRainbowButton.style.backgroundColor = "#7245b5";
    }
}









