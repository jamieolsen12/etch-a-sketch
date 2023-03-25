// STEPS LEFT
// 2. Color grabber?
// 3. Pretty up settings panel
// 4. Decide on lighten and darken buttons




// Initialize variables
let drawColor = "#02f2d6";
let bgColor = "white";
let currentSize = 16;
let idCounter = 1
let allCells = [];
let isMouseDown = false;
let isGridBorderOn = true;
let rainbowMode = false;
let eraserMode = false;





// Dom Elements
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color');
const drawColorPicker = document.getElementById('drawColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const eraserButton = document.getElementById('eraser-btn');
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
eraserButton.onclick = toggleEraserMode;
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
toggleRainbowButton.onclick = toggleRainbowMode;
toggleGridButton.onclick = toggleGridBorder;
document.addEventListener('mousedown', () => {isMouseDown = true})
document.addEventListener('mouseup', () => {isMouseDown = false})

// function to add click listener to each cell, called in createGrid()
function addClickColor(div) {
    div.addEventListener("mousedown", function() {
    
        if (eraserMode === false) {
            if (rainbowMode === true) {
                div.style.backgroundColor = getRandomColor();
            } else {
                div.style.backgroundColor = drawColor;
            }
            div.classList.add("inked");
        } else if (eraserMode === true) {
            div.style.backgroundColor = bgColor;
        }   
    })
}

// function to add hover listener to each cell, only drawing if mouse is also clicked
function addHoverColor(div) {
    div.addEventListener("mouseover", function() {
        if (isMouseDown) {
            if (eraserMode === false) {
                if (rainbowMode === true) {
                    div.style.backgroundColor = getRandomColor();
                } else {
                    div.style.backgroundColor = drawColor;
                }
                div.classList.add("inked");
            } else if (eraserMode === true) {
                div.style.backgroundColor = bgColor;
            }
        }
    })
}



// functions to change variables
function setDrawColorTo(newColor) {
    drawColor = newColor;
    turnOffEraserMode();
    turnOffRainbowMode();
}

function setBgColorTo(newColor) {
    bgColor = newColor;
    applyBgColor();
}

function setCurrentSizeTo(newSize) {
    currentSize = newSize;
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `Grid Size: ${value} x ${value}`
}

function toggleGridBorder() {
    document.querySelectorAll('.cell').forEach(function(e) {
      if (e.style.border) {
        e.style.border = '';
        isGridBorderOn = false;
        setGridToggleButtonAppearance();
        console.log(isGridBorderOn);
        console.log(e.style.border);
      } else if (e.style.border === '') {
        e.style.border = '1px solid black';
        isGridBorderOn = true;
        setGridToggleButtonAppearance();
        console.log(isGridBorderOn);
        console.log(e.style.border);
      }
    });
    console.log("grid changed");
  }
  

// functions to manipulate settings area

function setGridToggleButtonAppearance() {
    if (isGridBorderOn === true) {
        toggleGridButton.style.color = secondaryColor;
        toggleGridButton.style.backgroundColor = primaryColor;
    }
    if (isGridBorderOn === false) {
        toggleGridButton.style.color = primaryColor;
        toggleGridButton.style.backgroundColor = secondaryColor;
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

// toggle rainbow mode, also alter toggle rainbow button's appearance to show if its on or off
function toggleRainbowMode() {
    if (rainbowMode === true) {
        turnOffRainbowMode(); 
    } else if (rainbowMode === false) {
        rainbowMode = true;
        toggleRainbowButton.style.color = secondaryColor;
        toggleRainbowButton.style.backgroundColor = primaryColor;
        turnOffEraserMode();
    }
}

// seperate function to turn off rainbow mode, to call when pen color is changed,
// or when erasor mode is turned on
function turnOffRainbowMode() {
    rainbowMode = false;
    toggleRainbowButton.style.color = primaryColor;
    toggleRainbowButton.style.backgroundColor = secondaryColor;
}

// use similar function to toggle eraser mode
function toggleEraserMode() {
    if (eraserMode === false) {
        eraserMode = true;
        eraserButton.style.color = secondaryColor;
        eraserButton.style.backgroundColor = primaryColor;
        turnOffRainbowMode(); 
    } else if (eraserMode === true) {
        turnOffEraserMode()
    }
}

// seperate function to turn eraser mode off and alter button's appearance
// as the eraser moder should be turned off automatically if the color is changed
// or rainbow mode is turned on

function turnOffEraserMode() {
    eraserMode = false;
    eraserButton.style.color = primaryColor;
    eraserButton.style.backgroundColor = secondaryColor;
}









