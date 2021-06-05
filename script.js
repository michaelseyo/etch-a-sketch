function setGrid() { 
    // get current value
    const size = document.querySelector("input").value; 
    const gridContainer = document.querySelector(".grid-container");
    const totalSquares = size * size;
    const divs = document.querySelectorAll("div");
    const currentNum = divs.length;
    const numToFill = totalSquares - currentNum;
    let propertyValue = "";

    // the number of auto for grid property
    for (i = 0; i < size; i++) {
        propertyValue += "auto "
    }
    // remove the extra space
    propertyValue.slice(0, -1);
    
    // get the property: grid-template-column & row for class grid-container, then change value
    gridContainer.style.gridTemplateColumns = propertyValue;
    gridContainer.style.gridTemplateRows = propertyValue;
    
    let count = 0;
    if (numToFill > 0) {
        while (count < numToFill) {
            const square = document.createElement("div");
            // add eventListener to every grid on hover, we will colour the grid
            square.addEventListener("mouseover", colour);
            gridContainer.appendChild(square);
            count++;
        }
    } else if (numToFill < 0) {
        while (count < Math.abs(numToFill)) {
            // acts something like stack data structure; remove from latest
            const latestDiv = gridContainer.lastElementChild; 
            gridContainer.removeChild(latestDiv);
            count++;
        }
    }
}

function colour() {
    this.classList.add("coloured-div");
}

function removeColour(grid) {
    grid.classList.remove("coloured-div");
}

function resetGrid() {
    const grids = document.querySelectorAll("div");
    grids.forEach(removeColour); // the argument going into removeColour is the grid in grids
}

function setButton() {
    const btn = document.querySelector("button");
    btn.addEventListener("click", resetGrid);
}

function setSlider() {
    const slider = document.querySelector("input");
    slider.addEventListener("input", setGrid); // when slide, change grid size
    slider.addEventListener("input", resetGrid); // if existing drawing, reset
}

function init() {
    setGrid();
    setButton();
    setSlider();
}

// initialize with 4x4 grid
init();

