const fs = require("fs");

const text = fs.readFileSync("days/day-04/input.txt", "utf-8");

const lines = text.split("\n");

let total = 0;

// M.S
// .A.
// M.S

// Loop over the entire input
for (let i = 0; i < lines.length - 2; i++) {
  for (let j = 0; j < lines.length - 2; j++) {
    // Create a 3x3 grid at each point
    const grid = [
      [lines[i][j], lines[i][j + 1], lines[i][j + 2]],
      [lines[i + 1][j], lines[i + 1][j + 1], lines[i + 1][j + 2]],
      [lines[i + 2][j], lines[i + 2][j + 1], lines[i + 2][j + 2]],
    ];

    const topLeft = grid[0][0];
    const topRight = grid[0][2];

    const middle = grid[1][1];

    const bottomLeft = grid[2][0];
    const bottomRight = grid[2][2];

    // Has to have A in the middle
    if (middle !== "A") continue;

    const topLeftToBottomRight = [topLeft, middle, bottomRight].join("");

    const topRightToBottomLeft = [topRight, middle, bottomLeft].join("");

    // Check that both diagonals are MAS or SAM

    if (
      (topLeftToBottomRight === "SAM" || topLeftToBottomRight === "MAS") &&
      (topRightToBottomLeft === "SAM" || topRightToBottomLeft === "MAS")
    )
      total++;
  }
}

console.log(total);
