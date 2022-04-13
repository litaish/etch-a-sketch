const slider = document.getElementById("myRange");
const output = document.getElementById("output");
const greenBtn = document.getElementById("greenBtn");
const greyBtn = document.getElementById("greyBtn");
const randBtn = document.getElementById("randBtn");
const clearBtn = document.getElementById("clearBtn");
const eraseBtn = document.getElementById("eraseBtn");
const sketchGrid = document.getElementById("sketchGrid");

const GREEN_CELL = "rgba(0, 210, 84, 1)";
const GREY_CELL = "rgba(117, 117, 117, 1)";
const DEFAULT_CELL = "#DCDCDC";

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = `${this.value} x ${this.value}`;
  // Delete all grid children before generating a new grid with a new size
  sketchGrid.innerHTML = "";
  generateGrid(this.value, DEFAULT_CELL);
};

function init() {
  // On init slider value
  output.innerHTML = `${slider.value} x ${slider.value}`;
  generateGrid(slider.value, GREEN_CELL);
}

function generateGrid(size, hoverColor) {
  // Generate grid
  sketchGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const cells = [];

  // Generate cells
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cell = document.createElement("div");
      cell.classList.toggle("cell");
      sketchGrid.appendChild(cell);
      cells.push(cell);
    }
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].onmouseover = function () {
      this.style.backgroundColor = hoverColor;
    };
  }
  return cells;
}

function setHoverColor(hoverColor) {
  // Find all children of grid (cells)
  for (let i = 0; i < sketchGrid.children.length; i++) {
    sketchGrid.children[i].onmouseover = function () {
      this.style.backgroundColor = hoverColor;
    }
  } 
}

function setRandHoverColor(){
  // Find all children of grid (cells)
  for (let i = 0; i < sketchGrid.children.length; i++) {
    sketchGrid.children[i].onmouseover = function () {
      let hoverColor = `#${generateRandColor()}`;
      this.style.backgroundColor = hoverColor;
    }
  } 
}

function generateRandColor() {
  // Returns a random HEX value color
  return Math.floor(Math.random()*16777215).toString(16);
}

function clearCells(){
  // Find all children of grid (cells)
  for (let i = 0; i < sketchGrid.children.length; i++) {
    sketchGrid.children[i].style.backgroundColor = DEFAULT_CELL;
  }
}

init();

greenBtn.addEventListener("click", () => {
  // On green button change
  clearCells();
  setHoverColor(GREEN_CELL);
});

greyBtn.addEventListener("click", () => {
  // On grey color change
  clearCells();
  setHoverColor(GREY_CELL);
});

randBtn.addEventListener("click", () => {
  // On random button change
  clearCells();
  setRandHoverColor();
});

clearBtn.addEventListener("click", () => {
  // On clear canvas
  clearCells();
})

eraseBtn.addEventListener("click", () => {
  // On enable eraser
  setHoverColor(DEFAULT_CELL);
})
