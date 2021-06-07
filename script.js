function setGrid() { 
    // initialize default size of 4x4 with black colour
    const size = document.querySelector("#slider").value; 
    const gridContainer = document.querySelector(".grid-container");
    const totalSquares = size * size;
    const divs = document.querySelectorAll("div");
    const currentNum = divs.length;
    const numToFill = totalSquares - currentNum;
    let propertyValue = `repeat(${size}, auto)`;
    
    // create equal squares for grid-style
    gridContainer.style.gridTemplateColumns = propertyValue;
    gridContainer.style.gridTemplateRows = propertyValue;
    
    if (numToFill > 0 && !rainbow) {
        createDivs(true, gridContainer, numToFill, setColourForOne);
    } else if (numToFill > 0 && rainbow) {
        createDivs(true, gridContainer, numToFill, setRainbowColourForOne);
    } else if (numToFill < 0) {
        createDivs(false, gridContainer, numToFill, null);
    }
}

function createDivs(increase, gridContainer, numToFill, colourFunc) {
    let count = 0;
    if (increase) {
        while (count < numToFill) {
            const square = document.createElement("div");
            square.addEventListener("mouseover", colourFunc); 
            gridContainer.appendChild(square);
            count++;
        }
    } else {
        while (count < Math.abs(numToFill)) {
            // acts something like stack data structure; remove from latest
            const latestDiv = gridContainer.lastElementChild; 
            gridContainer.removeChild(latestDiv);
            count++;
        }
    }
}

function setButtons() {
    setClearBtn();
    setEraseBtn();
    setColourBtn();
    setRainbowBtn();
}

function setClearBtn() {
    const clearBtn = document.querySelector("#clear");
    clearBtn.addEventListener("click", clear);
}

function clear() {
    const grid = document.querySelectorAll("div");
    grid.forEach(function(square) {
        if (square.style) {
            square.style.backgroundColor = "white";
        }
    }); 
}

function setEraseBtn() {
    const eraseBtn = document.querySelector("#erase");
    eraseBtn.addEventListener("click", erase);
}

function erase() {
    const grid = document.querySelectorAll("div");
    grid.forEach(square => square.addEventListener("mouseover", function() {
        if (this.style) {
            this.style.backgroundColor = "white";
        }
    }));
}

function setColourBtn() {
    const colourBtn = document.querySelector(".color-container");
    colourBtn.addEventListener("click", setColourForAll);
    setColourOptions();
}

// for colour wheel
function setColourOptions() {
    const colourOption = document.querySelector("input#color-input");
    colourOption.addEventListener("change", setColourForAll);
}

// for all squares
function setColourForAll() { 
    rainbow = false;
    const grid = document.querySelectorAll("div");
    const colour = document.querySelector("#color-input").value;
    grid.forEach(square => square.addEventListener("mouseover", function () {
        const colour = document.querySelector("#color-input").value;
        this.style.backgroundColor = `${colour}`;
    }));
}

// for a single square
function setColourForOne() {
    const colour = document.querySelector("#color-input").value;
    this.style.backgroundColor = `${colour}`;
}

function setRainbowBtn() {
    const rainbowBtn = document.querySelector("#rainbow");
    rainbowBtn.addEventListener("click", setRainbowColour);
}

// for all squares, each square random colour
function setRainbowColour() {
    rainbow = true;
    const grid = document.querySelectorAll("div");
    grid.forEach(square => square.addEventListener("mouseover", function() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        this.style.backgroundColor = `rgb(${r},${g},${b})`;
    }));
}

// for a single square
function setRainbowColourForOne() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function setSlider() {
    const slider = document.querySelector("#slider");
    slider.addEventListener("input", setGrid); 
    slider.addEventListener("input", clear); 
}

function init() {
    setGrid();
    setButtons();
    setColourOptions();
    setSlider();
}

let rainbow = false;
// initialize with 4x4 grid
init();