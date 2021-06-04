function setup() { // adds 16 div elements
    const gridContainer = document.querySelector(".grid-container");
    for (i = 1; i < 17; i++) {
        const square = document.createElement("div");
        // add eventListener to every grid on hover, we will colour the grid
        square.addEventListener("mouseover", colour);
        gridContainer.appendChild(square);
    }
    setButton();
}

function colour() {
    this.classList.add("coloured-div");
}

function removeColour(grid) {
    grid.classList.remove("coloured-div");
}

function resetGrid() {
    const grids = document.querySelectorAll("div");
    console.log(grids);
    grids.forEach(removeColour); // the argument going into removeColour is the grid in grids
}

function setButton() {
    // get button
    const btn = document.querySelector("button");
    // event of 'click' on a button
    btn.addEventListener("click", resetGrid);
    // querySelectorAll("div") to get all div
}

setup()