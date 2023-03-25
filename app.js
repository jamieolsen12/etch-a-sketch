// STEPS LEFT
// 4. Decide on lighten and darken buttons


// Dom Elements
const root = document.documentElement;
const header = document.querySelector('header');
const drawColorPicker = document.getElementById('drawColorPicker');
const bgColorPicker = document.getElementById('bgColorPicker');
const colorGrabberButton = document.getElementById('color-grabber');
const sizeSlider = document.getElementById('sizeSlider');
const eraserButton = document.getElementById('eraser-btn');
const rainbowButton = document.getElementById('rainbow-toggle-btn');
const gridButton = document.getElementById('grid-toggle-btn');
const clearButton = document.getElementById('clear-btn');
let grid = document.querySelector('.grid');


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
let colorGrabberMode = false;



// create the grid and update cell list, set cell properties 
// and add event listeners to each cell
createGrid(currentSize);


// Add event listeners
document.addEventListener('mousedown', () => {isMouseDown = true});
document.addEventListener('mouseup', () => {isMouseDown = false});
header.onclick = toggleLayout;
drawColorPicker.oninput = (e) => setDrawColorTo(e.target.value);
bgColorPicker.oninput = (e) => setBgColorTo(e.target.value);
colorGrabberButton.onclick = toggleColorGrabberMode;
sizeSlider.onchange= (e) => {changeSize(e.target.value)};
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
eraserButton.onclick = toggleEraserMode;
rainbowButton.onclick = toggleRainbowMode;
gridButton.onclick = toggleGridBorder;
clearButton.onclick = reloadGrid;

// function to match color to root primary color so that it can be changed live
function getRootPrimaryColor() {
    return getComputedStyle(root).getPropertyValue('--primary-color');
}

// same to return secondary 
function getRootSecondaryColor() {
    return getComputedStyle(root).getPropertyValue('--secondary-color');
}

// function to add click listener to each cell, called in createGrid()
function addClickListener(div) {
    div.addEventListener("mousedown", function() {
        if (colorGrabberMode === false) {
            if (eraserMode === false) {
                if (rainbowMode === true) {
                    div.style.backgroundColor = getRandomColor();
                } else {
                    div.style.backgroundColor = drawColor;
                    console.log(`Change div ${div.id} to ${div.style.backgroundColor}`)
                }
                div.classList.add("inked");
            } else if (eraserMode === true) {
                div.style.backgroundColor = bgColor;
            }   
        } else if (colorGrabberMode === true) {
            console.log(`tring to change color picker to ${div.style.backgroundColor}`)
            drawColorPicker.value = rgbToHex(div.style.backgroundColor);
            setDrawColorTo(div.style.backgroundColor);
            toggleColorGrabberMode();

        }
    })
}

// function to add hover listener to each cell, only drawing if mouse is also clicked
function addHoverListener(div) {
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
        gridButton.style.color = getRootSecondaryColor();
        gridButton.style.backgroundColor = getRootPrimaryColor();
    }
    if (isGridBorderOn === false) {
        gridButton.style.color = getRootPrimaryColor();
        gridButton.style.backgroundColor = getRootSecondaryColor();
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
            addClickListener(cell);
            addHoverListener(cell);

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
        setRainbowButtonAppearance()
        turnOffEraserMode();
    }
}

// seperate function to turn off rainbow mode, to call when pen color is changed,
// or when erasor mode is turned on
function turnOffRainbowMode() {
    rainbowMode = false;
    setRainbowButtonAppearance();
}

// use similar function to toggle eraser mode
function toggleEraserMode() {
    if (eraserMode === false) {
        eraserMode = true;
        setEraserButtonAppearance();
        turnOffRainbowMode(); 
    } else if (eraserMode === true) {
        turnOffEraserMode()
        setEraserButtonAppearance();
    }
}

// seperate function to turn eraser mode off and alter button's appearance
// as the eraser moder should be turned off automatically if the color is changed
// or rainbow mode is turned on

function turnOffEraserMode() {
    eraserMode = false;
    setEraserButtonAppearance();
}


// function to set eraser appearance based on whether it is on or off
function setEraserButtonAppearance() {
    if (eraserMode === false) {
        eraserButton.style.color = getRootPrimaryColor();
        eraserButton.style.backgroundColor = getRootSecondaryColor();
    } else if (eraserMode === true) {
        eraserButton.style.color = getRootSecondaryColor();
        eraserButton.style.backgroundColor = getRootPrimaryColor();
    }
}

function setRainbowButtonAppearance() {
    if (rainbowMode === false) {
        rainbowButton.style.color = getRootPrimaryColor();
        rainbowButton.style.backgroundColor = getRootSecondaryColor();
    } else if (rainbowMode === true) {
        rainbowButton.style.color = getRootSecondaryColor();
        rainbowButton.style.backgroundColor = getRootPrimaryColor();
    }
}

// set appearances that don't change automatically
function setButtonAppearances() {
    setGridToggleButtonAppearance();
    setEraserButtonAppearance();
    setRainbowButtonAppearance();
    setColorGrabberButtonAppearance();
}

// function to toggle the layout between the new pen color and the default purple color,
// in case the user accidentally changes to an unwanted color
function toggleLayout() {
    if (getComputedStyle(root).getPropertyValue('--primary-color').trim() === '#7245b5') {
        document.documentElement.style.setProperty('--primary-color', drawColor);
        setButtonAppearances();
    } else {
        document.documentElement.style.setProperty('--primary-color', "#7245b5");
        setButtonAppearances();
    }
}

function toggleColorGrabberMode() {
    if (colorGrabberMode === false) {
        colorGrabberMode = true;
        setColorGrabberButtonAppearance();
    } else if (colorGrabberMode === true) {
        colorGrabberMode = false;
        setColorGrabberButtonAppearance();
    }
    console.log("color grabber mode toggled");
    console.log(`color grabber mode is ${colorGrabberMode}`)
}

// function to set color grabber button appearance based on whether it is on or off
function setColorGrabberButtonAppearance() {
    if (colorGrabberMode === false) {
        colorGrabberButton.style.color = getRootPrimaryColor();
        colorGrabberButton.style.backgroundColor = getRootSecondaryColor();
    } else if (colorGrabberMode === true) {
        colorGrabberButton.style.color = getRootSecondaryColor();
        colorGrabberButton.style.backgroundColor = getRootPrimaryColor();
    }
    console.log('color grabber button appearance changed');
    console.log(`color grabber button background color is ${colorGrabberButton.style.color}`)
}

// courtesy of ChatGPT, for the color grabber to convert the div's background color 
// into a hex code for the color picker to take
function rgbToHex(rgbString) {
    const rgbMatch = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!rgbMatch) {
      return null;
    }
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    let hex = "#";
    for (let i = 0; i < 3; i++) {
      let hexComponent = [r, g, b][i].toString(16);
      if (hexComponent.length < 2) {
        hexComponent = "0" + hexComponent;
      }
      hex += hexComponent;
    }
    return hex;
  }
  
  






